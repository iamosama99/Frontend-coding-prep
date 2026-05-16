# Infinite Scroll

## Problem

Build an `InfiniteScroll` component that automatically loads more content when the user scrolls near the bottom of a list. It uses an `IntersectionObserver` on a sentinel element placed after the last item. When the sentinel enters the viewport, the `onLoadMore` callback fires to fetch the next page.

## TypeScript Signature

```ts
interface InfiniteScrollProps {
  onLoadMore: () => Promise<void> | void;
  hasMore: boolean;              // false = no more pages to fetch
  loading?: boolean;             // true while a fetch is in progress
  threshold?: number;            // IntersectionObserver rootMargin offset, default: 200 (px)
  loader?: React.ReactNode;      // custom loading indicator
  endMessage?: React.ReactNode;  // shown when hasMore is false
  children: React.ReactNode;     // the list content
}

function InfiniteScroll(props: InfiniteScrollProps): JSX.Element
```

## Usage Example

```tsx
const [items, setItems] = useState<Item[]>([]);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);

const loadMore = async () => {
  setLoading(true);
  const newItems = await fetchPage(page);
  setItems(prev => [...prev, ...newItems]);
  setHasMore(newItems.length > 0);
  setLoading(false);
};

<InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} loading={loading}>
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</InfiniteScroll>
```

**Expected behaviour:** as the user scrolls, when the sentinel div becomes visible within the threshold, `onLoadMore` is called if `hasMore` is true and `loading` is false. While loading, the sentinel is disconnected (or the guard prevents re-triggering). When `hasMore` becomes false, the sentinel is removed and `endMessage` is displayed.

## Constraints

- Use `IntersectionObserver` — do not use scroll event listeners.
- Disconnect and reconnect the observer when the sentinel ref changes or props change.
- The observer should be disconnected when `loading` is true to prevent duplicate calls.
- Clean up the observer on component unmount.
- `threshold` maps to `rootMargin: '0px 0px ${threshold}px 0px'` to trigger before the sentinel is fully in view.

## Edge Cases

- `onLoadMore` called while already loading — must be blocked (guard with `loading` state or an internal `isFetching` ref).
- `hasMore` transitions from true to false mid-scroll — sentinel is removed immediately.
- Viewport is taller than all the loaded content — `onLoadMore` should fire immediately to fill the viewport.
- The sentinel's IntersectionObserver fires with `isIntersecting: false` initially — do not call onLoadMore.
- `children` is empty on mount with `hasMore: true` — should trigger the first load.
- Component unmounts during a fetch — the returned promise resolves or rejects after unmount; ensure no state update happens on the unmounted component.
