# Read More / Show Less

## Problem

Build a `ReadMore` component that truncates long text to a specified number of lines and reveals a "Read more" button. Clicking the button expands the full text and changes the button to "Show less". Clicking "Show less" collapses it again. The truncation must use CSS line-clamping rather than character slicing so it respects the actual rendered width.

## TypeScript Signature

```ts
interface ReadMoreProps {
  children: string;
  lines?: number;          // max lines before clamping, default: 3
  moreLabel?: string;      // default: "Read more"
  lessLabel?: string;      // default: "Show less"
  className?: string;
}

function ReadMore(props: ReadMoreProps): JSX.Element
```

## Usage Example

```tsx
<ReadMore lines={3}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
</ReadMore>

// Custom labels
<ReadMore lines={5} moreLabel="Continue reading" lessLabel="Collapse">
  {longArticleText}
</ReadMore>
```

**Expected behaviour:** when `expanded` is false, the text container has `-webkit-line-clamp: N` applied via inline style or a CSS class. When `expanded` is true, the clamp is removed and full text is shown. The toggle button's label updates accordingly.

## Constraints

- Use CSS `-webkit-line-clamp` with `display: -webkit-box` and `-webkit-box-orient: vertical` for the clamp effect.
- `overflow: hidden` must be on the text container when clamped.
- The button label must reflect the current state and include an accessible description (e.g. `aria-expanded`).
- If the text fits within `lines` without clamping (i.e. the content is short), the button should not render at all. Use a `useRef` + `ResizeObserver` or `scrollHeight > clientHeight` comparison to detect overflow.
- `children` must be a string (not arbitrary JSX) so the overflow detection and any future text processing is deterministic.

## Edge Cases

- Text shorter than `lines` — no button should render; do not show "Read more" on content that is not actually clamped.
- `lines={1}` — single-line truncation with ellipsis at the end of that line.
- Very short `lines` value with very long words — the ellipsis may cut in the middle of a word; this is acceptable CSS behaviour.
- `children` changes while in expanded state — should remain expanded or reset based on your chosen strategy (document the choice).
- `className` forwarded properly to the root container without overriding internal styles.
- Window resize causes the text to reflow — the button visibility should update if the text no longer overflows after resize.
