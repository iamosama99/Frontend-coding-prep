// useState from scratch — runs outside React, demonstrates the closure mechanism

type SetStateAction<S> = S | ((prevState: S) => S)
type Dispatch<A> = (action: A) => void

/**
 * TODO 1: Declare module-level storage:
 *   - an array to hold state values for each hook slot
 *   - a current hook index (cursor) that resets before each render
 *   - a reference to the "component" function so setState can re-invoke it
 *
 * TODO 2: Implement useState<S>(initialState):
 *   a. Capture the current index, then increment it.
 *   b. If this slot has no value yet, initialize it:
 *      - if initialState is a function, call it; otherwise use the value directly.
 *   c. Create a setState function that:
 *      - accepts a value or an updater function
 *      - updates the slot (call the updater with current state if it's a function)
 *      - triggers a re-render by calling the stored component function
 *   d. Return [currentStateValue, setState].
 *
 * TODO 3: Implement resetHooks() — sets the cursor back to 0.
 *         Must be called at the start of every render.
 *
 * TODO 4: Implement render(component) — stores the component reference,
 *         calls resetHooks(), then calls component().
 *
 * TODO 5: Handle the functional initialState case:
 *         if (typeof initialState === 'function') call it once for the initial value.
 */

const hooks: unknown[] = []
let hookIndex = 0
let currentComponent: (() => void) | null = null

export function resetHooks(): void {
  // TODO: implement
  throw new Error('Not implemented')
}

export function render(component: () => void): void {
  // TODO: implement
  throw new Error('Not implemented')
}

export function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  // TODO: implement
  throw new Error('Not implemented')
}
