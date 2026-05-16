type VitalRating = 'good' | 'needs-improvement' | 'poor';

// Google thresholds: https://web.dev/vitals/
function rateMetric(name: 'LCP' | 'CLS' | 'INP', value: number): VitalRating {
  if (name === 'LCP') {
    if (value < 2500) return 'good';
    if (value < 4000) return 'needs-improvement';
    return 'poor';
  }
  if (name === 'CLS') {
    if (value < 0.1) return 'good';
    if (value < 0.25) return 'needs-improvement';
    return 'poor';
  }
  // INP
  if (value < 200) return 'good';
  if (value < 500) return 'needs-improvement';
  return 'poor';
}

const ROOT_CAUSES: Record<string, Record<VitalRating, string>> = {
  LCP: {
    good: 'No issues detected',
    'needs-improvement': 'Slow server response time or render-blocking resources delaying the largest element',
    poor: 'Large unoptimized images, no CDN, or JavaScript blocking the main thread during initial load',
  },
  CLS: {
    good: 'No issues detected',
    'needs-improvement': 'Images or embeds without explicit dimensions causing layout shifts on load',
    poor: 'Dynamically injected content (ads, banners) above existing content pushing the layout down',
  },
  INP: {
    good: 'No issues detected',
    'needs-improvement': 'Long event handlers or heavy JavaScript tasks delaying visual feedback',
    poor: 'Synchronous I/O or blocking main-thread work during user interactions (click, keydown)',
  },
};

export function initWebVitalsReporter(onReport: (report: any) => void): () => void {
  let cancelled = false;
  const collected: Record<string, any> = {};

  function tryReport() {
    if (cancelled) return;
    onReport({
      ...collected,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
    });
  }

  // In a real project: import { onLCP, onCLS, onINP } from 'web-vitals'
  // and call each with (metric) => { collected[metric.name] = metric; tryReport(); }
  // We stub it here since web-vitals is browser-only.
  if (typeof window !== 'undefined') {
    // Real usage:
    // onLCP((m) => { collected.lcp = m; tryReport(); });
    // onCLS((m) => { collected.cls = m; tryReport(); });
    // onINP((m) => { collected.inp = m; tryReport(); });
  }

  return () => { cancelled = true; };
}

export function diagnoseVitals(measurements: {
  lcp?: number;
  cls?: number;
  inp?: number;
}): {
  lcp: { rating: VitalRating; rootCause: string } | null;
  cls: { rating: VitalRating; rootCause: string } | null;
  inp: { rating: VitalRating; rootCause: string } | null;
} {
  function diagnose(name: 'LCP' | 'CLS' | 'INP', value: number | undefined) {
    if (value === undefined) return null;
    const rating = rateMetric(name, value);
    return { rating, rootCause: ROOT_CAUSES[name][rating] };
  }

  return {
    lcp: diagnose('LCP', measurements.lcp),
    cls: diagnose('CLS', measurements.cls),
    inp: diagnose('INP', measurements.inp),
  };
}
