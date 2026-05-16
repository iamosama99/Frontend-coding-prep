import { getContainerCSS, ContainerQueryCard } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getContainerCSS — pure function tests
const css = getContainerCSS()
test('container CSS is non-empty', typeof css === 'string' && css.length > 0)
test('CSS contains container-type', css.includes('container-type'))
test('CSS contains inline-size', css.includes('inline-size'))
test('CSS contains @container rule', css.includes('@container'))
test('CSS contains min-width', css.includes('min-width'))
test('CSS has flex layout', css.includes('flex'))

// Named container
const namedCSS = getContainerCSS('article')
test('named container uses the provided name', namedCSS.includes('article'))
test('default container name is "card"', css.includes('card'))

// Different names produce different CSS
const css2 = getContainerCSS('sidebar')
test('different container names produce different CSS', css !== css2)

// ContainerQueryCard is a function
test('ContainerQueryCard is a function', typeof ContainerQueryCard === 'function')
