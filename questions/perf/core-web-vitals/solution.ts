type VitalRating = 'good' | 'needs-improvement' | 'poor';

// TODO: implement solution
export function initWebVitalsReporter(_onReport: (report: any) => void): () => void {
  throw new Error('Not implemented');
}

export function diagnoseVitals(_measurements: {
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
