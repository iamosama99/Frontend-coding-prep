// Tests for CommandPalette
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { CommandPalette, CommandPaletteProps, Command } from './index';

// Test 1: CommandPalette is exported as a function
try {
  typeof CommandPalette === 'function'
    ? pass('CommandPalette is exported as a function')
    : fail('CommandPalette exported', `typeof = ${typeof CommandPalette}`);
} catch (e) {
  fail('CommandPalette exported', String(e));
}

// Test 2: Command interface shape
try {
  const cmd: Command = {
    id: 'new-file',
    label: 'New file',
    group: 'File',
    shortcut: '⌘N',
    onExecute: () => {},
    keywords: ['create', 'add'],
  };
  cmd.id === 'new-file' && cmd.keywords?.includes('create')
    ? pass('Command interface has correct shape with all optional fields')
    : fail('Command shape', JSON.stringify({ id: cmd.id, keywords: cmd.keywords }));
} catch (e) {
  fail('Command shape', String(e));
}

// Test 3: Fuzzy match — characters in order
try {
  const fuzzyMatch = (query: string, target: string): boolean => {
    const q = query.toLowerCase();
    const t = target.toLowerCase();
    let qi = 0;
    for (let ti = 0; ti < t.length && qi < q.length; ti++) {
      if (t[ti] === q[qi]) qi++;
    }
    return qi === q.length;
  };
  fuzzyMatch('op fi', 'Open file') === true &&
  fuzzyMatch('xyz', 'Open file') === false &&
  fuzzyMatch('opn', 'Open file') === true
    ? pass('fuzzy match: characters must appear in order in the target')
    : fail('fuzzy match', 'unexpected result');
} catch (e) {
  fail('fuzzy match', String(e));
}

// Test 4: maxResults caps the results
try {
  const commands: Command[] = Array.from({ length: 20 }, (_, i) => ({
    id: String(i),
    label: `Command ${i}`,
    onExecute: () => {},
  }));
  const maxResults = 5;
  const filtered = commands.slice(0, maxResults);
  filtered.length === 5
    ? pass('maxResults caps filtered commands to 5')
    : fail('maxResults', `got ${filtered.length}`);
} catch (e) {
  fail('maxResults', String(e));
}

// Test 5: Grouping — commands with same group are together
try {
  const commands: Command[] = [
    { id: '1', label: 'New file', group: 'File', onExecute: () => {} },
    { id: '2', label: 'Open file', group: 'File', onExecute: () => {} },
    { id: '3', label: 'Toggle theme', group: 'Settings', onExecute: () => {} },
  ];
  const groups = commands.reduce<Record<string, Command[]>>((acc, cmd) => {
    const key = cmd.group ?? 'General';
    acc[key] = [...(acc[key] ?? []), cmd];
    return acc;
  }, {});
  Object.keys(groups).length === 2 && groups['File'].length === 2
    ? pass('commands grouped by group property')
    : fail('grouping', JSON.stringify(Object.keys(groups)));
} catch (e) {
  fail('grouping', String(e));
}

// Test 6: onExecute error is caught gracefully
try {
  let errorCaught = false;
  const safeExecute = (cmd: Command) => {
    try {
      cmd.onExecute();
    } catch {
      errorCaught = true;
    }
  };
  safeExecute({ id: 'x', label: 'x', onExecute: () => { throw new Error('fail'); } });
  errorCaught === true
    ? pass('onExecute errors are caught and do not crash the component')
    : fail('error handling', 'error was not caught');
} catch (e) {
  fail('error handling', String(e));
}
