import { getTruncationStyles, TruncatedText } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// Single-line truncation
const singleLine = getTruncationStyles(1)
test('single-line: overflow is hidden', singleLine.overflow === 'hidden')
test('single-line: whiteSpace is nowrap', singleLine.whiteSpace === 'nowrap')
test('single-line: textOverflow is ellipsis', singleLine.textOverflow === 'ellipsis')
test('single-line: no WebkitLineClamp', !('WebkitLineClamp' in singleLine))

// Multi-line truncation
const multiLine = getTruncationStyles(3)
test('multi-line: overflow is hidden', multiLine.overflow === 'hidden')
test('multi-line: WebkitLineClamp is 3', (multiLine as Record<string, unknown>).WebkitLineClamp === 3)
test('multi-line: display is -webkit-box', (multiLine as Record<string, unknown>).display === '-webkit-box')
test('multi-line: WebkitBoxOrient is vertical', (multiLine as Record<string, unknown>).WebkitBoxOrient === 'vertical')
test('multi-line: no whiteSpace:nowrap', multiLine.whiteSpace !== 'nowrap')

// Edge: lines=0 treated as 1
const zeroLines = getTruncationStyles(0)
test('lines=0 treated as 1 (uses single-line approach)', zeroLines.whiteSpace === 'nowrap')

// Lines=2 uses multi-line
const twoLines = getTruncationStyles(2)
test('lines=2 uses WebkitLineClamp=2', (twoLines as Record<string, unknown>).WebkitLineClamp === 2)

// TruncatedText is a function
test('TruncatedText is a function', typeof TruncatedText === 'function')
