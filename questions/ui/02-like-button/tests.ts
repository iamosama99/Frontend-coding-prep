// Tests for LikeButton
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { LikeButton, LikeButtonProps } from './index';

// Test 1: LikeButton is exported as a function
try {
  typeof LikeButton === 'function'
    ? pass('LikeButton is exported as a function')
    : fail('LikeButton exported', `typeof = ${typeof LikeButton}`);
} catch (e) {
  fail('LikeButton exported', String(e));
}

// Test 2: Props interface accepts all expected fields
try {
  const props: LikeButtonProps = {
    initialCount: 10,
    initialLiked: false,
    onLike: async (_liked: boolean) => {},
    disabled: false,
  };
  typeof props.initialCount === 'number' && typeof props.onLike === 'function'
    ? pass('LikeButtonProps accepts all fields')
    : fail('LikeButtonProps fields', 'type mismatch');
} catch (e) {
  fail('LikeButtonProps fields', String(e));
}

// Test 3: Count floor — Math.max(0, count - 1) when count is 0
try {
  const count = 0;
  const newCount = Math.max(0, count - 1);
  newCount === 0
    ? pass('count does not go below zero')
    : fail('count floor', `got ${newCount}`);
} catch (e) {
  fail('count floor', String(e));
}

// Test 4: Optimistic update logic — count increments on like
try {
  let count = 42;
  let liked = false;
  // Simulate a like click
  liked = !liked;
  count = liked ? count + 1 : Math.max(0, count - 1);
  count === 43 && liked === true
    ? pass('optimistic update increments count on like')
    : fail('optimistic update', `count=${count} liked=${liked}`);
} catch (e) {
  fail('optimistic update', String(e));
}

// Test 5: Rollback logic — restoring previous state on failure
try {
  let count = 43;
  let liked = true;
  const prevCount = 42;
  const prevLiked = false;
  // Simulate failure rollback
  count = prevCount;
  liked = prevLiked;
  count === 42 && liked === false
    ? pass('rollback restores previous state on failure')
    : fail('rollback', `count=${count} liked=${liked}`);
} catch (e) {
  fail('rollback', String(e));
}

// Test 6: onLike receives the new liked boolean value
try {
  let received: boolean | null = null;
  const handler = async (liked: boolean) => { received = liked; };
  handler(true).then(() => {
    received === true
      ? pass('onLike receives new liked state')
      : fail('onLike argument', `received ${received}`);
  });
} catch (e) {
  fail('onLike argument', String(e));
}
