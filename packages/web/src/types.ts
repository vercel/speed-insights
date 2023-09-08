import type { MetricWithAttribution } from 'web-vitals';

// Internal typings
export type CollectedMetric = MetricWithAttribution & {
  dynamicPath: string | null;
};

// V2
export interface SpeedInsightsPayload {
  dsn: string;
  speed: string;
  metrics: SpeedInsightsMetric[];
}

export interface SpeedInsightsMetric {
  id: string;
  type: string;
  value: string | number;
  dynamicPath: string | null;
  href: string;
  attribution: {
    target?: string;
  };
}
