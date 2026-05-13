# useInterval

## Problem

Implement a `useInterval` hook that calls a callback on a fixed interval. The key challenge is avoiding the **stale closure trap**: if the callback uses state or props, it must always see the *latest* values without requiring the interval to be cleared and restarted.

## TypeScript Signature

```ts
function useInterval(callback: () => void, delay: number | null): void
```

Passing `null` as `delay` pauses the interval (it won't start until a real number is passed).

## Usage Example

```tsx
function Ticker() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(c => c + 1);  // uses functional updater — safe
  }, 1000);

  return <p>Tick: {count}</p>;
}
```

```tsx
// Pausable example
function PausableTicker() {
  const [running, setRunning] = useState(true);
  const [count, setCount] = useState(0);

  useInterval(() => setCount(c => c + 1), running ? 500 : null);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setRunning(r => !r)}>Toggle</button>
    </div>
  );
}
```

## Constraints

- Store the `callback` in a `useRef` and update it after every render (no dep array on this effect). This is the classic Overreacted pattern — the interval never restarts, but always calls the latest callback.
- Use a separate `useEffect` with `[delay]` dep to start/stop the interval.
- When `delay` is `null`, do not start the interval.
- Return `clearInterval` as the cleanup.

## Edge Cases

- `delay` changes from a number to `null` — the interval must be cleared immediately.
- `delay` changes from `null` to a number — the interval starts from that moment.
- `callback` changes (e.g., closes over new state) — must NOT restart the interval; use the ref to always call the latest version.
- `delay` of 0 — valid; fires as fast as possible.
- Component unmounts — interval must be cleared.
