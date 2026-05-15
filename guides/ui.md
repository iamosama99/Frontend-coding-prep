# UI Components — Interview Guide

## Core Mental Model

Every UI component interview question boils down to two decisions: **who owns the state**, and **how do children communicate**. Getting these right before writing a single line of code is what separates a strong candidate from the rest.

### Controlled vs Uncontrolled

A **controlled** component stores its state in the parent. The parent passes a `value` and an `onChange` handler; the component itself never holds the truth. This gives the parent full control — useful when multiple components need to react to the same state, or when you need to validate/transform input before it takes effect.

An **uncontrolled** component stores its own state internally (via `useState` or a ref). The parent only sees the state when it asks (via a `ref` and `imperative handle`). Uncontrolled components are simpler to compose in isolation but harder to synchronise with external state.

The interview move: **always ask which is needed before coding**. For a library Accordion, offer both — a `defaultOpenIndex` prop for uncontrolled behaviour and an `openIndex` + `onOpenChange` pair for controlled.

```ts
// Controlled
<Accordion openIndex={0} onOpenChange={(i) => setOpen(i)} />

// Uncontrolled
<Accordion defaultOpenIndex={0} />
```

### Component Composition

React's composition model is more powerful than inheritance. The three main patterns:

1. **Props drilling** — fine for 1–2 levels, noisy beyond that.
2. **Context + compound components** — parent provides shared state via context; children consume it implicitly. No explicit prop threading.
3. **Render props / slots** — parent delegates rendering to the consumer, enabling inversion of control.

---

## Key Patterns

### Compound Components

A compound component family (e.g. `<Tabs>`, `<Tab>`, `<TabPanel>`) shares implicit state through React context. The parent owns the state; children read it without the consumer needing to wire props manually.

```tsx
const TabsContext = React.createContext<{ active: number; setActive: (i: number) => void } | null>(null);

function Tabs({ children, defaultIndex = 0 }: { children: React.ReactNode; defaultIndex?: number }) {
  const [active, setActive] = React.useState(defaultIndex);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function Tab({ index, children }: { index: number; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!;
  return (
    <button
      role="tab"
      aria-selected={ctx.active === index}
      onClick={() => ctx.setActive(index)}
    >
      {children}
    </button>
  );
}
```

### Portal Pattern

Portals let you render a child into a DOM node outside the parent's hierarchy. Essential for modals, tooltips, and toasts — they escape `overflow: hidden` and stacking context issues.

```tsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
  if (!isOpen) return null;
  return createPortal(
    <div role="dialog" aria-modal="true">
      {children}
    </div>,
    document.body
  );
}
```

Key point: events still bubble through the React tree (not the DOM tree), so context is available inside a portal even though it is rendered elsewhere in the DOM.

### Focus Trap

Any overlay (modal, drawer, command palette) must trap focus inside it while open. The pattern: intercept `Tab` and `Shift+Tab`, collect all focusable elements inside the container, and cycle between first and last.

```tsx
function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean) {
  React.useEffect(() => {
    if (!isActive || !ref.current) return;
    const focusable = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    first?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isActive, ref]);
}
```

### ARIA Patterns

ARIA is not a replacement for semantic HTML — it is a supplement. Rules of thumb:
- Prefer native elements (`<button>`, `<a>`, `<input>`) over `role` overrides.
- Every interactive widget needs keyboard support matching the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).
- `aria-live` regions (polite for non-urgent, assertive for errors) let screen readers announce dynamic content.

---

## Common Interview Gotchas

1. **Forgetting event listener cleanup.** Every `addEventListener` in a `useEffect` needs a corresponding `removeEventListener` in the cleanup. Missing this causes memory leaks and duplicate handlers on re-renders.

2. **Not trapping focus in modals.** If `Tab` can escape the dialog, keyboard-only users get lost in the background page. Interviewers notice this immediately.

3. **Missing keyboard navigation.** Dropdowns, accordions, carousels — all have defined keyboard interactions (Arrow keys, Home, End, Enter, Space, Escape). Coding only mouse interactions fails the a11y bar.

4. **Stale closure in setInterval / setTimeout.** Updating state inside a timer callback that captured a stale value. Fix with a `useRef` for the latest callback or the functional update form of `setState`.

5. **Forgetting `aria-expanded`, `aria-selected`, `aria-controls`.** These attributes communicate state to assistive technology. Adding them as an afterthought signals shallow a11y knowledge.

6. **Not handling the Escape key on overlays.** Escape should close modals, dropdowns, command palettes, and tooltips. This is expected behaviour, not a bonus.

---

## Interview Framing: Talking Through Component Design

Strong candidates narrate their design before writing code. A reliable structure:

1. **Clarify scope** — "Is this controlled or uncontrolled? Should it support multiple open panels simultaneously?" Asking this signals architectural awareness.
2. **State inventory** — list every piece of state the component needs before reaching for `useState`. Group related state.
3. **Accessibility first** — name the ARIA role and keyboard interactions upfront. Interviewers often ask follow-ups; having already thought it through makes you look thorough.
4. **Edge cases out loud** — "What happens if the content is empty? What if the list has 0 items? What if the user is on mobile?" Naming edge cases before being prompted is a strong signal.
5. **Composition decision** — explain why you chose controlled vs uncontrolled, or compound components vs prop drilling. Justifying the trade-off matters more than the choice itself.

Example out-loud framing for a Modal:

> "I'll render the overlay into a portal on `document.body` so it escapes any `overflow: hidden` ancestor. I'll trap focus inside the dialog container on open and restore it to the trigger element on close. The container gets `role='dialog'` and `aria-modal='true'`. Escape closes it. I'll expose a controlled API — `isOpen` plus `onClose` — so the parent drives visibility."
