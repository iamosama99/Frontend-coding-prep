# Real-Time Chat / Activity Feed

## Problem

Implement a `ChatClient` class that manages a WebSocket connection for a chat room: sending messages, receiving live updates, loading paginated history, and tracking read receipts.

## TypeScript Signature

```ts
interface Message {
  id: string;
  roomId: string;
  authorId: string;
  content: string;
  sentAt: number;       // Unix ms timestamp
  readBy: string[];     // array of user IDs who have read this message
}

interface HistoryPage {
  messages: Message[];
  nextCursor?: string;  // undefined when no more pages
}

interface ChatClientOptions {
  wsUrl: string;        // WebSocket endpoint
  token: string;        // auth bearer token, sent in first frame
  onMessage?: (msg: Message) => void;
  onConnect?: () => void;
  onDisconnect?: (code: number, reason: string) => void;
}

class ChatClient {
  constructor(options: ChatClientOptions)

  // Establish WebSocket connection. Sends { type: 'auth', token } as first frame.
  connect(): void

  // Gracefully close the connection (code 1000).
  disconnect(): void

  // Send a new message to a room. Resolves with the server-echoed Message.
  // Rejects if the socket is not OPEN.
  sendMessage(roomId: string, content: string): Promise<Message>

  // Register a listener for incoming messages. Returns an unsubscribe function.
  onMessage(handler: (msg: Message) => void): () => void

  // Fetch paginated history (newest-first). Pass `cursor` for subsequent pages.
  loadHistory(roomId: string, cursor?: string): Promise<HistoryPage>

  // Mark all messages in a room up to `upToId` as read.
  markRead(roomId: string, upToId: string): void

  // Returns true if the WebSocket is currently OPEN.
  get isConnected(): boolean
}
```

## Usage Example

```ts
const client = new ChatClient({
  wsUrl: 'wss://chat.example.com/ws',
  token: 'user-jwt',
  onMessage: (msg) => console.log(msg.content),
});

client.connect();

// Send a message
const msg = await client.sendMessage('room-1', 'Hello!');

// Load older messages
const page1 = await client.loadHistory('room-1');
const page2 = await client.loadHistory('room-1', page1.nextCursor);

// Mark as read
client.markRead('room-1', page1.messages[0].id);

// Clean up
client.disconnect();
```

## Constraints

- Use the browser `WebSocket` API (or a mock in tests)
- `sendMessage` must reject immediately if the socket is not in the OPEN state
- `loadHistory` uses `fetch` to hit `/api/rooms/:roomId/messages?cursor=<cursor>`
- Messages received over the WebSocket before `connect()` resolves must be buffered and replayed to `onMessage` handlers after connection
- `onMessage` can be called multiple times — all handlers fire for each incoming message
- `markRead` sends `{ type: 'read', roomId, upToId }` over the WebSocket (fire-and-forget)

## Edge Cases

- `sendMessage` called before `connect()` — reject with `'Not connected'`
- WebSocket closes unexpectedly — call `onDisconnect` handler
- `loadHistory` called with an expired cursor — server returns 400, should reject with the error message
- Two handlers added via `onMessage`, then one removed — only the remaining handler fires
- `disconnect()` called while `sendMessage` promise is pending — the pending promise should reject
- `connect()` called twice without `disconnect()` in between — should be a no-op (don't open two sockets)
