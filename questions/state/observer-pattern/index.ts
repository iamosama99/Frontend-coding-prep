import { useState, useEffect } from 'react'

type EventHandler<T = unknown> = (payload: T) => void

/**
 * TODO 1: Store subscribers in a Map<string, Set<EventHandler>>.
 *         A Set prevents duplicate handlers for the same event.
 *         (If duplicates are intentional, use an array instead — your choice.)
 *
 * TODO 2: subscribe(event, handler):
 *   - Create the Set for the event if it doesn't exist yet.
 *   - Add the handler to the Set.
 *   - Return () => this.unsubscribe(event, handler) for easy cleanup.
 *
 * TODO 3: publish(event, payload):
 *   - Get the Set for the event. If none, return early.
 *   - Snapshot the Set before iterating (handlers.forEach or [...handlers])
 *     so re-entrant subscribes during publish don't affect this call.
 *   - Call each handler with the payload. Wrap in try/catch so one failing
 *     handler doesn't prevent others from running.
 *
 * TODO 4: unsubscribe(event, handler):
 *   - Remove the handler from the Set. Do nothing if not found.
 *
 * TODO 5: clear(event?):
 *   - No argument: clear the entire Map.
 *   - With argument: delete only that event's Set.
 *
 * TODO 6: useEventBus<T>(bus, event):
 *   - useState<T | undefined>(undefined).
 *   - useEffect: subscribe to bus with a handler that calls setState.
 *     Return the unsubscribe function as cleanup.
 *   - Re-subscribe when bus or event changes.
 */
export class EventBus {
  // TODO: implement
}

export function useEventBus<T>(bus: EventBus, event: string): T | undefined {
  // TODO: implement
  throw new Error('Not implemented')
}
