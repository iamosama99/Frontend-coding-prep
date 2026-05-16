import { getAnimationCSS, getAnimationValue, Animated } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getAnimationCSS — pure function tests
const fadeCSS = getAnimationCSS('fadeIn')
test('fadeIn CSS contains @keyframes', fadeCSS.includes('@keyframes'))
test('fadeIn CSS contains opacity', fadeCSS.includes('opacity'))
test('fadeIn CSS contains fadeIn name', fadeCSS.includes('fadeIn'))

const slideCSS = getAnimationCSS('slideUp')
test('slideUp CSS contains translateY', slideCSS.includes('translateY'))
test('slideUp CSS contains opacity', slideCSS.includes('opacity'))

const bounceCSS = getAnimationCSS('bounce')
test('bounce CSS has multiple keyframe stops', bounceCSS.includes('50%') || bounceCSS.includes('0%'))

const shakeCSS = getAnimationCSS('shake')
test('shake CSS contains translateX', shakeCSS.includes('translateX'))

// getAnimationValue — pure function tests
const value = getAnimationValue({
  animation: 'fadeIn',
  duration: '0.5s',
  delay: '0s',
  easing: 'ease-out',
  iterations: 1,
  fillMode: 'both',
})
test('animation value contains animation name', value.includes('fadeIn'))
test('animation value contains duration', value.includes('0.5s'))
test('animation value contains easing', value.includes('ease-out'))
test('animation value contains fillMode', value.includes('both'))

// Animated is a function
test('Animated is a function', typeof Animated === 'function')
