import { getColumnsMasonryStyles, getGridMasonryStyles, getMasonryItemStyles, MasonryGrid } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getColumnsMasonryStyles — pure function tests
const colStyles = getColumnsMasonryStyles(3, 16)
test('columns style has columns count', (colStyles as Record<string, unknown>).columns === 3)
test('columns style has columnGap', colStyles.columnGap !== undefined)
test('column gap includes 16', String(colStyles.columnGap).includes('16'))

// Different column counts
const col2 = getColumnsMasonryStyles(2, 8)
test('2 columns sets columns to 2', (col2 as Record<string, unknown>).columns === 2)

// getGridMasonryStyles — pure function tests
const gridStyles = getGridMasonryStyles(3, 16)
test('grid masonry: display is grid', gridStyles.display === 'grid')
test('grid masonry: gridTemplateColumns has 3 columns', String(gridStyles.gridTemplateColumns).includes('repeat(3'))
test('grid masonry: gridTemplateRows is masonry', (gridStyles as Record<string, unknown>).gridTemplateRows === 'masonry')
test('grid masonry: gap is set', gridStyles.gap !== undefined)

// getMasonryItemStyles — pure function tests
const itemStyles = getMasonryItemStyles(16)
test('masonry item has breakInside avoid', itemStyles.breakInside === 'avoid')
test('masonry item has marginBottom', itemStyles.marginBottom !== undefined)

// MasonryGrid is a function
test('MasonryGrid is a function', typeof MasonryGrid === 'function')
