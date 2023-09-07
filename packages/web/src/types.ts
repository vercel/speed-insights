import type { MetricWithAttribution } from 'web-vitals';

// Internal typings
export type CollectedMetric = MetricWithAttribution & {
  dynamicPath: string | null;
};

// V1
export interface SpeedInsightsV1Metric {
  id: string;
  event_name: string;
  page: string | null;
  value: string | number;
  href: string;
  dsn: string;
  speed: string;
}

export type SpeedInsightsV1Payload = SpeedInsightsV1Metric;

// V2
export interface SpeedInsightsV2Payload {
  dsn: string;
  speed: string;
  metrics: SpeedInsightsV2Metric[];
}

export interface SpeedInsightsV2Metric {
  id: string;
  type: string;
  value: string | number;
  dynamicPath: string | null;
  href: string;
  attribution: {
    target?: string;
  };
}
