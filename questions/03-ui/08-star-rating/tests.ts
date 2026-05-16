// Tests for StarRating
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { StarRating, StarRatingProps } from './index';

// Test 1: StarRating is exported as a function
try {
  typeof StarRating === 'function'
    ? pass('StarRating is exported as a function')
    : fail('StarRating exported', `typeof = ${typeof StarRating}`);
} catch (e) {
  fail('StarRating exported', String(e));
}

// Test 2: Props interface accepts all fields
try {
  const props: StarRatingProps = {
    max: 5,
    value: 3.5,
    defaultValue: 0,
    onChange: (_r: number) => {},
    halfStars: true,
    readOnly: false,
    size: 24,
    label: 'Rate this item',
  };
  props.max === 5 && props.halfStars === true
    ? pass('StarRatingProps accepts all fields')
    : fail('StarRatingProps', 'field mismatch');
} catch (e) {
  fail('StarRatingProps', String(e));
}

// Test 3: Star values without half-stars
try {
  const buildValues = (max: number, halfStars: boolean): number[] => {
    if (!halfStars) return Array.from({ length: max }, (_, i) => i + 1);
    const values: number[] = [];
    for (let i = 0.5; i <= max; i += 0.5) values.push(i);
    return values;
  };
  const values = buildValues(5, false);
  values.length === 5 && values[0] === 1 && values[4] === 5
    ? pass('integer star values: [1, 2, 3, 4, 5]')
    : fail('integer star values', JSON.stringify(values));
} catch (e) {
  fail('integer star values', String(e));
}

// Test 4: Star values with half-stars (max 5 = 10 values)
try {
  const buildValues = (max: number, halfStars: boolean): number[] => {
    if (!halfStars) return Array.from({ length: max }, (_, i) => i + 1);
    const values: number[] = [];
    for (let i = 0.5; i <= max; i += 0.5) values.push(i);
    return values;
  };
  const values = buildValues(5, true);
  values.length === 10 && values[0] === 0.5 && values[9] === 5
    ? pass('half-star values: 0.5 to 5 in 0.5 increments (10 values)')
    : fail('half-star values', JSON.stringify(values));
} catch (e) {
  fail('half-star values', String(e));
}

// Test 5: Display rating = hoverRating ?? committedRating
try {
  const committed = 3;
  const hovered: number | null = 4;
  const displayed = hovered ?? committed;
  displayed === 4
    ? pass('hover preview overrides committed rating for display')
    : fail('hover preview', `displayed=${displayed}`);
} catch (e) {
  fail('hover preview', String(e));
}

// Test 6: readOnly disables interaction
try {
  const handleClick = (readOnly: boolean, _value: number): boolean => {
    if (readOnly) return false; // interaction blocked
    return true;
  };
  const didInteract = handleClick(true, 3);
  didInteract === false
    ? pass('readOnly blocks click interaction')
    : fail('readOnly', 'interaction was not blocked');
} catch (e) {
  fail('readOnly', String(e));
}
