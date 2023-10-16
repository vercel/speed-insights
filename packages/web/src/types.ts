export interface SpeedInsightsProps {
  token?: string;
  sampleRate?: number; // Only send a percentage of events to the server to reduce costs
  route?: string | null; // The dynamic path if there is any (e.g. /blog/[slug]) otherwise the static path
  beforeSend?: BeforeSendMiddleware;
  debug?: boolean;

  scriptSrc?: string;
  endpoint?: string;
}

export type EventTypes = 'vital';

export interface Event {
  type: EventTypes;
  url: string;
}

export type BeforeSendMiddleware = (
  data: Event,
  // Should we be more strict here? Compiler won't help a lot if it's that loose
) => Event | null | undefined | false;

export interface Functions {
  beforeSend?: BeforeSendMiddleware;
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
    // vam?: Mode;
  }
}
