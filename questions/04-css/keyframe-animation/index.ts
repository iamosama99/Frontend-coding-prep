import React from 'react'

export type AnimationName = 'fadeIn' | 'slideUp' | 'slideDown' | 'bounce' | 'pulse' | 'shake'

export interface AnimatedProps {
  animation: AnimationName
  duration?: string
  delay?: string
  easing?: string
  iterations?: number | 'infinite'
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  children: React.ReactNode
  style?: React.CSSProperties
}

// TODO 1: Implement getAnimationCSS.
//         Return the @keyframes block as a string for the given animation name.
//         Keyframe definitions:
//           fadeIn:   from{opacity:0} to{opacity:1}
//           slideUp:  from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1}
//           slideDown:from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1}
//           bounce:   0%{transform:translateY(0)} 50%{transform:translateY(-20px)} 100%{transform:translateY(0)}
//           pulse:    0%,100%{opacity:1} 50%{opacity:0.5}
//           shake:    0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}
export function getAnimationCSS(name: AnimationName): string {
  throw new Error('Not implemented')
}

// TODO 2: Implement getAnimationValue.
//         Build the CSS animation shorthand string:
//         '[name] [duration] [easing] [delay] [iterations] [fillMode]'
//         e.g. 'fadeIn 0.3s ease 0s 1 both'
export function getAnimationValue(props: Pick<AnimatedProps,
  'animation' | 'duration' | 'delay' | 'easing' | 'iterations' | 'fillMode'>
): string {
  throw new Error('Not implemented')
}

// TODO 3: Implement Animated.
//         Inject the @keyframes CSS via a <style> tag in a React Fragment.
//         Apply the animation shorthand to a <div> wrapping the children.
// TODO 4: Apply defaults: duration='0.3s', delay='0s', easing='ease', iterations=1, fillMode='both'.
// TODO 5: Add a prefers-reduced-motion guard: include a @media (prefers-reduced-motion: reduce)
//         block in the injected CSS that sets animation: none on the animated div.
export function Animated(props: AnimatedProps): React.ReactElement {
  throw new Error('Not implemented')
}
