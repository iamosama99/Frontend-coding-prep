# Optimistic UI Update

Implement a `useLikeButton` hook that handles optimistic UI updates. When a user clicks Like, the count increments immediately in the UI before the server responds. If the server request fails, the count reverts to what it was before the click.

## TypeScript Signature

```ts
interface LikeState {
  count: number
  liked: boolean
  pending: boolean
  error: Error | null
}

interface UseLikeButtonOptions {
  initialCount: number
  initialLiked: boolean
  onLike: (liked: boolean) => Promise<{ count: number }>
}

function useLikeButton(options: UseLikeButtonOptions): {
  state: LikeState
  toggle: () => void
}
```

## Usage Example

```tsx
function LikeButton({ postId }: { postId: string }) {
  const { state, toggle } = useLikeButton({
    initialCount: 42,
    initialLiked: false,
    onLike: async (liked) => {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: liked ? 'POST' : 'DELETE',
      })
      return res.json()  // { count: 43 }
    },
  })

  return (
    <button onClick={toggle} disabled={state.pending}>
      {state.liked ? '❤️' : '🤍'} {state.count}
      {state.error && ' (failed)'}
    </button>
  )
}
```

## Constraints

- The UI must update immediately on click (optimistic) — don't wait for the server
- On success, sync the server-returned `count` to replace the optimistic count
- On failure, revert both `count` and `liked` to their pre-click values
- `pending` is `true` while the request is in-flight
- Rapid double-click: the second click while `pending` is `true` should be ignored or queued

## Edge Cases

- Server returns a different count than the optimistic guess
- Network timeout or server 500 — must revert UI
- Component unmounts while request is in-flight — must not call setState after unmount
- Two rapid clicks — second click while first is pending
- `onLike` throws synchronously instead of returning a rejected Promise
- `initialLiked: true` toggled to false (unlike flow)
