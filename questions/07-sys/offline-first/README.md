# Offline-First Web App

## Problem

Implement an `OfflineStore` class backed by IndexedDB that queues mutations when offline, syncs them when connectivity resumes, and resolves simple last-write-wins conflicts.

## TypeScript Signature

```ts
type OpType = 'put' | 'delete';

interface PendingOp<T> {
  id: string;         // client-generated op ID
  type: OpType;
  itemId: string;     // the record's primary key
  payload?: T;        // present for 'put', absent for 'delete'
  timestamp: number;  // Date.now() when the op was queued
}

interface SyncResult<T> {
  itemId: string;
  success: boolean;
  serverValue?: T;    // the canonical value after merge (server wins by default)
  error?: string;
}

class OfflineStore<T extends { id: string }> {
  constructor(dbName: string, storeName: string)

  // Read one record by ID. Returns undefined if not found.
  get(id: string): Promise<T | undefined>

  // Write a record locally and queue a 'put' pending op.
  put(item: T): Promise<void>

  // Delete a record locally and queue a 'delete' pending op.
  delete(id: string): Promise<void>

  // Return all pending ops in the order they were queued.
  getPendingOps(): Promise<PendingOp<T>[]>

  // Sync pending ops with the server.
  // `serverSync` is a function the caller provides (e.g. wraps fetch).
  // After each successful SyncResult, remove the corresponding pending op.
  // If serverValue is returned, overwrite the local record with it (server wins).
  sync(serverSync: (pending: PendingOp<T>[]) => Promise<SyncResult<T>[]>): Promise<void>
}
```

## Usage Example

```ts
interface Note { id: string; title: string; body: string; }

const store = new OfflineStore<Note>('notes-db', 'notes');

// Offline: writes queue locally
await store.put({ id: 'note-1', title: 'Meeting', body: 'Q3 roadmap' });
await store.delete('note-2');

// Later, when online:
await store.sync(async (ops) => {
  const res = await fetch('/api/sync', {
    method: 'POST',
    body: JSON.stringify(ops),
  });
  return res.json();
});
```

## Constraints

- Use the IndexedDB API (`indexedDB.open`, `IDBObjectStore`) — no third-party wrappers
- Keep two object stores per DB: one for records (`storeName`) and one for pending ops (`'_pending'`)
- `put` and `delete` must be atomic across both stores (use a single transaction when possible, or sequence carefully)
- `sync` processes all ops in a single batch call to `serverSync`, then removes successful ones
- Use last-write-wins conflict resolution: if `serverValue` is returned, overwrite the local record

## Edge Cases

- `get()` on a non-existent ID — return `undefined`, do not throw
- `put()` the same record twice offline — second put replaces the first in the records store; both appear as separate pending ops (the server sees them in order)
- `delete()` a record that was never put locally — queue the delete op anyway (server knows it)
- `sync()` when there are no pending ops — call `serverSync([])` and return, removing nothing
- `sync()` with partial failures — only remove ops whose `SyncResult.success` is `true`
- `sync()` called while another sync is in progress — queue and wait, don't run two syncs simultaneously
- DB upgrade needed (first open) — create both object stores with `keyPath: 'id'` for records and `keyPath: 'id'` for ops
