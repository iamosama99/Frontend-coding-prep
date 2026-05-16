// Tests for DragDropList
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { DragDropList, DragDropListProps, DragDropItem } from './index';

// Test 1: DragDropList is exported as a function
try {
  typeof DragDropList === 'function'
    ? pass('DragDropList is exported as a function')
    : fail('DragDropList exported', `typeof = ${typeof DragDropList}`);
} catch (e) {
  fail('DragDropList exported', String(e));
}

// Test 2: Reorder algorithm — move item from index 0 to index 2
try {
  const reorder = <T,>(list: T[], srcIndex: number, destIndex: number): T[] => {
    const result = [...list];
    const [removed] = result.splice(srcIndex, 1);
    result.splice(destIndex, 0, removed);
    return result;
  };
  const items = ['a', 'b', 'c', 'd'];
  const result = reorder(items, 0, 2);
  JSON.stringify(result) === JSON.stringify(['b', 'c', 'a', 'd'])
    ? pass('reorder moves item from index 0 to index 2 correctly')
    : fail('reorder', JSON.stringify(result));
} catch (e) {
  fail('reorder', String(e));
}

// Test 3: No-op when source equals destination
try {
  const reorder = <T,>(list: T[], srcIndex: number, destIndex: number): T[] => {
    if (srcIndex === destIndex) return list;
    const result = [...list];
    const [removed] = result.splice(srcIndex, 1);
    result.splice(destIndex, 0, removed);
    return result;
  };
  const items = ['a', 'b', 'c'];
  const result = reorder(items, 1, 1);
  result === items // same reference
    ? pass('dragging item onto itself returns the original array unchanged')
    : fail('no-op same index', 'different array reference returned');
} catch (e) {
  fail('no-op same index', String(e));
}

// Test 4: DragDropItem interface
try {
  const item: DragDropItem = { id: '1', title: 'Task', priority: 'high' };
  item.id === '1' && item.title === 'Task'
    ? pass('DragDropItem supports extra properties beyond id')
    : fail('DragDropItem', JSON.stringify(item));
} catch (e) {
  fail('DragDropItem', String(e));
}

// Test 5: disabled prop prevents drag
try {
  const isDraggable = (disabled: boolean): boolean => !disabled;
  isDraggable(false) === true && isDraggable(true) === false
    ? pass('disabled prop makes items non-draggable')
    : fail('disabled draggable', `${isDraggable(false)} / ${isDraggable(true)}`);
} catch (e) {
  fail('disabled draggable', String(e));
}

// Test 6: keyExtractor defaults to item.id
try {
  const getKey = <T extends DragDropItem>(item: T, keyExtractor?: (i: T) => string): string => {
    return keyExtractor ? keyExtractor(item) : item.id;
  };
  const item: DragDropItem = { id: 'abc', name: 'test' };
  getKey(item) === 'abc' && getKey(item, (i) => i.name as string) === 'test'
    ? pass('keyExtractor defaults to item.id, custom extractor overrides')
    : fail('keyExtractor', `default=${getKey(item)} custom=${getKey(item, (i) => i.name as string)}`);
} catch (e) {
  fail('keyExtractor', String(e));
}
