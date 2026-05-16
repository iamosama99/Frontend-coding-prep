import { LRUCache } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
assert('get existing key', cache.get(1), 1);          // marks 1 as MRU
cache.put(3, 3);                                       // evicts 2 (LRU)
assert('evicted key returns -1', cache.get(2), -1);
assert('non-evicted key still present', cache.get(3), 3);

cache.put(4, 4);                                       // evicts 1 (LRU — 3 was just accessed)
assert('key 1 evicted', cache.get(1), -1);
assert('key 3 still present', cache.get(3), 3);
assert('key 4 present', cache.get(4), 4);

// Capacity 1
const tiny = new LRUCache(1);
tiny.put(1, 10);
assert('capacity-1: get inserted key', tiny.get(1), 10);
tiny.put(2, 20);
assert('capacity-1: first key evicted', tiny.get(1), -1);
assert('capacity-1: new key present', tiny.get(2), 20);

// Update existing key
const c2 = new LRUCache(2);
c2.put(1, 1);
c2.put(1, 100);
assert('update existing key', c2.get(1), 100);
