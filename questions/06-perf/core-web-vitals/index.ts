// Note: in a real project install with: npm install web-vitals
// import { onLCP, onCLS, onINP } from 'web-vitals';

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

// TODO 1: Implement rateMetric — a helper that takes the metric name and raw value
//         and returns the VitalRating using Google's official thresholds.
//         LCP: good < 2500, needs-improvement < 4000, poor >= 4000 (ms)
//         CLS: good < 0.1, needs-improvement < 0.25, poor >= 0.25 (score)
//         INP: good < 200, needs-improvement < 500, poor >= 500 (ms)

function rateMetric(name: 'LCP' | 'CLS' | 'INP', value: number): VitalRating {
  throw new Error('Not implemented');
}

// TODO 2: Implement initWebVitalsReporter. Call onLCP, onCLS, onINP from web-vitals.
//         Each callback fires once with the final value. Collect all three and call
//         onReport. Handle browsers where a metric is unsupported (value stays null).
//         Return a cleanup function that can cancel pending reports.

export function initWebVitalsReporter(onReport: (report: VitalsReport) => void): () => void {
  throw new Error('Not implemented');
}

// TODO 3: Implement diagnoseVitals as a pure function.
//         For each metric present: rate it, then pick a root cause string based on the rating.
//         For 'good', rootCause can be 'No issues detected'.
//         For others, use realistic root cause descriptions (see README examples).

export function diagnoseVitals(measurements: {
  lcp?: number;
  cls?: number;
  inp?: number;
}): {
  lcp: { rating: VitalRating; rootCause: string } | null;
  cls: { rating: VitalRating; rootCause: string } | null;
  inp: { rating: VitalRating; rootCause: string } | null;
} {
  throw new Error('Not implemented');
}

// TODO 4: Add a reportOnVisibilityHidden helper — calls a partial report when
//         document.visibilityState becomes 'hidden', so data isn't lost on tab close.
