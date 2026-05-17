# Chunked File Uploader

## Problem

Implement a `ChunkedUploader` class that uploads a large file to a server in fixed-size chunks. The upload must support progress reporting, per-chunk retry with exponential backoff, and mid-upload abort.

## TypeScript Signature

```ts
interface UploadOptions {
  uploadUrl: string;     // POST endpoint for each chunk
  chunkSize?: number;    // bytes per chunk, default 1 MB (1_048_576)
  maxRetries?: number;   // retry attempts per failed chunk, default 3
  headers?: Record<string, string>;
}

interface ChunkMeta {
  index: number;    // 0-based chunk index
  total: number;    // total number of chunks
  start: number;    // byte offset in the original file
  end: number;      // exclusive end byte
  size: number;     // actual chunk size
}

interface UploadResult {
  fileId: string;   // server-assigned ID for the assembled file
  url: string;      // download URL
}

class ChunkedUploader {
  constructor(options: UploadOptions)

  // Upload the given File. Resolves with the server response after the last chunk.
  // Rejects if any chunk exhausts its retry budget or if aborted.
  upload(file: File): Promise<UploadResult>

  // Cancel an in-progress upload. Causes the upload() promise to reject with 'Aborted'.
  abort(): void

  // Register a progress callback (0–100). Called after each chunk completes.
  onProgress(handler: (percent: number) => void): void
}
```

## Usage Example

```ts
const uploader = new ChunkedUploader({
  uploadUrl: 'https://api.example.com/upload',
  chunkSize: 2 * 1024 * 1024, // 2 MB chunks
  maxRetries: 3,
});

uploader.onProgress((pct) => console.log(`${pct}% uploaded`));

try {
  const result = await uploader.upload(selectedFile);
  console.log('Done:', result.url);
} catch (err) {
  console.error('Upload failed:', err.message);
}

// Or abort early
cancelButton.onclick = () => uploader.abort();
```

## Constraints

- Slice each chunk with `file.slice(start, end)` and send it as `FormData`
- Each `FormData` must include: `file` (the Blob), `index`, `total`, `filename`
- Chunks upload **sequentially** (not in parallel) to simplify retry logic
- Failed chunks retry up to `maxRetries` times with 2^attempt × 100 ms backoff
- `abort()` must cancel any in-flight `fetch` using `AbortController`
- Progress is calculated as `(chunksCompleted / totalChunks) * 100`, rounded to 1 decimal

## Edge Cases

- File size exactly equals `chunkSize` — produces exactly 1 chunk
- File size is 0 bytes — should reject with `'Cannot upload empty file'`
- `chunkSize` larger than file — sends the whole file as one chunk
- Server returns non-2xx for a chunk — retry; if retries exhausted, reject with the status text
- `abort()` called before `upload()` — `upload()` rejects immediately with `'Aborted'`
- `upload()` called twice concurrently — second call should reject with `'Upload already in progress'`
- Last chunk may be smaller than `chunkSize` — use `file.slice(start)` (no end arg)
