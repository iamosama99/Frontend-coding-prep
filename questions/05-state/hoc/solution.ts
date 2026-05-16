import { ComponentType } from 'react'

interface LoggerOptions {
  logMount?: boolean
  logUnmount?: boolean
  logPropChanges?: boolean
}

// TODO: implement solution
export function withLogger<P extends object>(
  Component: ComponentType<P>,
  options: LoggerOptions = {}
): ComponentType<P> {
  throw new Error('Not implemented')
}
