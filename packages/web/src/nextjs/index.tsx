import { useCallback, useEffect, useRef } from 'react';
import { useDynamicPath } from './utils';
import { getConnectionSpeed } from '../utils';
import { SpeedInsightsMetric } from '../types';
import { sendVitals, watchMetrics } from '../generic';
import { Metric } from 'web-vitals';

interface SpeedInsightsProps {
  token?: string;
  sampleRate?: number; // Only send a percentage of events to the server to reduce costs
}

export function SpeedInsights({ token, sampleRate }: SpeedInsightsProps): null {
  const dynamicPath = useDynamicPath();
  const vitals = useRef<SpeedInsightsMetric[]>([]);

  const flush = useCallback(() => {
    if (vitals.current.length > 0) {
      if (sampleRate && Math.random() > sampleRate) {
        return;
      }
      const body = vitals.current;

      console.log('flushing', body);
      sendVitals(body);

      vitals.current = [];
    }
  }, [sampleRate]);

  useEffect(() => {
    addEventListener('visibilitychange', flush);
    addEventListener('pagehide', flush);
    return () => {
      removeEventListener('visibilitychange', flush);
      removeEventListener('pagehide', flush);
    };
  }, [flush]);

  const reportVital = useCallback(
    (metric: Metric): void => {
      const speed = getConnectionSpeed();
      const vital = {
        dynamicPath,
        speed,
        id: metric.id,
        event_name: metric.name,
        value: metric.value.toFixed(2),
        href: window.location.href.replace('http://', 'https://'), // TODO: remove this
        dsn: token ?? 'wAkFEOQVq9CTI5O4445EXoD5w1Y',
        //...metric,
      };
      console.log(vital);
      vitals.current.push(vital);
    },
    [dynamicPath],
  );

  useEffect(() => {
    watchMetrics(reportVital);
  }, []);

  return null;
}
