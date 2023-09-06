import {
  onLCP,
  onFID,
  onCLS,
  onFCP,
  onINP,
  onTTFB,
} from 'web-vitals/attribution';
import type { Metric } from 'web-vitals';
import type { SpeedInsightsMetric } from '../types';

const ENDPOINT = 'https://vitals.vercel-insights.com/v1/vitals';

export function sendVitals(metrics: SpeedInsightsMetric[]): void {
  for (const metric of metrics) {
    const data = JSON.stringify(metric);
    if ('keepalive' in Request.prototype) {
      void fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        keepalive: true,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if ('sendBeacon' in navigator) {
      // Use sendBeacon as a fallback
      navigator.sendBeacon(ENDPOINT, data);
    }
  }
}

export function watchMetrics(callback: (metric: Metric) => void): void {
  onCLS(callback);
  onFID(callback);
  onLCP(callback);
  onFCP(callback);
  onINP(callback);
  onTTFB(callback);
}
