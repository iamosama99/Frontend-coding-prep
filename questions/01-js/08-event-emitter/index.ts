export class EventEmitter {
  // TODO 1: Declare a private Map<string, Array<(...args: any[]) => void>> to store listeners per event

  on(event: string, listener: (...args: any[]) => void): this {
    // TODO: Get or create the listeners array for this event, push the listener
    throw new Error('Not implemented');
  }

  off(event: string, listener: (...args: any[]) => void): this {
    // TODO: Get the listeners array for this event and filter out the given listener by reference
    throw new Error('Not implemented');
  }

  emit(event: string, ...args: any[]): boolean {
    // TODO: Get listeners for this event; if none, return false
    // TODO: Call each listener with ...args, return true
    throw new Error('Not implemented');
  }

  once(event: string, listener: (...args: any[]) => void): this {
    // TODO: Create a wrapper function that calls off(event, wrapper) then calls listener(...args)
    // TODO: Register the wrapper with on(event, wrapper)
    throw new Error('Not implemented');
  }
}
