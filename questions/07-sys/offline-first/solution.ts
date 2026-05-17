export type OpType = 'put' | 'delete';

export interface PendingOp<T> {
  id: string;
  type: OpType;
  itemId: string;
  payload?: T;
  timestamp: number;
}

export interface SyncResult<T> {
  itemId: string;
  success: boolean;
  serverValue?: T;
  error?: string;
}

function randomId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function idbRequest<R>(req: IDBRequest<R>): Promise<R> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbTransaction(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(new Error('Transaction aborted'));
  });
}

export class OfflineStore<T extends { id: string }> {
  private storeName: string;
  private dbPromise: Promise<IDBDatabase>;
  private syncing = false;

  constructor(dbName: string, storeName: string) {
    this.storeName = storeName;
    this.dbPromise = this.openDB(dbName);
  }

  private openDB(dbName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('_pending')) {
          db.createObjectStore('_pending', { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async get(id: string): Promise<T | undefined> {
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, 'readonly');
    const result = await idbRequest<T | undefined>(tx.objectStore(this.storeName).get(id));
    return result;
  }

  async put(item: T): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction([this.storeName, '_pending'], 'readwrite');
    tx.objectStore(this.storeName).put(item);
    const op: PendingOp<T> = {
      id: randomId(),
      type: 'put',
      itemId: item.id,
      payload: item,
      timestamp: Date.now(),
    };
    tx.objectStore('_pending').add(op);
    await idbTransaction(tx);
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction([this.storeName, '_pending'], 'readwrite');
    tx.objectStore(this.storeName).delete(id);
    const op: PendingOp<T> = {
      id: randomId(),
      type: 'delete',
      itemId: id,
      timestamp: Date.now(),
    };
    tx.objectStore('_pending').add(op);
    await idbTransaction(tx);
  }

  async getPendingOps(): Promise<PendingOp<T>[]> {
    const db = await this.dbPromise;
    const tx = db.transaction('_pending', 'readonly');
    return idbRequest<PendingOp<T>[]>(tx.objectStore('_pending').getAll());
  }

  async sync(
    serverSync: (pending: PendingOp<T>[]) => Promise<SyncResult<T>[]>,
  ): Promise<void> {
    if (this.syncing) return;
    this.syncing = true;

    try {
      const ops = await this.getPendingOps();
      const results = await serverSync(ops);

      const opMap = new Map(ops.map((op) => [op.itemId, op]));
      const db = await this.dbPromise;

      for (const result of results) {
        if (!result.success) continue;
        const op = opMap.get(result.itemId);
        if (!op) continue;

        const tx = db.transaction([this.storeName, '_pending'], 'readwrite');
        tx.objectStore('_pending').delete(op.id);
        if (result.serverValue) {
          tx.objectStore(this.storeName).put(result.serverValue);
        }
        await idbTransaction(tx);
      }
    } finally {
      this.syncing = false;
    }
  }
}
