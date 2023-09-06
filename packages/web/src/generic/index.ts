import {
  onLCP,
  onFID,
  onCLS,
  onFCP,
  onINP,
  onTTFB,
} from 'web-vitals/attribution';
import type { Metric } from 'web-vitals';
import type { CollectedMetric } from '../types';
import { cutDecimal, getConnectionSpeed, sendBeacon } from '../utils';

export function sendVitals(metrics: CollectedMetric[], dsn: string): void {
  const speed = getConnectionSpeed();

  for (const metric of metrics) {
    const value = cutDecimal(metric.value, metric.name === 'CLS' ? 4 : 0);

    const vital = {
      dsn,
      speed,
      id: metric.id,
      event_name: metric.name,
      value,
      href: window.location.href.replace('http://', 'https://'), // TODO: remove this
      ...(metric.dynamicPath && { dynamicPath: metric.dynamicPath }),
    };

    sendBeacon(vital);
  }

  // // V2 handling
  // if (!metrics[0]) return;
  // const payload: SpeedInsightsV2Payload = {
  //   dsn,
  //   speed,
  //   metrics: metrics.map((metric) => ({
  //     id: metric.id,
  //     type: metric.event_name,
  //     value: metric.value,
  //     dynamicPath: metric.dynamicPath,
  //     href: metric.href,
  //     attribution: {
  //       target: getDomTarget(metric),
  //     },
  //   })),
  // };
  // const data = JSON.stringify(payload);
  // sendBeacon(data);
}

export function watchMetrics(callback: (metric: Metric) => void): void {
  onCLS(callback);
  onFID(callback);
  onLCP(callback);
  onFCP(callback);
  onINP(callback);
  onTTFB(callback);
}
