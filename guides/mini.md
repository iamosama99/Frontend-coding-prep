# Mini Apps (Machine Round) — Guide

## How Machine Rounds Differ from Live Coding

In a live coding interview, the interviewer watches your thinking in real time and will guide you when you're stuck. In a machine round you're alone — there's no feedback loop. The submitted code is evaluated against a checklist, not a conversation.

This changes your strategy:
- **Correctness over cleverness.** A working feature with simple code beats a clever but partially broken one every time.
- **Edge cases are the checklist.** The reviewer literally has a list. If the spec says "localStorage persist", that is not a nice-to-have.
- **Time management is explicit.** 90 minutes sounds generous until you're 60 minutes in and still on the happy path.

---

## How to Structure a Mini App Build

Use this order. Do not skip ahead.

### 1. State first (5–10 min)
Before writing any JSX, define your state shape. Write it as a comment or TypeScript interface. Ask: what data does this app need to remember? What changes over time?

```ts
// Todo list — state design
interface TodoItem { id: string; text: string; done: boolean; }
type Filter = 'all' | 'active' | 'done';
// state: { items: TodoItem[], filter: Filter }
// derived: filteredItems = items filtered by filter
```

### 2. Core feature (25–35 min)
Implement the primary happy path. Render the data. Wire up the primary action (add, submit, toggle). Make it work before making it complete.

### 3. Edge cases + secondary features (20–30 min)
- Empty state (no items, no results)
- Input validation (blank input shouldn't add)
- Persistence (localStorage)
- Error states (API failure)
- Filter / sort logic

### 4. Polish (last 10 min)
Basic accessible markup (`<label>`, `aria-label`, keyboard operability). Clean up unused variables. Verify the spec one more time.

---

## Common Patterns Across All Mini Apps

**Controlled inputs — always:**
```tsx
const [text, setText] = useState('');
<input value={text} onChange={e => setText(e.target.value)} />
```

**localStorage persist — standard pattern:**
```tsx
const [items, setItems] = useState<Item[]>(() => {
  try { return JSON.parse(localStorage.getItem('items') ?? '[]'); }
  catch { return []; }
});
useEffect(() => {
  localStorage.setItem('items', JSON.stringify(items));
}, [items]);
```

**Unique IDs — use crypto.randomUUID() or Date.now().toString():**
```ts
const newItem = { id: crypto.randomUUID(), text, done: false };
```

**Loading + error states for any fetch:**
```ts
const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
```

**setInterval cleanup — always return the cleanup:**
```ts
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, [dependencies]);
```

---

## What Reviewers Check in Submitted Code

Reviewers typically go through this checklist:

| Check | What they look for |
|-------|-------------------|
| Correctness | Does the primary feature work end-to-end? |
| Edge cases | Empty state, zero/negative inputs, duplicate entries |
| Persistence | Does localStorage actually save and restore? |
| Async handling | Loading + error states shown to the user |
| Component structure | State lifted to the right level, no prop drilling 3+ levels |
| TypeScript | Typed props, no `any`, return types on key functions |
| Code quality | Consistent naming, no magic numbers, no dead code |
| Keyboard/a11y | Can the primary action be done without a mouse? |

---

## Time Management — What to Cut vs What to Keep

**Never cut:**
- Core feature (the app must do its primary thing)
- Edge cases listed explicitly in the spec
- localStorage persistence (mentioned in almost every spec)
- Basic accessible markup for interactive elements

**Can cut if short on time:**
- Animations and transitions
- Advanced keyboard navigation (beyond Tab + Enter)
- Stretch goals (they're labelled stretch for a reason)
- Multiple themes or style variants

**The 80-minute check-in question:** "If I submitted right now, would this pass?" If yes — tighten the code. If no — identify the single most critical missing piece and finish that.

---

## Interview Framing (for Machine + Live)

Before starting, re-read the spec and write your state shape. For a live machine round with an observer:
> "I'm going to define my state shape first, then implement the primary action, then layer in the edge cases. I'll come back to localStorage after the core is working."

If you finish early, don't add features. Read the spec once more and verify every bullet point. Reviewers often mark down for missing a single explicit requirement while delivering unrequested extras.
