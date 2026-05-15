# Tabs Component

## Problem

Build a `Tabs` compound component family with correct ARIA roles and keyboard navigation. The design uses the compound component pattern: `<Tabs>` owns the state via context, and `<TabList>`, `<Tab>`, and `<TabPanel>` are child components that consume it. Both controlled and uncontrolled modes must be supported.

## TypeScript Signature

```ts
interface TabsProps {
  children: React.ReactNode;
  defaultIndex?: number;          // uncontrolled initial active tab
  index?: number;                 // controlled active tab
  onChange?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';  // default: 'horizontal'
}

interface TabProps {
  children: React.ReactNode;
  disabled?: boolean;
  index: number;                  // position within the tablist (0-based)
}

interface TabPanelProps {
  children: React.ReactNode;
  index: number;                  // matches the Tab at the same index
}

function Tabs(props: TabsProps): JSX.Element
function TabList(props: { children: React.ReactNode }): JSX.Element
function Tab(props: TabProps): JSX.Element
function TabPanel(props: TabPanelProps): JSX.Element
```

## Usage Example

```tsx
<Tabs defaultIndex={0} onChange={(i) => console.log('switched to', i)}>
  <TabList>
    <Tab index={0}>Profile</Tab>
    <Tab index={1}>Settings</Tab>
    <Tab index={2} disabled>Billing</Tab>
  </TabList>
  <TabPanel index={0}>Profile content</TabPanel>
  <TabPanel index={1}>Settings content</TabPanel>
  <TabPanel index={2}>Billing content</TabPanel>
</Tabs>
```

**Expected behaviour:** only the active `TabPanel` is visible (others are hidden or unmounted). Keyboard navigation with Arrow Left/Right (or Up/Down for vertical) moves focus and activates tabs. Home/End jump to first/last. Disabled tabs are skipped. Tab key moves into the active panel.

## Constraints

- `role="tablist"` on `<TabList>`, `role="tab"` on each `<Tab>`, `role="tabpanel"` on each `<TabPanel>`.
- `aria-selected="true"` on the active tab, `false` on others.
- `aria-controls="panel-N-id"` on tab; `aria-labelledby="tab-N-id"` on panel.
- Inactive tabs have `tabindex="-1"`; active tab has `tabindex="0"`.
- Panels are hidden via `hidden` attribute rather than unmounting (preserves form state etc).

## Edge Cases

- Controlled mode with `index` but no `onChange` — tabs are read-only; arrow keys do nothing (or fire onChange if provided).
- Disabled tab at position 0 — first active tab defaults to the next non-disabled tab.
- All tabs disabled — handle gracefully; no tab is selected.
- `orientation="vertical"` — arrow keys should be Up/Down instead of Left/Right.
- Tab panel with no matching tab index — panel should not render (or log a warning).
- Dynamic tabs (tabs added/removed) — active index should be clamped to the new range.
