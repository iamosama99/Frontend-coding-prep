export type VNode = {
  type: string;
  props?: Record<string, any>;
  children?: (VNode | string)[];
  key?: string | number;
};

export type Patch =
  | { kind: 'REPLACE'; node: VNode | string }
  | { kind: 'TEXT';    text: string }
  | { kind: 'PROPS';  props: Record<string, any> }
  | { kind: 'CHILDREN'; patches: (Patch | null)[] }
  | { kind: 'NONE' };

export function diff(oldNode: VNode | string, newNode: VNode | string): Patch {
  // TODO 1: If both are strings: return TEXT patch if different, NONE if same
  // TODO 2: If types differ (string vs VNode, or different VNode types): return REPLACE
  // TODO 3: Same VNode type — compare props:
  //         Collect changed/added props into a changedProps object
  //         If changedProps is non-empty, return PROPS patch
  // TODO 4: Compare children recursively:
  //         Zip old and new children arrays (use the longer length)
  //         For each pair, call diff(oldChild, newChild) — or REPLACE if one is missing
  //         If any child has a non-NONE patch, return CHILDREN patch
  // TODO 5: If nothing changed, return NONE
  throw new Error('Not implemented');
}
