# Copy-to-Clipboard Button

## Problem

Build a `CopyButton` component that copies a given text string to the clipboard when clicked. After a successful copy, the button label briefly changes to "Copied!" (or a custom success message) and then reverts to its original label after a configurable delay. The component must gracefully handle environments where the Clipboard API is unavailable.

## TypeScript Signature

```ts
interface CopyButtonProps {
  text: string;                    // the string to copy
  label?: string;                  // button label, default: "Copy"
  successLabel?: string;           // feedback label, default: "Copied!"
  successDuration?: number;        // ms before reverting, default: 2000
  onCopy?: (text: string) => void; // optional callback on success
  onError?: (err: unknown) => void;// optional callback on failure
}

function CopyButton(props: CopyButtonProps): JSX.Element
```

## Usage Example

```tsx
<CopyButton text="npm install my-package" />

<CopyButton
  text={apiKey}
  label="Copy API Key"
  successLabel="Key copied!"
  successDuration={3000}
  onCopy={(text) => analytics.track('api_key_copied')}
/>
```

**Expected behaviour:** clicking the button calls `navigator.clipboard.writeText(text)`. On success, the label switches to `successLabel` for `successDuration` milliseconds, then reverts. The button is disabled during this window to prevent double-copies.

## Constraints

- Use `navigator.clipboard.writeText` as the primary method.
- Fall back to `document.execCommand('copy')` if the Clipboard API is unavailable.
- The timeout must be cleared if the component unmounts before it fires (use `useEffect` cleanup or `clearTimeout`).
- The button must remain accessible: announce the state change to screen readers via `aria-live` or by updating `aria-label`.
- `successDuration` defaults to 2000 ms if not provided.

## Edge Cases

- `text` is an empty string — still attempt the copy, do not short-circuit.
- Clipboard API denied by browser permissions — call `onError` and show an error label briefly.
- Component unmounts while the success timer is running — timer must be cleared to prevent state updates on an unmounted component.
- `successDuration` set to 0 — revert immediately (effectively no feedback window).
- The `text` prop changes while the success state is active — the revert should still complete for the previous copy, not restart.
- Multiple rapid clicks — only one success feedback window should be active at a time; reset the timer on each click.
