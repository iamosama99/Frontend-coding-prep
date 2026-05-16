// TODO: implement solution

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

export function createMachine(config: Machine): MachineInstance {
  throw new Error('Not implemented')
}

export function useMachine(config: Machine): [MachineState, (event: MachineEvent) => void] {
  throw new Error('Not implemented')
}
