export interface UploadOptions {
  uploadUrl: string;
  chunkSize?: number;
  maxRetries?: number;
  headers?: Record<string, string>;
}

export interface ChunkMeta {
  index: number;
  total: number;
  start: number;
  end: number;
  size: number;
}

export interface UploadResult {
  fileId: string;
  url: string;
}

// TODO 1: Store options and internal state:
//   - aborted: boolean flag set by abort()
//   - uploading: boolean flag to prevent concurrent uploads
//   - abortController: AbortController | null for the current fetch
//   - progressHandler: ((pct: number) => void) | null

// TODO 2: implement onProgress(handler) — store the handler for later use.

// TODO 3: implement abort().
//   - Set aborted = true
//   - Call abortController.abort() if one is active

// TODO 4: implement upload(file): Promise<UploadResult>.
//   a) Validate: reject if file.size === 0, reject if already uploading.
//   b) Set uploading = true, aborted = false.
//   c) Compute totalChunks = Math.ceil(file.size / chunkSize).
//   d) Loop over chunks sequentially (for i = 0; i < totalChunks; i++):
//      - If aborted, reject with 'Aborted' and break.
//      - Compute start = i * chunkSize, end = Math.min(start + chunkSize, file.size).
//      - Build FormData: append 'file' (blob), 'index', 'total', 'filename'.
//      - Call uploadChunk(formData, retries) — a helper that handles retry + backoff.
//      - After success, call progressHandler with (i + 1) / totalChunks * 100.
//   e) The response of the LAST chunk is parsed as JSON → UploadResult.
//   f) Set uploading = false in a finally block.

// TODO 5: implement private uploadChunk(formData, retriesLeft): Promise<Response>.
//   - Create a new AbortController, store it.
//   - fetch(uploadUrl, { method: 'POST', body: formData, signal, headers }).
//   - If the response is not ok AND retriesLeft > 0:
//       wait 2^(maxRetries - retriesLeft) * 100 ms, then recurse.
//   - If not ok and no retries left, throw an Error with the status text.

export class ChunkedUploader {
  constructor(_options: UploadOptions) {
    throw new Error('Not implemented');
  }

  upload(_file: File): Promise<UploadResult> {
    throw new Error('Not implemented');
  }

  abort(): void {
    throw new Error('Not implemented');
  }

  onProgress(_handler: (percent: number) => void): void {
    throw new Error('Not implemented');
  }
}
