import type { MetricWithAttribution } from 'web-vitals';
import type { CollectedMetric } from './types';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getConnectionSpeed(): string {
  let speed = '';
  if ('connection' in navigator) {
    const connection = navigator.connection as never as
      | {
          effectiveType?: string;
        }
      | undefined;
    if (connection?.effectiveType) {
      speed = connection.effectiveType;
    }
  }
  return speed;
}

const ENDPOINT = 'https://vitals.vercel-insights.com/v2/vitals';

export function sendBeacon(
  data: Record<string, string | number> | URLSearchParams | undefined,
): void {
  const blob = new Blob([JSON.stringify(data)]);
  try {
    if ('keepalive' in Request.prototype) {
      void fetch(ENDPOINT, {
        method: 'POST',
        body: blob,
        keepalive: true,
        mode: 'no-cors',
        credentials: 'omit',
      });
    } else if ('sendBeacon' in navigator) {
      // Use sendBeacon as a fallback
      navigator.sendBeacon(ENDPOINT, blob);
    }
  } catch (e) {
    /* empty */
  }
}

export function getDomTarget(
  metric: MetricWithAttribution,
): string | undefined {
  if (metric.name === 'CLS') {
    return metric.attribution.largestShiftTarget as string;
  }
  if (metric.name === 'FID') {
    return metric.attribution.eventTarget as string;
  }
  if (metric.name === 'LCP') {
    return metric.attribution.element as string;
  }
}

export function cutDecimal(number: number, decimals: number): number {
  if (Number.isInteger(number)) {
    return number;
  }

  const multiplier = Math.pow(10, decimals);
  return Math.floor(number * multiplier) / multiplier;
}

export function formatMetricValue(metric: CollectedMetric): number {
  if (metric.name === 'CLS') {
    return cutDecimal(metric.value, 4);
  }
  if (metric.name === 'FID') {
    return cutDecimal(metric.value, 2);
  }
  return Math.round(metric.value);
}
