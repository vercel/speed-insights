export interface SpeedInsightsMetric {
  id: string;
  event_name: string;
  dynamicPath: string | null;
  value: string | number;
  href: string;
  dsn: string;
  speed: string;
}
