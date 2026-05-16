import { useState } from 'react'

type MachineState = string
type MachineEvent = string

interface Transition {
  target: MachineState
  guard?: () => boolean
  action?: () => void
}

interface StateConfig {
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

/**
 * TODO 1: Implement createMachine.
 *   - Track current state in a closure variable starting at config.initial.
 *   - send(event):
 *       a. Look up config.states[current].on?.[event]. If undefined, return.
 *       b. If transition.guard is defined, call it. If it returns false, return.
 *       c. Call config.states[current].exit?.() (exit current state).
 *       d. Call transition.action?.() (run transition side effect).
 *       e. Update current to transition.target.
 *       f. Call config.states[current].entry?.() (enter new state).
 *   - can(event): check if the event exists AND guard (if any) returns true.
 *   - Return { get current(), send, can } — use a getter for current so it's live.
 *
 * TODO 2: Implement useMachine.
 *   - Create the machine instance once with useRef (so it doesn't reset on re-renders).
 *   - useState to track the current state for React rendering.
 *   - Wrap send to also call setState with the new current after each send.
 *   - Return [currentState, wrappedSend].
 *
 * TODO 3: Handle the edge case where send is called inside an entry/exit callback.
 *         Consider using a simple isTransitioning flag to queue or ignore re-entrant calls.
 *
 * TODO 4: Export both createMachine and useMachine.
 */
export function createMachine(config: Machine): MachineInstance {
  // TODO: implement
  throw new Error('Not implemented')
}

export function useMachine(config: Machine): [MachineState, (event: MachineEvent) => void] {
  // TODO: implement
  throw new Error('Not implemented')
}
