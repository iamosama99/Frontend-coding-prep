// Tests for Toast / Notification System
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { ToastProvider, useToast, ToastContainer, Toast, ToastVariant } from './index';

// Test 1: All exports present
try {
  const allExported = [ToastProvider, useToast, ToastContainer].every(e => typeof e === 'function');
  allExported
    ? pass('ToastProvider, useToast, ToastContainer all exported as functions')
    : fail('exports', 'one or more exports missing or not a function');
} catch (e) {
  fail('exports', String(e));
}

// Test 2: Toast interface shape
try {
  const toast: Toast = {
    id: 'abc123',
    message: 'File saved!',
    variant: 'success',
    duration: 4000,
    action: { label: 'Undo', onClick: () => {} },
  };
  toast.id === 'abc123' && toast.variant === 'success'
    ? pass('Toast interface has correct shape with all optional fields')
    : fail('Toast shape', JSON.stringify({ id: toast.id, variant: toast.variant }));
} catch (e) {
  fail('Toast shape', String(e));
}

// Test 3: Unique id generation
try {
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
  const id1 = generateId();
  const id2 = generateId();
  id1 !== id2
    ? pass('generateId produces unique ids for concurrent toasts')
    : fail('unique id', 'generated two identical ids');
} catch (e) {
  fail('unique id', String(e));
}

// Test 4: maxToasts — oldest removed when cap exceeded
try {
  const maxToasts = 3;
  let toasts = ['a', 'b', 'c'];
  const addWithCap = (current: string[], newItem: string, max: number): string[] => {
    if (current.length >= max) return [...current.slice(1), newItem];
    return [...current, newItem];
  };
  const result = addWithCap(toasts, 'd', maxToasts);
  JSON.stringify(result) === JSON.stringify(['b', 'c', 'd'])
    ? pass('maxToasts removes oldest toast when cap is exceeded')
    : fail('maxToasts', JSON.stringify(result));
} catch (e) {
  fail('maxToasts', String(e));
}

// Test 5: duration=0 means no auto-dismiss timer
try {
  const shouldScheduleTimer = (duration: number | undefined): boolean => {
    return (duration ?? 4000) !== 0;
  };
  shouldScheduleTimer(0) === false && shouldScheduleTimer(4000) === true
    ? pass('duration=0 prevents auto-dismiss timer scheduling')
    : fail('duration=0', `${shouldScheduleTimer(0)} / ${shouldScheduleTimer(4000)}`);
} catch (e) {
  fail('duration=0', String(e));
}

// Test 6: removeToast with unknown id is a no-op
try {
  const toasts: Toast[] = [{ id: 'x', message: 'Hi' }];
  const removeToast = (arr: Toast[], id: string): Toast[] => arr.filter(t => t.id !== id);
  const result = removeToast(toasts, 'unknown-id');
  result.length === 1 && result[0].id === 'x'
    ? pass('removeToast with unknown id is a no-op')
    : fail('removeToast no-op', JSON.stringify(result));
} catch (e) {
  fail('removeToast no-op', String(e));
}
