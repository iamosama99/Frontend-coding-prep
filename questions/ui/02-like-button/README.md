# Like / Heart Button

## Problem

Build a `LikeButton` component that lets users toggle a "like" on a piece of content. When clicked, the heart icon fills/unfills and the count updates immediately (optimistic update). If an optional async `onLike` callback is provided and it rejects, the UI rolls back to its previous state.

## TypeScript Signature

```ts
interface LikeButtonProps {
  initialCount?: number;
  initialLiked?: boolean;
  onLike?: (liked: boolean) => Promise<void>;  // optional async callback
  disabled?: boolean;
}

function LikeButton(props: LikeButtonProps): JSX.Element
```

## Usage Example

```tsx
// Basic (local state only)
<LikeButton initialCount={42} initialLiked={false} />

// With async persistence (optimistic update + rollback)
<LikeButton
  initialCount={42}
  initialLiked={false}
  onLike={async (liked) => {
    await api.post('/like', { liked });
  }}
/>
```

**Expected behaviour:** clicking instantly updates the count and fills the heart. A loading state prevents double-clicks while the async call is in flight. If the call fails, the count and heart state revert to what they were before the click.

## Constraints

- The component must be self-contained — no external state management required.
- The count display should handle the transition: `42 → 43` (like) and `43 → 42` (unlike).
- While `onLike` is pending, clicking again must be a no-op (the button should appear in a loading state, not disabled outright, but not accept new clicks).
- CSS scale animation (`transform: scale(1.3)`) should play on the heart element when toggling to "liked".
- `initialCount` defaults to 0; `initialLiked` defaults to `false`.

## Edge Cases

- `onLike` throws synchronously — catch and roll back just like a rejected promise.
- `initialCount` is 0 and user unlikes — count must not go below 0.
- Rapid clicking during the async call — second click must be ignored.
- `disabled` prop — button is not clickable, heart and count do not change.
- No `onLike` provided — component works purely in local state with no async behaviour.
- Very large counts (e.g. `1_000_000`) — consider displaying as "1M" or just showing the raw number.
