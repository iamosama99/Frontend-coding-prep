# Core Web Vitals (LCP / CLS / INP)

## Problem

Implement a `WebVitalsReporter` that measures all three Core Web Vitals in the browser and reports them to an analytics endpoint. Also write a `diagnoseVitals` function that takes a set of measured values and returns a diagnosis with pass/needs-improvement/fail ratings and the most likely root cause for each failing metric.

## API Signature

```ts
type VitalRating = 'good' | 'needs-improvement' | 'poor';

interface VitalResult {
  name: 'LCP' | 'CLS' | 'INP';
  value: number;
  rating: VitalRating;
}

interface VitalsReport {
  lcp: VitalResult | null;
  cls: VitalResult | null;
  inp: VitalResult | null;
  url: string;
  timestamp: number;
}

// Measures vitals and calls onReport when values are available
export function initWebVitalsReporter(onReport: (report: VitalsReport) => void): () => void

// Pure function — given raw measurements, returns rating + root cause diagnosis
export function diagnoseVitals(measurements: {
  lcp?: number;  // milliseconds
  cls?: number;  // unitless score
  inp?: number;  // milliseconds
}): {
  lcp: { rating: VitalRating; rootCause: string } | null;
  cls: { rating: VitalRating; rootCause: string } | null;
  inp: { rating: VitalRating; rootCause: string } | null;
}
```

## Usage Example

```ts
const cleanup = initWebVitalsReporter((report) => {
  fetch('/api/analytics', { method: 'POST', body: JSON.stringify(report) });
});

// On unmount
cleanup();

// Diagnose
const diagnosis = diagnoseVitals({ lcp: 3200, cls: 0.15, inp: 250 });
// diagnosis.lcp => { rating: 'needs-improvement', rootCause: 'Large or unoptimized hero image, render-blocking resources' }
// diagnosis.cls => { rating: 'needs-improvement', rootCause: 'Images without dimensions or late-injected content' }
// diagnosis.inp => { rating: 'poor', rootCause: 'Long tasks on main thread blocking interaction response' }
```

## Constraints

- Use the `web-vitals` library (`import { onLCP, onCLS, onINP } from 'web-vitals'`) for measurement
- Thresholds (Google's official): LCP good < 2500ms, needs-improvement 2500–4000ms, poor > 4000ms | CLS good < 0.1, needs-improvement 0.1–0.25, poor > 0.25 | INP good < 200ms, needs-improvement 200–500ms, poor > 500ms
- `diagnoseVitals` is a pure function — no side effects, no browser APIs
- `initWebVitalsReporter` returns a cleanup function that removes all listeners

## Edge Cases

- Metric not supported in current browser — `onReport` is still called with `null` for that metric
- User leaves the page before LCP fires — report partial data on `visibilitychange`
- INP is only available in Chrome — gracefully degrade in other browsers
- `diagnoseVitals` receives `undefined` for a metric — returns `null` for that metric
- All metrics are `good` — report is still sent (useful as a baseline)
