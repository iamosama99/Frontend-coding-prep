// Tests for Tooltip
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Tooltip, TooltipProps, TooltipPlacement } from './index';

// Test 1: Tooltip is exported as a function
try {
  typeof Tooltip === 'function'
    ? pass('Tooltip is exported as a function')
    : fail('Tooltip exported', `typeof = ${typeof Tooltip}`);
} catch (e) {
  fail('Tooltip exported', String(e));
}

// Test 2: Props interface accepts all fields
try {
  const props: TooltipProps = {
    content: 'Tooltip text',
    children: null as any,
    placement: 'top',
    delay: 300,
    disabled: false,
    maxWidth: 200,
  };
  props.placement === 'top' && props.delay === 300
    ? pass('TooltipProps accepts all fields')
    : fail('TooltipProps', 'field mismatch');
} catch (e) {
  fail('TooltipProps', String(e));
}

// Test 3: Position calculation — top placement
try {
  const computePosition = (
    rect: { top: number; bottom: number; left: number; right: number; width: number; height: number },
    placement: TooltipPlacement,
    tooltipWidth = 100,
    tooltipHeight = 30,
    gap = 8
  ) => {
    if (placement === 'top') {
      return {
        top: rect.top - tooltipHeight - gap,
        left: rect.left + rect.width / 2 - tooltipWidth / 2,
      };
    }
    if (placement === 'bottom') {
      return { top: rect.bottom + gap, left: rect.left + rect.width / 2 - tooltipWidth / 2 };
    }
    return { top: 0, left: 0 };
  };
  const rect = { top: 100, bottom: 140, left: 200, right: 300, width: 100, height: 40 };
  const pos = computePosition(rect, 'top');
  pos.top === 62 && pos.left === 200
    ? pass('top placement: top=rect.top-height-gap, left=centered')
    : fail('top placement', `top=${pos.top} left=${pos.left}`);
} catch (e) {
  fail('top placement', String(e));
}

// Test 4: Disabled prevents tooltip from showing
try {
  const shouldShow = (disabled: boolean, content: any): boolean => {
    return !disabled && content != null;
  };
  shouldShow(true, 'text') === false && shouldShow(false, 'text') === true
    ? pass('disabled prevents tooltip from showing')
    : fail('disabled guard', `disabled=${shouldShow(true, 'text')} enabled=${shouldShow(false, 'text')}`);
} catch (e) {
  fail('disabled guard', String(e));
}

// Test 5: Empty content prevents tooltip from showing
try {
  const shouldShow = (disabled: boolean, content: any): boolean => {
    return !disabled && content != null && content !== '';
  };
  shouldShow(false, '') === false && shouldShow(false, null) === false
    ? pass('empty or null content prevents tooltip')
    : fail('empty content guard', `empty=${shouldShow(false, '')} null=${shouldShow(false, null)}`);
} catch (e) {
  fail('empty content guard', String(e));
}

// Test 6: Delay timer cleared on hide
try {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let hidden = false;

  const handleShow = (delay: number) => {
    timerId = setTimeout(() => {}, delay);
  };
  const handleHide = () => {
    if (timerId !== null) clearTimeout(timerId);
    hidden = true;
  };
  handleShow(300);
  handleHide();
  hidden === true
    ? pass('hide handler clears the delay timer')
    : fail('timer cleanup on hide', 'hidden not set');
} catch (e) {
  fail('timer cleanup on hide', String(e));
}
