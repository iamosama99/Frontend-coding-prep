import { useState } from 'react'

type Reducer<S, A> = (state: S, action: A) => S
type Dispatch<A> = (action: A) => void

// TODO: implement solution
export function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): [S, Dispatch<A>] {
  throw new Error('Not implemented')
}
