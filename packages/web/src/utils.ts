import type { MetricWithAttribution } from 'web-vitals';

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

const ENDPOINT = 'https://vitals.vercel-insights.com/v1/vitals';
// const ENDPOINT_V2 = 'https://vitals.vercel-insights.com/v2/vitals';

export function sendBeacon(data: any): void {
  // Convert the array to a URL-encoded string
  const encodedData = new URLSearchParams(data).toString();

  // Create a Blob object with the encoded data
  const blob = new Blob([encodedData], {
    type: 'application/x-www-form-urlencoded',
  });
  try {
    if ('keepalive' in Request.prototype) {
      void fetch(ENDPOINT, {
        method: 'POST',
        body: blob,
        keepalive: true,
        mode: 'no-cors',
        credentials: 'omit',
      });
      console.log('using fetch');
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
