import { name as packageName, version } from '../package.json';
import { initQueue } from './queue';
import type { SpeedInsightsProps } from './types';
import { computeRoute, getScriptSrc, isBrowser, isDevelopment } from './utils';

/**
 * Injects the Vercel Speed Insights script into the page head and starts tracking page views. Read more in our [documentation](https://vercel.com/docs/speed-insights).
 * @param [props] - Speed Insights options.
 * @param [props.debug] - Whether to enable debug logging in development. Defaults to `true`.
 * @param [props.beforeSend] - A middleware function to modify events before they are sent. Should return the event object or `null` to cancel the event.
 * @param [props.sampleRate] - When setting to 0.5, 50% of the events will be sent to Vercel Speed Insights. Defaults to `1`.
 * @param [props.route] - The dynamic route of the page.
 * @param [props.dsn] - The DSN of the project to send events to. Only required when self-hosting.
 */
function injectSpeedInsights(
  props: SpeedInsightsProps & {
    framework?: string;
    basePath?: string;
  } = {},
): {
  setRoute: (route: string | null) => void;
} | null {
  // When route is null, it means that pages router is not ready yet. Will resolve soon
  if (!isBrowser() || props.route === null) return null;

  initQueue();

  const src = getScriptSrc(props);

  if (document.head.querySelector(`script[src*="${src}"]`)) return null;

  if (props.beforeSend) {
    window.si?.('beforeSend', props.beforeSend);
  }

  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.dataset.sdkn =
    packageName + (props.framework ? `/${props.framework}` : '');
  script.dataset.sdkv = version;

  if (props.sampleRate) {
    script.dataset.sampleRate = props.sampleRate.toString();
  }
  if (props.route) {
    script.dataset.route = props.route;
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  } else if (props.basePath) {
    script.dataset.endpoint = `${props.basePath}/speed-insights/vitals`;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = 'false';
  }

  script.onerror = (): void => {
    // eslint-disable-next-line no-console -- Logging is okay here
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
export type { SpeedInsightsProps };

// eslint-disable-next-line import/no-default-export -- Allow default export
export default {
  injectSpeedInsights,
  computeRoute,
};
