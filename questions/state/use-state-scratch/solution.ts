// TODO: implement solution

type SetStateAction<S> = S | ((prevState: S) => S)
type Dispatch<A> = (action: A) => void

export function resetHooks(): void {
  throw new Error('Not implemented')
}

export function render(component: () => void): void {
  throw new Error('Not implemented')
}

export function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  throw new Error('Not implemented')
}
