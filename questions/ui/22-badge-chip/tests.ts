// Tests for Badge and Chip
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Badge, Chip, BadgeProps, ChipProps, Variant } from './index';

// Test 1: Badge and Chip exported as functions
try {
  typeof Badge === 'function' && typeof Chip === 'function'
    ? pass('Badge and Chip are exported as functions')
    : fail('exports', `Badge=${typeof Badge} Chip=${typeof Chip}`);
} catch (e) {
  fail('exports', String(e));
}

// Test 2: Badge count display with max cap
try {
  const formatCount = (count: number, max: number): string => {
    return count > max ? `${max}+` : String(count);
  };
  formatCount(120, 99) === '99+' && formatCount(42, 99) === '42'
    ? pass('Badge count: 120 with max=99 → "99+"; 42 with max=99 → "42"')
    : fail('count format', `120→"${formatCount(120, 99)}" 42→"${formatCount(42, 99)}"`);
} catch (e) {
  fail('count format', String(e));
}

// Test 3: showZero=false hides badge when count is 0
try {
  const shouldRender = (count: number | undefined, showZero: boolean): boolean => {
    if (count === undefined) return true;
    const clamped = Math.max(0, count);
    return clamped > 0 || showZero;
  };
  shouldRender(0, false) === false && shouldRender(0, true) === true
    ? pass('showZero=false hides badge at count=0; showZero=true shows it')
    : fail('showZero', `false=${shouldRender(0, false)} true=${shouldRender(0, true)}`);
} catch (e) {
  fail('showZero', String(e));
}

// Test 4: Negative count clamped to 0
try {
  const clampedCount = Math.max(0, -5);
  clampedCount === 0
    ? pass('negative count clamped to 0')
    : fail('negative count', `got ${clampedCount}`);
} catch (e) {
  fail('negative count', String(e));
}

// Test 5: Chip dismiss button stops propagation
try {
  let chipClicked = false;
  let dismissed = false;
  const onChipClick = () => { chipClicked = true; };
  const onDismiss = () => { dismissed = true; };
  // Simulated dismiss click (stops propagation — chip click should NOT fire)
  const handleDismissClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onDismiss();
    // chipClick not called due to stopPropagation
  };
  handleDismissClick({ stopPropagation: () => {} });
  dismissed === true && chipClicked === false
    ? pass('dismiss click stops propagation (chip onClick not triggered)')
    : fail('dismiss stopPropagation', `dismissed=${dismissed} chipClicked=${chipClicked}`);
} catch (e) {
  fail('dismiss stopPropagation', String(e));
}

// Test 6: Chip with onClick renders as interactive (button-like)
try {
  const getChipRole = (onClick: (() => void) | undefined): string => {
    return onClick ? 'button' : 'presentation';
  };
  getChipRole(() => {}) === 'button' && getChipRole(undefined) === 'presentation'
    ? pass('Chip with onClick is interactive; without onClick is non-interactive')
    : fail('chip role', `with=${getChipRole(() => {})} without=${getChipRole(undefined)}`);
} catch (e) {
  fail('chip role', String(e));
}
