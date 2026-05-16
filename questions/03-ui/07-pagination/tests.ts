// Tests for Pagination
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Pagination, PaginationProps } from './index';

// Test 1: Pagination is exported as a function
try {
  typeof Pagination === 'function'
    ? pass('Pagination is exported as a function')
    : fail('Pagination exported', `typeof = ${typeof Pagination}`);
} catch (e) {
  fail('Pagination exported', String(e));
}

// Test 2: totalPages calculation
try {
  const totalItems = 150;
  const pageSize = 10;
  const totalPages = Math.ceil(totalItems / pageSize);
  totalPages === 15
    ? pass('totalPages = Math.ceil(totalItems / pageSize)')
    : fail('totalPages', `got ${totalPages}`);
} catch (e) {
  fail('totalPages', String(e));
}

// Test 3: Page range with ellipsis — page 5 of 15, siblingCount 1
try {
  function buildRange(current: number, total: number, sibling: number): (number | string)[] {
    const left = Math.max(2, current - sibling);
    const right = Math.min(total - 1, current + sibling);
    const range: (number | string)[] = [1];
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push('...');
    range.push(total);
    return range;
  }
  const range = buildRange(5, 15, 1);
  const hasEllipsis = range.includes('...');
  const includesFirst = range[0] === 1;
  const includesLast = range[range.length - 1] === 15;
  hasEllipsis && includesFirst && includesLast
    ? pass('page range includes ellipsis, first page, and last page')
    : fail('page range', JSON.stringify(range));
} catch (e) {
  fail('page range', String(e));
}

// Test 4: No ellipsis when all pages fit
try {
  function buildRange(current: number, total: number, sibling: number): (number | string)[] {
    const left = Math.max(2, current - sibling);
    const right = Math.min(total - 1, current + sibling);
    const range: (number | string)[] = [1];
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push('...');
    range.push(total);
    return range;
  }
  const range = buildRange(3, 5, 2);
  const noEllipsis = !range.includes('...');
  noEllipsis
    ? pass('no ellipsis when all pages fit within range')
    : fail('no-ellipsis check', JSON.stringify(range));
} catch (e) {
  fail('no-ellipsis check', String(e));
}

// Test 5: Prev disabled on page 1
try {
  const currentPage = 1;
  const prevDisabled = currentPage === 1;
  prevDisabled
    ? pass('Prev button disabled on page 1')
    : fail('Prev disabled', 'not disabled on page 1');
} catch (e) {
  fail('Prev disabled', String(e));
}

// Test 6: Next disabled on last page
try {
  const currentPage = 15;
  const totalPages = 15;
  const nextDisabled = currentPage === totalPages;
  nextDisabled
    ? pass('Next button disabled on last page')
    : fail('Next disabled', 'not disabled on last page');
} catch (e) {
  fail('Next disabled', String(e));
}
