// Tests for ChatClient
// Run: npx ts-node questions/07-sys/realtime-chat/tests.ts

import { ChatClient } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: ChatClient is a class (constructor exists)
assert(typeof ChatClient === 'function', 'ChatClient is exported as a class');

// Test 2: instance can be created without throwing
let client: ChatClient;
try {
  client = new ChatClient({ wsUrl: 'ws://localhost', token: 'test' });
  assert(true, 'ChatClient instantiates without error');
} catch {
  assert(false, 'ChatClient instantiates without error');
  process.exit(1);
}

// Test 3: isConnected returns false before connect()
try {
  assert(client!.isConnected === false, 'isConnected is false before connect()');
} catch {
  assert(false, 'isConnected is accessible before connect()');
}

// Test 4: sendMessage rejects when not connected
client!.sendMessage('room-1', 'hello')
  .then(() => {
    assert(false, 'sendMessage rejects when not connected');
  })
  .catch((err: Error) => {
    assert(err instanceof Error, 'sendMessage rejects with an Error when not connected');
  });

// Test 5: onMessage returns an unsubscribe function
const unsub = client!.onMessage(() => {});
assert(typeof unsub === 'function', 'onMessage returns a function');

// Test 6: unsubscribe function does not throw
try {
  unsub();
  assert(true, 'unsubscribe function executes without error');
} catch {
  assert(false, 'unsubscribe function executes without error');
}

// Test 7: disconnect() does not throw when not connected
try {
  client!.disconnect();
  assert(true, 'disconnect() does not throw when not connected');
} catch {
  assert(false, 'disconnect() does not throw when not connected');
}

// Test 8: markRead() does not throw when not connected (fire-and-forget)
try {
  client!.markRead('room-1', 'msg-1');
  assert(true, 'markRead() does not throw when not connected');
} catch {
  assert(false, 'markRead() does not throw when not connected');
}
