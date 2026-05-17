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

type Handler = (msg: Message) => void;
type Pending = { resolve: (msg: Message) => void; reject: (err: Error) => void };

export class ChatClient {
  private ws: WebSocket | null = null;
  private handlers = new Set<Handler>();
  private pending = new Map<string, Pending>();
  private options: ChatClientOptions;

  constructor(options: ChatClientOptions) {
    this.options = options;
    if (options.onMessage) this.handlers.add(options.onMessage);
  }

  connect(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.options.wsUrl);

    this.ws.addEventListener('open', () => {
      this.ws!.send(JSON.stringify({ type: 'auth', token: this.options.token }));
      this.options.onConnect?.();
    });

    this.ws.addEventListener('message', (event) => {
      let data: any;
      try { data = JSON.parse(event.data); } catch { return; }

      if (data.type === 'message' && data.message) {
        this.handlers.forEach((h) => h(data.message));
      }

      if (data.requestId && this.pending.has(data.requestId)) {
        const p = this.pending.get(data.requestId)!;
        this.pending.delete(data.requestId);
        if (data.error) {
          p.reject(new Error(data.error));
        } else {
          p.resolve(data.message);
        }
      }
    });

    this.ws.addEventListener('close', (event) => {
      this.rejectAllPending('Connection closed');
      this.options.onDisconnect?.(event.code, event.reason);
    });
  }

  disconnect(): void {
    this.rejectAllPending('Connection closed');
    this.ws?.close(1000);
    this.ws = null;
  }

  sendMessage(roomId: string, content: string): Promise<Message> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('Not connected'));
    }
    const requestId = `${Date.now()}-${Math.random()}`;
    return new Promise<Message>((resolve, reject) => {
      this.pending.set(requestId, { resolve, reject });
      this.ws!.send(JSON.stringify({ type: 'message', requestId, roomId, content }));
    });
  }

  onMessage(handler: Handler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  async loadHistory(roomId: string, cursor?: string): Promise<HistoryPage> {
    const url = `/api/rooms/${roomId}/messages${cursor ? `?cursor=${cursor}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }
    return res.json();
  }

  markRead(roomId: string, upToId: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'read', roomId, upToId }));
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  private rejectAllPending(reason: string): void {
    const err = new Error(reason);
    this.pending.forEach((p) => p.reject(err));
    this.pending.clear();
  }
}
