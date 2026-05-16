import { getGridStyles, ResponsiveGrid } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// Happy path
const styles = getGridStyles({ minColumnWidth: 250, gap: 16 })
test('display is grid', styles.display === 'grid')
test('gridTemplateColumns contains auto-fit', String(styles.gridTemplateColumns).includes('auto-fit'))
test('gridTemplateColumns contains minmax', String(styles.gridTemplateColumns).includes('minmax'))
test('gridTemplateColumns contains 250px', String(styles.gridTemplateColumns).includes('250px'))
test('gridTemplateColumns ends with 1fr', String(styles.gridTemplateColumns).includes('1fr'))

// Number gap becomes string
const numGapStyles = getGridStyles({ minColumnWidth: 300, gap: 24 })
test('numeric gap is applied', String(numGapStyles.gap).includes('24'))

// String gap passes through
const strGapStyles = getGridStyles({ minColumnWidth: 300, gap: '1rem' })
test('string gap passes through', strGapStyles.gap === '1rem')

// Edge: zero gap
const zeroGapStyles = getGridStyles({ minColumnWidth: 200, gap: 0 })
test('zero gap is still applied', zeroGapStyles.gap !== undefined)

// Uses auto-fit not auto-fill
test('uses auto-fit not auto-fill', !String(styles.gridTemplateColumns).includes('auto-fill'))

test('ResponsiveGrid is a function', typeof ResponsiveGrid === 'function')
