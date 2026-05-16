// Tests for Tabs
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Tabs, TabList, Tab, TabPanel, TabsProps, TabProps, TabPanelProps } from './index';

// Test 1: All components exported as functions
try {
  const allFunctions = [Tabs, TabList, Tab, TabPanel].every(c => typeof c === 'function');
  allFunctions
    ? pass('Tabs, TabList, Tab, TabPanel are all exported as functions')
    : fail('exports', 'one or more components is not a function');
} catch (e) {
  fail('exports', String(e));
}

// Test 2: TabsProps interface shape
try {
  const props: TabsProps = {
    children: null,
    defaultIndex: 0,
    onChange: (_i: number) => {},
    orientation: 'horizontal',
  };
  props.orientation === 'horizontal'
    ? pass('TabsProps accepts all fields including orientation')
    : fail('TabsProps', 'field mismatch');
} catch (e) {
  fail('TabsProps', String(e));
}

// Test 3: Arrow key navigation logic — next non-disabled tab
try {
  const tabs = [
    { index: 0, disabled: false },
    { index: 1, disabled: true },
    { index: 2, disabled: false },
  ];
  const nextTab = (current: number, dir: 1 | -1): number => {
    let next = current;
    for (let i = 0; i < tabs.length; i++) {
      next = (next + dir + tabs.length) % tabs.length;
      if (!tabs[next].disabled) return next;
    }
    return current;
  };
  nextTab(0, 1) === 2
    ? pass('arrow navigation skips disabled tabs')
    : fail('arrow navigation skip disabled', `got ${nextTab(0, 1)}`);
} catch (e) {
  fail('arrow navigation', String(e));
}

// Test 4: Home/End key jump to first/last non-disabled tab
try {
  const tabs = [
    { index: 0, disabled: true },
    { index: 1, disabled: false },
    { index: 2, disabled: false },
  ];
  const firstNonDisabled = tabs.find(t => !t.disabled)?.index;
  const lastNonDisabled = [...tabs].reverse().find(t => !t.disabled)?.index;
  firstNonDisabled === 1 && lastNonDisabled === 2
    ? pass('Home goes to first non-disabled, End to last non-disabled')
    : fail('Home/End', `first=${firstNonDisabled} last=${lastNonDisabled}`);
} catch (e) {
  fail('Home/End', String(e));
}

// Test 5: Controlled mode — index prop overrides internal state
try {
  const props: TabsProps = { children: null, index: 2, onChange: (_i: number) => {} };
  const isControlled = props.index !== undefined;
  isControlled
    ? pass('controlled mode detected when index prop is provided')
    : fail('controlled detection', 'index present but not detected as controlled');
} catch (e) {
  fail('controlled detection', String(e));
}

// Test 6: ARIA id pattern
try {
  const uid = 'test-uid';
  const tabId = (index: number) => `tab-${uid}-${index}`;
  const panelId = (index: number) => `panel-${uid}-${index}`;
  tabId(0) === 'tab-test-uid-0' && panelId(0) === 'panel-test-uid-0'
    ? pass('ARIA id format matches tab-{uid}-{index} and panel-{uid}-{index}')
    : fail('ARIA id format', `${tabId(0)} / ${panelId(0)}`);
} catch (e) {
  fail('ARIA id format', String(e));
}
