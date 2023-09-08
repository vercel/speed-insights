import {
  onLCP,
  onFID,
  onCLS,
  onFCP,
  onINP,
  onTTFB,
} from 'web-vitals/attribution';
import type { Metric } from 'web-vitals';
import type { CollectedMetric, SpeedInsightsPayload } from '../types';
import {
  formatMetricValue,
  getConnectionSpeed,
  getDomTarget,
  sendBeacon,
} from '../utils';

export function sendVitals(metrics: CollectedMetric[], dsn: string): void {
  const speed = getConnectionSpeed();

  if (metrics.length === 0) return;

  const payload: SpeedInsightsPayload = {
    dsn,
    speed,
    metrics: metrics.map((metric) => ({
      id: metric.id,
      type: metric.name,
      value: formatMetricValue(metric),
      dynamicPath: metric.dynamicPath,
      href: window.location.href.replace('http://', 'https://'), // TODO: remove this
      attribution: {
        target: getDomTarget(metric),
      },
    })),
  };
  sendBeacon(payload as never);
}

export function watchMetrics(callback: (metric: Metric) => void): void {
  onCLS(callback);
  onFID(callback);
  onLCP(callback);
  onFCP(callback);
  onINP(callback);
  onTTFB(callback);
}
