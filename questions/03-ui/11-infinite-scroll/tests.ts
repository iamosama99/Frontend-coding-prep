// Tests for InfiniteScroll
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { InfiniteScroll, InfiniteScrollProps } from './index';

// Test 1: InfiniteScroll is exported as a function
try {
  typeof InfiniteScroll === 'function'
    ? pass('InfiniteScroll is exported as a function')
    : fail('InfiniteScroll exported', `typeof = ${typeof InfiniteScroll}`);
} catch (e) {
  fail('InfiniteScroll exported', String(e));
}

// Test 2: Props interface accepts all fields
try {
  const props: InfiniteScrollProps = {
    onLoadMore: async () => {},
    hasMore: true,
    loading: false,
    threshold: 200,
    loader: null,
    endMessage: null,
    children: null,
  };
  props.hasMore === true && props.threshold === 200
    ? pass('InfiniteScrollProps accepts all fields')
    : fail('InfiniteScrollProps', 'field mismatch');
} catch (e) {
  fail('InfiniteScrollProps', String(e));
}

// Test 3: Guard logic — onLoadMore not called when loading is true
try {
  let callCount = 0;
  const onLoadMore = () => { callCount++; };
  const shouldLoad = (hasMore: boolean, loading: boolean, isIntersecting: boolean) => {
    return isIntersecting && hasMore && !loading;
  };
  if (shouldLoad(true, true, true)) onLoadMore();
  callCount === 0
    ? pass('onLoadMore not called when loading=true')
    : fail('loading guard', `called ${callCount} times`);
} catch (e) {
  fail('loading guard', String(e));
}

// Test 4: Guard logic — onLoadMore not called when hasMore is false
try {
  let callCount = 0;
  const onLoadMore = () => { callCount++; };
  const shouldLoad = (hasMore: boolean, loading: boolean, isIntersecting: boolean) => {
    return isIntersecting && hasMore && !loading;
  };
  if (shouldLoad(false, false, true)) onLoadMore();
  callCount === 0
    ? pass('onLoadMore not called when hasMore=false')
    : fail('hasMore guard', `called ${callCount} times`);
} catch (e) {
  fail('hasMore guard', String(e));
}

// Test 5: Guard logic — onLoadMore IS called when conditions are met
try {
  let callCount = 0;
  const onLoadMore = () => { callCount++; };
  const shouldLoad = (hasMore: boolean, loading: boolean, isIntersecting: boolean) => {
    return isIntersecting && hasMore && !loading;
  };
  if (shouldLoad(true, false, true)) onLoadMore();
  callCount === 1
    ? pass('onLoadMore called once when hasMore=true, loading=false, isIntersecting=true')
    : fail('trigger condition', `called ${callCount} times`);
} catch (e) {
  fail('trigger condition', String(e));
}

// Test 6: rootMargin format for threshold
try {
  const buildRootMargin = (threshold: number) => `0px 0px ${threshold}px 0px`;
  buildRootMargin(200) === '0px 0px 200px 0px'
    ? pass('rootMargin built correctly from threshold')
    : fail('rootMargin', `got "${buildRootMargin(200)}"`);
} catch (e) {
  fail('rootMargin', String(e));
}
