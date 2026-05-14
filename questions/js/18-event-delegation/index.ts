export function delegate(
  parent: Element,
  eventType: string,
  selector: string,
  handler: (event: Event, matchedEl: Element) => void
): () => void {
  // TODO 1: Create an inner listener function that receives the raw event
  // TODO 2: Inside the listener, use (event.target as Element).closest(selector)
  //         to find the nearest ancestor (or self) matching the selector
  // TODO 3: If a match is found AND parent.contains(match), call handler(event, match)
  // TODO 4: Attach the listener: parent.addEventListener(eventType, listener)
  // TODO 5: Return a cleanup function that calls parent.removeEventListener(eventType, listener)
  throw new Error('Not implemented');
}
