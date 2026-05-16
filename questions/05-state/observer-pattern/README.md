# Observer / Pub-Sub Pattern

Implement an `EventBus` class that supports subscribing to named events, publishing events with a payload, and unsubscribing. Also implement a `useEventBus` React hook that subscribes a component to a specific event and re-renders when the event fires.

## TypeScript Signature

```ts
type EventHandler<T = unknown> = (payload: T) => void

class EventBus {
  subscribe<T>(event: string, handler: EventHandler<T>): () => void
  publish<T>(event: string, payload: T): void
  unsubscribe(event: string, handler: EventHandler): void
  clear(event?: string): void
}

function useEventBus<T>(bus: EventBus, event: string): T | undefined
```

## Usage Example

```ts
const bus = new EventBus()

// Subscribe
const unsub = bus.subscribe<{ message: string }>('chat', ({ message }) => {
  console.log('Received:', message)
})

// Publish
bus.publish('chat', { message: 'Hello!' })
// Logs: Received: Hello!

// Unsubscribe
unsub()
bus.publish('chat', { message: 'World' })
// Nothing logged — handler was removed
```

```tsx
// In a React component
const lastMessage = useEventBus<{ message: string }>(bus, 'chat')
```

## Constraints

- `subscribe` returns an unsubscribe function (the preferred API)
- `unsubscribe` also works directly if the handler reference is passed
- `publish` with no subscribers for that event does nothing (no error)
- `clear()` with no argument removes all subscribers for all events
- `clear(event)` removes all subscribers for that specific event only
- `useEventBus` must clean up its subscription on unmount

## Edge Cases

- Subscribing the same handler twice to the same event — fires twice or deduplicates?
- Publishing to an event that has never been subscribed
- Unsubscribing a handler that was never subscribed — should not throw
- Handler throws during `publish` — should other handlers still fire?
- Subscribing inside a handler callback (re-entrant subscribe during publish)
- `useEventBus` — the event fires, component re-renders, handler is re-created — stale ref?
