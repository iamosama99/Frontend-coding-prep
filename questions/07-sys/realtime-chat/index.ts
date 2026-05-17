export interface Message {
  id: string;
  roomId: string;
  authorId: string;
  content: string;
  sentAt: number;
  readBy: string[];
}

export interface HistoryPage {
  messages: Message[];
  nextCursor?: string;
}

export interface ChatClientOptions {
  wsUrl: string;
  token: string;
  onMessage?: (msg: Message) => void;
  onConnect?: () => void;
  onDisconnect?: (code: number, reason: string) => void;
}

// TODO 1: Store state for the WebSocket instance, message handlers, and a
//   pending-message map (correlating outgoing sends to their resolve/reject).
//   Use a Map<string, { resolve, reject }> keyed by a client-generated request ID.

// TODO 2: implement connect().
//   - If a socket is already OPEN, return immediately (no-op).
//   - Create a new WebSocket(wsUrl).
//   - On `open`: send { type: 'auth', token } as JSON, call onConnect?.
//   - On `message`: parse JSON. If it's a chat message, call all registered handlers.
//     If it has a `requestId`, resolve/reject the matching pending-message entry.
//   - On `close`: call onDisconnect?.(event.code, event.reason).
//     Reject all pending promises with 'Connection closed'.

// TODO 3: implement disconnect().
//   Close the socket with code 1000. Reject all pending promises.

// TODO 4: implement sendMessage(roomId, content): Promise<Message>.
//   Generate a unique requestId (e.g. crypto.randomUUID() or Date.now() + Math.random()).
//   Send { type: 'message', requestId, roomId, content } as JSON.
//   Return a Promise that resolves when the server echoes back { requestId, message }.

// TODO 5: implement onMessage(handler) — returns an unsubscribe function.
//   Store handler in a Set<Handler>. The returned function deletes it from the Set.

// TODO 6: implement loadHistory(roomId, cursor?): Promise<HistoryPage>.
//   fetch(`/api/rooms/${roomId}/messages${cursor ? `?cursor=${cursor}` : ''}`)
//   Reject with the response error text if status >= 400.

// TODO 7: implement markRead(roomId, upToId).
//   Fire-and-forget: send { type: 'read', roomId, upToId } if socket is OPEN.

export class ChatClient {
  constructor(_options: ChatClientOptions) {
    throw new Error('Not implemented');
  }

  connect(): void {
    throw new Error('Not implemented');
  }

  disconnect(): void {
    throw new Error('Not implemented');
  }

  sendMessage(_roomId: string, _content: string): Promise<Message> {
    throw new Error('Not implemented');
  }

  onMessage(_handler: (msg: Message) => void): () => void {
    throw new Error('Not implemented');
  }

  loadHistory(_roomId: string, _cursor?: string): Promise<HistoryPage> {
    throw new Error('Not implemented');
  }

  markRead(_roomId: string, _upToId: string): void {
    throw new Error('Not implemented');
  }

  get isConnected(): boolean {
    throw new Error('Not implemented');
  }
}
