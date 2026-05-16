import { calculateSpecificity, compareSpecificity, resolveWinner } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// Happy path — individual selector types
const idSpec = calculateSpecificity('#header')
test('ID selector: [1,0,0]', idSpec[0] === 1 && idSpec[1] === 0 && idSpec[2] === 0)

const classSpec = calculateSpecificity('.btn')
test('Class selector: [0,1,0]', classSpec[0] === 0 && classSpec[1] === 1 && classSpec[2] === 0)

const elemSpec = calculateSpecificity('div')
test('Element selector: [0,0,1]', elemSpec[0] === 0 && elemSpec[1] === 0 && elemSpec[2] === 1)

// Happy path — combined selectors
const combined = calculateSpecificity('#nav .item a:hover')
test('Combined selector [1,2,1]', combined[0] === 1 && combined[1] === 2 && combined[2] === 1)

// Universal selector — all zeros
const universal = calculateSpecificity('*')
test('Universal selector: [0,0,0]', universal[0] === 0 && universal[1] === 0 && universal[2] === 0)

// Pseudo-element (third bucket)
const pseudoElem = calculateSpecificity('::before')
test('Pseudo-element goes in third bucket', pseudoElem[2] === 1 && pseudoElem[1] === 0)

// Multiple classes
const multiClass = calculateSpecificity('.a.b.c')
test('Three chained classes: [0,3,0]', multiClass[1] === 3)

// compareSpecificity
test('ID beats 5 classes', compareSpecificity([1, 0, 0], [0, 5, 0]) === 1)
test('Tied specificity returns 0', compareSpecificity([0, 1, 0], [0, 1, 0]) === 0)
test('Higher class count wins', compareSpecificity([0, 2, 0], [0, 1, 0]) === 1)

// resolveWinner
test('resolveWinner returns winning selector', resolveWinner('#foo', '.bar') === '#foo')
test('resolveWinner returns tie for equal specificity', resolveWinner('.a', '.b') === 'tie')
