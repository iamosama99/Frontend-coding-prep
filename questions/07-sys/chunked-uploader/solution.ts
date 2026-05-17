export interface UploadOptions {
  uploadUrl: string;
  chunkSize?: number;
  maxRetries?: number;
  headers?: Record<string, string>;
}

export interface UploadResult {
  fileId: string;
  url: string;
}

export class ChunkedUploader {
  private uploadUrl: string;
  private chunkSize: number;
  private maxRetries: number;
  private headers: Record<string, string>;
  private aborted = false;
  private uploading = false;
  private abortController: AbortController | null = null;
  private progressHandler: ((pct: number) => void) | null = null;

  constructor(options: UploadOptions) {
    this.uploadUrl = options.uploadUrl;
    this.chunkSize = options.chunkSize ?? 1_048_576;
    this.maxRetries = options.maxRetries ?? 3;
    this.headers = options.headers ?? {};
  }

  onProgress(handler: (pct: number) => void): void {
    this.progressHandler = handler;
  }

  abort(): void {
    this.aborted = true;
    this.abortController?.abort();
  }

  async upload(file: File): Promise<UploadResult> {
    if (file.size === 0) throw new Error('Cannot upload empty file');
    if (this.uploading) throw new Error('Upload already in progress');

    this.uploading = true;
    this.aborted = false;

    try {
      const totalChunks = Math.ceil(file.size / this.chunkSize);
      let lastResponse: Response | null = null;

      for (let i = 0; i < totalChunks; i++) {
        if (this.aborted) throw new Error('Aborted');

        const start = i * this.chunkSize;
        const end = Math.min(start + this.chunkSize, file.size);
        const blob = file.slice(start, end);

        const form = new FormData();
        form.append('file', blob);
        form.append('index', String(i));
        form.append('total', String(totalChunks));
        form.append('filename', file.name);

        lastResponse = await this.uploadChunk(form, this.maxRetries);

        const pct = Math.round(((i + 1) / totalChunks) * 1000) / 10;
        this.progressHandler?.(pct);
      }

      return lastResponse!.json();
    } finally {
      this.uploading = false;
    }
  }

  private async uploadChunk(form: FormData, retriesLeft: number): Promise<Response> {
    this.abortController = new AbortController();

    let res: Response;
    try {
      res = await fetch(this.uploadUrl, {
        method: 'POST',
        body: form,
        signal: this.abortController.signal,
        headers: this.headers,
      });
    } catch (err: any) {
      if (err.name === 'AbortError') throw new Error('Aborted');
      throw err;
    }

    if (!res.ok) {
      if (retriesLeft > 0) {
        const delay = Math.pow(2, this.maxRetries - retriesLeft) * 100;
        await new Promise((r) => setTimeout(r, delay));
        return this.uploadChunk(form, retriesLeft - 1);
      }
      throw new Error(res.statusText);
    }

    return res;
  }
}
