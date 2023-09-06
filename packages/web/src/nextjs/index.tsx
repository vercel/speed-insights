import { useCallback, useEffect, useRef } from 'react';
import type { Metric, MetricWithAttribution } from 'web-vitals';
import { sendVitals, watchMetrics } from '../generic';
import type { CollectedMetric } from '../types';
import { useDynamicPath } from './utils';

interface SpeedInsightsProps {
  token?: string;
  sampleRate?: number; // Only send a percentage of events to the server to reduce costs
}

export function SpeedInsights({ token, sampleRate }: SpeedInsightsProps): null {
  const dynamicPath = useDynamicPath();
  const vitals = useRef<CollectedMetric[]>([]);

  const flush = useCallback(() => {
    if (vitals.current.length > 0) {
      if (sampleRate && Math.random() > sampleRate) {
        return;
      }
      const body = vitals.current;

      // eslint-disable-next-line no-console -- ok for now
      console.log('flushing', body);
      sendVitals(body, token ?? 'wAkFEOQVq9CTI5O4445EXoD5w1Y');

      vitals.current = [];
    }
  }, [sampleRate, vitals.current]);

  useEffect(() => {
    addEventListener('visibilitychange', flush);
    addEventListener('pagehide', flush);
    return () => {
      removeEventListener('visibilitychange', flush);
      removeEventListener('pagehide', flush);
    };
  }, [flush]);

  const reportVital = useCallback(
    (metric: MetricWithAttribution): void => {
      // eslint-disable-next-line no-console -- ok for now
      console.log(metric);
      vitals.current.push({ ...metric, dynamicPath });
    },
    [dynamicPath],
  );

  useEffect(() => {
    watchMetrics(reportVital as (metric: Metric) => void); // TODO: fix typing -- caused by not properly typed library
  }, []);

  return null;
}
