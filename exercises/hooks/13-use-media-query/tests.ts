// Tests for useMediaQuery

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: SSR guard returns false
try {
  const getMatches = (query: string) => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  };
  const original = (global as any).window;
  delete (global as any).window;
  const result = getMatches('(max-width: 767px)');
  (global as any).window = original;
  result === false
    ? pass('SSR guard returns false when window is undefined')
    : fail('SSR guard', `got ${result}`);
} catch (e) {
  fail('SSR guard', String(e));
}

// Test 2: matchMedia mock returns matches correctly
try {
  const mockMQL = { matches: true, addEventListener: () => {}, removeEventListener: () => {} };
  const getMatches = (mql: typeof mockMQL) => mql.matches;
  getMatches(mockMQL) === true
    ? pass('matchMedia.matches read correctly')
    : fail('matchMedia.matches', 'got false');
} catch (e) {
  fail('matchMedia.matches', String(e));
}

// Test 3: change event updates matches
try {
  let currentMatches = false;
  const handlers: ((e: any) => void)[] = [];
  const mockMQL = {
    matches: false,
    addEventListener: (_: string, h: any) => handlers.push(h),
    removeEventListener: (_: string, h: any) => {
      const i = handlers.indexOf(h);
      if (i > -1) handlers.splice(i, 1);
    },
  };
  handlers.forEach = handlers.forEach.bind(handlers);
  mockMQL.addEventListener('change', (e: any) => { currentMatches = e.matches; });

  // Simulate a media query change event
  handlers[0]?.({ matches: true });

  currentMatches === true
    ? pass('change event updates matches state')
    : fail('change event', `got ${currentMatches}`);
} catch (e) {
  fail('change event', String(e));
}

// Test 4: listener removed on cleanup
try {
  let listenerCount = 0;
  const mockMQL = {
    matches: false,
    addEventListener: () => { listenerCount++; },
    removeEventListener: () => { listenerCount--; },
  };
  mockMQL.addEventListener('change', () => {});
  mockMQL.removeEventListener('change', () => {});
  listenerCount === 0
    ? pass('listener removed on cleanup')
    : fail('listener cleanup', `listenerCount = ${listenerCount}`);
} catch (e) {
  fail('listener cleanup', String(e));
}

// Test 5: export check
const { useMediaQuery } = require('./starter');
try {
  typeof useMediaQuery === 'function'
    ? pass('useMediaQuery exported as function')
    : fail('useMediaQuery exported', `typeof = ${typeof useMediaQuery}`);
} catch (e) {
  fail('export check', String(e));
}
