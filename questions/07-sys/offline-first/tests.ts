// Tests for OfflineStore
// Run: npx ts-node questions/07-sys/offline-first/tests.ts
// Note: IndexedDB requires a browser or a polyfill (e.g. fake-indexeddb).
// These tests verify the class API shape; full integration testing needs a DOM environment.

import { OfflineStore } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: OfflineStore is a class
assert(typeof OfflineStore === 'function', 'OfflineStore is exported as a class');

// Test 2: constructor accepts dbName and storeName without throwing
let store: OfflineStore<{ id: string; value: string }>;
try {
  store = new OfflineStore('test-db', 'items');
  assert(true, 'OfflineStore instantiates with dbName and storeName');
} catch {
  assert(false, 'OfflineStore instantiates with dbName and storeName');
  process.exit(1);
}

// Test 3: get() returns a Promise
const getResult = store!.get('any-id');
assert(getResult instanceof Promise, 'get() returns a Promise');
getResult.catch(() => {}); // suppress unhandled rejection if no IDB

// Test 4: put() returns a Promise
const putResult = store!.put({ id: 'x', value: 'hello' });
assert(putResult instanceof Promise, 'put() returns a Promise');
putResult.catch(() => {});

// Test 5: delete() returns a Promise
const deleteResult = store!.delete('x');
assert(deleteResult instanceof Promise, 'delete() returns a Promise');
deleteResult.catch(() => {});

// Test 6: getPendingOps() returns a Promise
const opsResult = store!.getPendingOps();
assert(opsResult instanceof Promise, 'getPendingOps() returns a Promise');
opsResult.catch(() => {});

// Test 7: sync() returns a Promise
const syncResult = store!.sync(async (ops) => ops.map((op) => ({ itemId: op.itemId, success: true })));
assert(syncResult instanceof Promise, 'sync() returns a Promise');
syncResult.catch(() => {});

console.log('\nNote: full IndexedDB tests require a browser or fake-indexeddb polyfill.');
