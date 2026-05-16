import { getShimmerCSS, Skeleton, SkeletonText } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getShimmerCSS — pure function tests
const css = getShimmerCSS()
test('shimmer CSS is non-empty', typeof css === 'string' && css.length > 0)
test('shimmer CSS contains @keyframes', css.includes('@keyframes'))
test('shimmer CSS contains shimmer name', css.includes('shimmer'))
test('shimmer CSS uses background-position', css.includes('background-position'))
test('shimmer CSS contains 200%', css.includes('200%'))
test('shimmer CSS contains linear-gradient', css.includes('linear-gradient'))
test('shimmer CSS contains prefers-reduced-motion', css.includes('prefers-reduced-motion'))
test('shimmer CSS disables animation for reduced motion', css.includes('animation: none') || css.includes('animation:none'))

// Skeleton is a function
test('Skeleton is a function', typeof Skeleton === 'function')
test('SkeletonText is a function', typeof SkeletonText === 'function')

// getShimmerCSS is deterministic
test('getShimmerCSS is deterministic', getShimmerCSS() === css)
