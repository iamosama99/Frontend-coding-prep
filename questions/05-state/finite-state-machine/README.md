# Finite State Machine (Lite)

Implement a lightweight FSM factory `createMachine` and a `useMachine` React hook. The machine is defined by a state map that declares valid transitions from each state, optional guards (conditions that must be true for a transition to fire), and optional entry/exit side effects per state.

## TypeScript Signature

```ts
type MachineState = string
type MachineEvent = string

interface Transition {
  target: MachineState
  guard?: () => boolean
  action?: () => void
}

type StateConfig = {
  on?: Record<MachineEvent, Transition>
  entry?: () => void
  exit?: () => void
}

interface Machine {
  states: Record<MachineState, StateConfig>
  initial: MachineState
}

interface MachineInstance {
  current: MachineState
  send(event: MachineEvent): void
  can(event: MachineEvent): boolean
}

function createMachine(config: Machine): MachineInstance
function useMachine(config: Machine): [MachineState, (event: MachineEvent) => void]
```

## Usage Example

```ts
const trafficLight = createMachine({
  initial: 'red',
  states: {
    red:   { on: { NEXT: { target: 'green', action: () => console.log('Go!') } } },
    green: { on: { NEXT: { target: 'yellow' } } },
    yellow:{ on: { NEXT: { target: 'red' } } },
  }
})

trafficLight.send('NEXT')   // transitions to 'green', logs 'Go!'
trafficLight.current        // 'green'
trafficLight.can('NEXT')    // true
trafficLight.can('INVALID') // false
```

## Constraints

- `send` with an event not defined for the current state does nothing (no error)
- `send` calls `guard()` if defined — only transitions if it returns `true`
- `send` calls `exit()` on the current state, then `action()` on the transition, then `entry()` on the new state
- `can(event)` returns `true` if the event is defined for the current state AND the guard passes
- `useMachine` re-renders the component when state changes

## Edge Cases

- Sending an unknown event in any state — silently ignored
- Guard returns `false` — no transition, no side effects
- `entry` or `exit` is undefined — skip without error
- Self-transition (target === current state) — exit and entry should still fire
- `send` called inside an `entry` callback (re-entrant send)
- Machine with a single state and no transitions
