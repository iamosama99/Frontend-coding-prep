import React from 'react'
import { AnimationName, AnimatedProps } from './index'

// TODO: implement solution
export function getAnimationCSS(name: AnimationName): string {
  throw new Error('Not implemented')
}

export function getAnimationValue(props: Pick<AnimatedProps,
  'animation' | 'duration' | 'delay' | 'easing' | 'iterations' | 'fillMode'>
): string {
  throw new Error('Not implemented')
}

export function Animated(props: AnimatedProps): React.ReactElement {
  throw new Error('Not implemented')
}
