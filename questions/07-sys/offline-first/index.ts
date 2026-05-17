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

// TODO 1: In the constructor, open the IndexedDB database.
//   - Call indexedDB.open(dbName, 1).
//   - In the `onupgradeneeded` handler, create two object stores:
//     • storeName with keyPath: 'id'   (for records)
//     • '_pending' with keyPath: 'id'  (for PendingOp entries, auto-increment index)
//   - Store the db promise so other methods can await it.
//   - Use a helper `openDB(): Promise<IDBDatabase>` that wraps the IDBOpenDBRequest.

// TODO 2: implement get(id): Promise<T | undefined>.
//   Open a readonly transaction on storeName.
//   Use IDBObjectStore.get(id) and wrap the request in a Promise.
//   Return undefined if the result is undefined.

// TODO 3: implement put(item): Promise<void>.
//   Open a readwrite transaction covering [storeName, '_pending'].
//   In a single transaction:
//   a) IDBObjectStore.put(item) on the records store.
//   b) IDBObjectStore.add(pendingOp) on the '_pending' store, where pendingOp is:
//      { id: randomId(), type: 'put', itemId: item.id, payload: item, timestamp: Date.now() }

// TODO 4: implement delete(id): Promise<void>.
//   Similar to put, but use IDBObjectStore.delete(id) on the records store,
//   and queue a { type: 'delete', itemId: id } pending op.

// TODO 5: implement getPendingOps(): Promise<PendingOp<T>[]>.
//   Open a readonly transaction on '_pending'.
//   Use IDBObjectStore.getAll() and wrap in a Promise.

// TODO 6: implement sync(serverSync): Promise<void>.
//   a) Guard against concurrent syncs with a boolean flag.
//   b) Get all pending ops.
//   c) Call serverSync(ops) — even if ops is empty.
//   d) For each SyncResult where success === true:
//      - Remove the pending op from '_pending' by op id.
//      - If serverValue is present, overwrite the local record with store.put(serverValue).

export class OfflineStore<T extends { id: string }> {
  constructor(_dbName: string, _storeName: string) {
    throw new Error('Not implemented');
  }

  get(_id: string): Promise<T | undefined> {
    throw new Error('Not implemented');
  }

  put(_item: T): Promise<void> {
    throw new Error('Not implemented');
  }

  delete(_id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  getPendingOps(): Promise<PendingOp<T>[]> {
    throw new Error('Not implemented');
  }

  sync(
    _serverSync: (pending: PendingOp<T>[]) => Promise<SyncResult<T>[]>,
  ): Promise<void> {
    throw new Error('Not implemented');
  }
}
