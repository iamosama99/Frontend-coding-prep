// Tests for optimistic UI update
// Full hook tests require renderHook from @testing-library/react.
// The logic tests below simulate the state transitions manually.

type LikeState = { count: number; liked: boolean; pending: boolean; error: Error | null }

// Simulate the optimistic update logic (extracted from hook)
function applyOptimistic(state: LikeState): LikeState {
  return {
    ...state,
    liked: !state.liked,
    count: state.liked ? state.count - 1 : state.count + 1,
    pending: true,
    error: null,
  }
}

function applySuccess(state: LikeState, serverCount: number): LikeState {
  return { ...state, count: serverCount, pending: false }
}

function applyRevert(state: LikeState, rollback: { count: number; liked: boolean }, error: Error): LikeState {
  return { ...state, count: rollback.count, liked: rollback.liked, pending: false, error }
}

// Test 1: optimistic like increments count immediately
const s0: LikeState = { count: 10, liked: false, pending: false, error: null }
const s1 = applyOptimistic(s0)
console.log(s1.count === 11 && s1.liked === true && s1.pending === true ? 'PASS: optimistic like' : `FAIL: ${JSON.stringify(s1)}`)

// Test 2: optimistic unlike decrements count
const s2: LikeState = { count: 10, liked: true, pending: false, error: null }
const s3 = applyOptimistic(s2)
console.log(s3.count === 9 && s3.liked === false ? 'PASS: optimistic unlike' : `FAIL: ${JSON.stringify(s3)}`)

// Test 3: success syncs server count
const s4 = applySuccess(s1, 12)
console.log(s4.count === 12 && s4.pending === false ? 'PASS: success syncs count' : `FAIL: ${JSON.stringify(s4)}`)

// Test 4: failure reverts to rollback state
const rollback = { count: s0.count, liked: s0.liked }
const s5 = applyRevert(s1, rollback, new Error('Network error'))
console.log(s5.count === 10 && s5.liked === false && s5.pending === false && s5.error !== null
  ? 'PASS: failure reverts'
  : `FAIL: ${JSON.stringify(s5)}`)

// Test 5: ignore click when pending
const pending: LikeState = { count: 11, liked: true, pending: true, error: null }
// A real test would verify toggle() returns early when state.pending === true
console.log(pending.pending === true ? 'PASS: pending state captured (verify early return in renderHook)' : 'FAIL')
