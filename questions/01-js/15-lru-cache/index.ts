export class LRUCache {
  // TODO 1: Store capacity and use a Map<number, number> as the cache
  //         JavaScript's Map preserves insertion order — this is the key insight
  //         The least recently used entry is always the FIRST entry in the Map

  constructor(capacity: number) {
    // TODO 2: Save capacity, initialise the Map
    throw new Error('Not implemented');
  }

  get(key: number): number {
    // TODO 3: If key doesn't exist in the map, return -1
    // TODO 4: If it exists: delete it from the map and re-insert it
    //         (re-inserting moves it to the END — making it most recently used)
    // TODO 5: Return the value
    throw new Error('Not implemented');
  }

  put(key: number, value: number): void {
    // TODO 6: If key already exists, delete it first (to reorder it on re-insert)
    // TODO 7: If the cache is at capacity, evict the first entry in the Map
    //         (map.keys().next().value gives the LRU key)
    // TODO 8: Insert the new key-value pair at the end of the Map
    throw new Error('Not implemented');
  }
}
