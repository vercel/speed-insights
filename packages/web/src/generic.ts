import { initQueue } from './queue';
import type {
  BeforeSend,
  InjectSpeedInsightsProps,
  SpeedInsightsProps,
} from './types';
import { computeRoute, isBrowser, loadProps } from './utils';

/**
 * Injects the Vercel Speed Insights script into the page head and starts tracking page views. Read more in our [documentation](https://vercel.com/docs/speed-insights).
 * @param [props] - Speed Insights options.
 * @param [props.debug] - Whether to enable debug logging in development. Defaults to `true`.
 * @param [props.beforeSend] - A middleware function to modify events before they are sent. Should return the event object or `null` to cancel the event.
 * @param [props.sampleRate] - When setting to 0.5, 50% of the events will be sent to Vercel Speed Insights. Defaults to `1`.
 * @param [props.route] - The dynamic route of the page.
 * @param [props.dsn] - The DSN of the project to send events to. Only required when self-hosting.
 * @param [confString] - an optional JSON string (InjectSpeedInsightsProps) containing the default configuration. Explicit props will take over any provided default.
 */
function injectSpeedInsights(
  props: InjectSpeedInsightsProps = {},
  confString?: string,
): {
  setRoute: (route: string | null) => void;
} | null {
  // When route is null, it means that pages router is not ready yet. Will resolve soon
  if (!isBrowser() || props.route === null) return null;

  initQueue();

  const { beforeSend, src, dataset } = loadProps(props, confString);

  if (document.head.querySelector(`script[src*="${src}"]`)) return null;

  if (beforeSend) {
    window.si?.('beforeSend', beforeSend);
  }

  const script = document.createElement('script');
  script.src = src;
  script.defer = true;

  // Apply all dataset attributes from loadProps
  for (const [key, value] of Object.entries(dataset)) {
    script.dataset[key] = value;
  }

  script.onerror = (): void => {
    console.log(
      `[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`,
    );
  };

  document.head.appendChild(script);

  return {
    setRoute: (route: string | null): void => {
      script.dataset.route = route ?? undefined;
    },
  };
}

export { injectSpeedInsights, computeRoute };
export type { SpeedInsightsProps, BeforeSend as BeforeSendMiddleware };

export default {
  injectSpeedInsights,
  computeRoute,
};
