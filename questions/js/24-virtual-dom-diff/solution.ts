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
  // TODO: implement solution
}
