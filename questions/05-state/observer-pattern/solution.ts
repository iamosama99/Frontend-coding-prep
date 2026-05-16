// TODO: implement solution

type EventHandler<T = unknown> = (payload: T) => void

export class EventBus {
  // TODO: implement
}

export function useEventBus<T>(bus: EventBus, event: string): T | undefined {
  throw new Error('Not implemented')
}
