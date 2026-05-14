# Event Emitter / Pub-Sub

## Problem

Implement an `EventEmitter` class with `on`, `off`, `emit`, and `once` methods.

## API

```ts
class EventEmitter {
  on(event: string, listener: (...args: any[]) => void): this
  off(event: string, listener: (...args: any[]) => void): this
  emit(event: string, ...args: any[]): boolean
  once(event: string, listener: (...args: any[]) => void): this
}
```

## Example

```ts
const emitter = new EventEmitter();

const greet = (name: string) => console.log(`Hello, ${name}!`);
emitter.on('greet', greet);
emitter.emit('greet', 'Alice'); // → "Hello, Alice!"
emitter.emit('greet', 'Bob');   // → "Hello, Bob!"

emitter.off('greet', greet);
emitter.emit('greet', 'Carol'); // → nothing

const log = (msg: string) => console.log(msg);
emitter.once('ping', log);
emitter.emit('ping', 'first');  // → "first"
emitter.emit('ping', 'second'); // → nothing (already removed)
```

## Constraints

- `on` returns `this` for chaining
- `off` removes only the specific listener instance (reference equality)
- `emit` returns `true` if listeners exist for the event, `false` otherwise
- `once` wraps the listener to auto-remove after first call

## Edge Cases

- `emit` on an event with no listeners → returns false, no error
- `off` on a listener that was never added → no error, no effect
- Multiple listeners on the same event → all fire in registration order
- `once` listener is auto-removed before the listener body runs (to handle re-entrant emits)
