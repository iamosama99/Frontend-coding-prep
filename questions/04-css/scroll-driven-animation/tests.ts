import { getScrollDrivenCSS, useScrollReveal, ScrollAnimated } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getScrollDrivenCSS — pure function tests
const viewCSS = getScrollDrivenCSS('fadeIn', 'view')
test('view CSS is non-empty', typeof viewCSS === 'string' && viewCSS.length > 0)
test('view CSS contains animation-timeline', viewCSS.includes('animation-timeline'))
test('view CSS contains view()', viewCSS.includes('view()'))
test('view CSS contains @keyframes', viewCSS.includes('@keyframes'))
test('view CSS contains fadeIn', viewCSS.includes('fadeIn'))
test('view CSS contains prefers-reduced-motion', viewCSS.includes('prefers-reduced-motion'))

const scrollCSS = getScrollDrivenCSS('slideUp', 'scroll')
test('scroll timeline CSS contains scroll()', scrollCSS.includes('scroll()'))
test('scroll CSS contains slideUp', scrollCSS.includes('slideUp'))

// Different animations produce different CSS
const css2 = getScrollDrivenCSS('scaleIn', 'view')
test('different animations produce different keyframes', viewCSS !== css2)

// useScrollReveal and ScrollAnimated are functions
test('useScrollReveal is a function', typeof useScrollReveal === 'function')
test('ScrollAnimated is a function', typeof ScrollAnimated === 'function')
