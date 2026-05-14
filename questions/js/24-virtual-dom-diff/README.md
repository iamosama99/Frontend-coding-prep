# Virtual DOM Diff (Basic)

## Problem

Implement a `diff` function that compares two virtual DOM trees and returns a patch descriptor describing what changed. This is the core of how React and Vue determine minimal DOM updates.

## API

```ts
type VNode = {
  type: string;
  props?: Record<string, any>;
  children?: (VNode | string)[];
  key?: string | number;
}

type Patch =
  | { kind: 'REPLACE'; node: VNode | string }
  | { kind: 'TEXT';    text: string }
  | { kind: 'PROPS';  props: Record<string, any> }
  | { kind: 'CHILDREN'; patches: (Patch | null)[] }
  | { kind: 'NONE' }

function diff(oldNode: VNode | string, newNode: VNode | string): Patch
```

## Example

```ts
diff({ type: 'div', props: { id: 'a' } }, { type: 'div', props: { id: 'b' } });
// → { kind: 'PROPS', props: { id: 'b' } }

diff({ type: 'div' }, { type: 'span' });
// → { kind: 'REPLACE', node: { type: 'span' } }

diff('hello', 'world');
// → { kind: 'TEXT', text: 'world' }

diff({ type: 'div' }, { type: 'div' });
// → { kind: 'NONE' }
```

## Constraints

- Nodes with different `type` → `REPLACE`
- Same type, different `props` → `PROPS` with only the changed/added props
- Text node changed → `TEXT`
- Children changed → `CHILDREN` with per-child patches
- No changes → `NONE`
- Do not implement key-based reconciliation (that's a bonus)

## Edge Cases

- Old is text, new is VNode → `REPLACE`
- Old is VNode, new is text → `REPLACE`
- Same text → `NONE`
- New has more children than old → extra children are `REPLACE` patches
- New has fewer children → extra old children become `null` patches (to be removed)
