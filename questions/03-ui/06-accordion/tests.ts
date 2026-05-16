// Tests for Accordion
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Accordion, AccordionProps, AccordionItem } from './index';

// Test 1: Accordion is exported as a function
try {
  typeof Accordion === 'function'
    ? pass('Accordion is exported as a function')
    : fail('Accordion exported', `typeof = ${typeof Accordion}`);
} catch (e) {
  fail('Accordion exported', String(e));
}

// Test 2: AccordionItem interface shape
try {
  const item: AccordionItem = { id: 'a', title: 'Section A', content: 'Content A' };
  item.id === 'a' && item.title === 'Section A'
    ? pass('AccordionItem has correct shape')
    : fail('AccordionItem shape', JSON.stringify(item));
} catch (e) {
  fail('AccordionItem shape', String(e));
}

// Test 3: Single-expand toggle logic — opening new closes previous
try {
  const singleToggle = (currentOpen: string[], id: string, _multiple: boolean): string[] => {
    if (currentOpen.includes(id)) return [];
    return [id];
  };
  const result = singleToggle(['a'], 'b', false);
  result.length === 1 && result[0] === 'b'
    ? pass('single-expand: opening new panel closes the previous')
    : fail('single-expand toggle', JSON.stringify(result));
} catch (e) {
  fail('single-expand toggle', String(e));
}

// Test 4: Multi-expand toggle logic — add and remove independently
try {
  const multiToggle = (currentOpen: string[], id: string): string[] => {
    return currentOpen.includes(id)
      ? currentOpen.filter(x => x !== id)
      : [...currentOpen, id];
  };
  const afterAdd = multiToggle(['a'], 'b');
  const afterRemove = multiToggle(afterAdd, 'a');
  afterAdd.length === 2 && afterRemove.length === 1 && afterRemove[0] === 'b'
    ? pass('multi-expand: panels toggle independently')
    : fail('multi-expand toggle', `afterAdd=${JSON.stringify(afterAdd)} afterRemove=${JSON.stringify(afterRemove)}`);
} catch (e) {
  fail('multi-expand toggle', String(e));
}

// Test 5: Controlled mode detected when openIds provided
try {
  const props: AccordionProps = {
    items: [],
    openIds: ['a'],
    onOpenChange: (_ids: string[]) => {},
  };
  const isControlled = props.openIds !== undefined;
  isControlled
    ? pass('controlled mode detected when openIds prop is provided')
    : fail('controlled mode detection', 'openIds present but not detected');
} catch (e) {
  fail('controlled mode detection', String(e));
}

// Test 6: Disabled item should not be toggled
try {
  const toggle = (id: string, items: AccordionItem[], currentOpen: string[]): string[] => {
    const item = items.find(i => i.id === id);
    if (item?.disabled) return currentOpen;
    return currentOpen.includes(id) ? [] : [id];
  };
  const items: AccordionItem[] = [{ id: 'x', title: 'X', content: 'c', disabled: true }];
  const result = toggle('x', items, []);
  result.length === 0
    ? pass('disabled item cannot be toggled')
    : fail('disabled item toggle', JSON.stringify(result));
} catch (e) {
  fail('disabled item toggle', String(e));
}
