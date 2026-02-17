export interface SpeedInsightsProps {
  dsn?: string;
  sampleRate?: number; // Only send a percentage of events to the server to reduce costs
  route?: string | null; // The dynamic path if there is any (e.g. /blog/[slug]) otherwise the static path
  beforeSend?: BeforeSend;
  debug?: boolean;

  scriptSrc?: string;
  endpoint?: string;
}

export type InjectSpeedInsightsProps = SpeedInsightsProps & {
  framework?: string;
  basePath?: string;
};

export type EventTypes = 'vital';

export interface BeforeSendEvent {
  type: EventTypes;
  url: string;
  route?: string;
}

export type BeforeSend = (
  event: BeforeSendEvent,
) => BeforeSendEvent | null | undefined | false;

export interface Functions {
  beforeSend?: BeforeSend;
}

export interface SpeedInsights<T extends keyof Functions = keyof Functions> {
  queue: [T, Functions[T]][];
  addAction: (action: T, data: Functions[T]) => void;
}

declare global {
  interface Window {
    // Base interface
    /** Base interface to track events */
    si?: SpeedInsights['addAction'];
    /** Queue for speed insights datapoints, before the library is loaded */
    siq?: SpeedInsights['queue'];

    sil?: boolean;

    /** used by Astro component only */
    speedInsightsBeforeSend?: BeforeSend;
  }
}
