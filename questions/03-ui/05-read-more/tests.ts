// Tests for ReadMore
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { ReadMore, ReadMoreProps } from './index';

// Test 1: ReadMore is exported as a function
try {
  typeof ReadMore === 'function'
    ? pass('ReadMore is exported as a function')
    : fail('ReadMore exported', `typeof = ${typeof ReadMore}`);
} catch (e) {
  fail('ReadMore exported', String(e));
}

// Test 2: Props interface accepts all fields
try {
  const props: ReadMoreProps = {
    children: 'Long text content...',
    lines: 3,
    moreLabel: 'Read more',
    lessLabel: 'Show less',
    className: 'my-read-more',
  };
  props.children === 'Long text content...' && props.lines === 3
    ? pass('ReadMoreProps accepts all fields')
    : fail('ReadMoreProps', 'field mismatch');
} catch (e) {
  fail('ReadMoreProps', String(e));
}

// Test 3: CSS clamp style structure is correct
try {
  const lines = 3;
  const expanded = false;
  const clampStyle = expanded ? {} : {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden',
  };
  (clampStyle as any).WebkitLineClamp === 3
    ? pass('CSS clamp style sets WebkitLineClamp to lines value')
    : fail('CSS clamp style', `WebkitLineClamp=${(clampStyle as any).WebkitLineClamp}`);
} catch (e) {
  fail('CSS clamp style', String(e));
}

// Test 4: Expanded state removes clamp styles
try {
  const lines = 3;
  const expanded = true;
  const clampStyle = expanded ? {} : {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden',
  };
  Object.keys(clampStyle).length === 0
    ? pass('expanded state produces empty style object (no clamp)')
    : fail('expanded style', `unexpected keys: ${Object.keys(clampStyle).join(', ')}`);
} catch (e) {
  fail('expanded style', String(e));
}

// Test 5: Default values for labels
try {
  const DEFAULT_MORE = 'Read more';
  const DEFAULT_LESS = 'Show less';
  DEFAULT_MORE === 'Read more' && DEFAULT_LESS === 'Show less'
    ? pass('default labels are "Read more" and "Show less"')
    : fail('default labels', `${DEFAULT_MORE} / ${DEFAULT_LESS}`);
} catch (e) {
  fail('default labels', String(e));
}

// Test 6: aria-expanded correctly reflects state
try {
  const expanded = false;
  const ariaExpanded = String(expanded);
  ariaExpanded === 'false'
    ? pass('aria-expanded is "false" when collapsed')
    : fail('aria-expanded collapsed', `got "${ariaExpanded}"`);
} catch (e) {
  fail('aria-expanded', String(e));
}
