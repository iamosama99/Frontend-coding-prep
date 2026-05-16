# Compound Components Pattern

Build a `Tabs` compound component. The parent component manages the active tab state and exposes it to its children (`Tab` and `TabPanel`) via context — without requiring explicit prop-passing between the parts.

## TypeScript Signature

```ts
interface TabsProps {
  defaultTab: string
  children: ReactNode
  onChange?: (tabId: string) => void
}

interface TabProps {
  id: string
  children: ReactNode
  disabled?: boolean
}

interface TabPanelProps {
  tabId: string
  children: ReactNode
}

// Attached as static properties
Tabs.Tab: (props: TabProps) => JSX.Element
Tabs.Panel: (props: TabPanelProps) => JSX.Element
```

## Usage Example

```tsx
<Tabs defaultTab="overview" onChange={(id) => console.log('active:', id)}>
  <div role="tablist">
    <Tabs.Tab id="overview">Overview</Tabs.Tab>
    <Tabs.Tab id="details">Details</Tabs.Tab>
    <Tabs.Tab id="reviews" disabled>Reviews (soon)</Tabs.Tab>
  </div>

  <Tabs.Panel tabId="overview">Overview content here</Tabs.Panel>
  <Tabs.Panel tabId="details">Details content here</Tabs.Panel>
  <Tabs.Panel tabId="reviews">Reviews content here</Tabs.Panel>
</Tabs>
```

## Constraints

- `Tabs.Tab` highlights as active when its `id` matches the active tab
- `Tabs.Panel` renders its children only when `tabId` matches the active tab
- Clicking a disabled `Tab` does nothing and applies `aria-disabled="true"`
- `onChange` is called whenever the active tab changes (not on initial render)
- `useContext` must throw a clear error if used outside `<Tabs>`

## Edge Cases

- `defaultTab` doesn't match any `Tab` id — no tab is initially active
- All tabs are `disabled` — clicking does nothing
- `onChange` callback changes on each parent render — use `useRef` to avoid stale ref
- Removing a Tab that was active — panel disappears, no active highlight
- Keyboard navigation: Tab key moves focus, Enter/Space selects (bonus)
- Nested `Tabs` components — inner tabs should not bleed state to outer tabs
