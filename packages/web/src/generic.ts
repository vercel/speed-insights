import { name as packageName, version } from '../package.json';
import { initQueue } from './queue';
import type { SpeedInsightsProps } from './types';
import { isBrowser, isDevelopment } from './utils';

const SCRIPT_URL = `/_vercel/speed-insights`;
const SCRIPT_PROD_NAME = 'script.js';
const SCRIPT_DEBUG_NAME = 'script.debug.js';

/**
 * Injects the Vercel Speed Insights script into the page head and starts tracking page views. Read more in our [documentation](https://vercel.com/docs/speed-insights).
 * @param [props] - Speed Insights options.
 * @param [props.debug] - Whether to enable debug logging in development. Defaults to `true`.
 * @param [props.beforeSend] - A middleware function to modify events before they are sent. Should return the event object or `null` to cancel the event.
 */
function inject(props: SpeedInsightsProps): {
  setDynamicPath: (path: string) => void;
} | null {
  if (!isBrowser()) return null;

  initQueue();

  if (props.beforeSend) {
    window.si?.('beforeSend', props.beforeSend);
  }
  const src =
    props.scriptSrc ||
    `${SCRIPT_URL}/${isDevelopment() ? SCRIPT_DEBUG_NAME : SCRIPT_PROD_NAME}`;

  if (document.head.querySelector(`script[src*="${src}"]`)) return null;

  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.setAttribute('data-sdkn', packageName);
  script.setAttribute('data-sdkv', version);

  if (props.sampleRate) {
    script.setAttribute('data-sample-rate', props.sampleRate.toString());
  }
  if (props.dynamicPath) {
    script.setAttribute('data-dynamic-path', props.dynamicPath);
  }
  if (props.endpoint) {
    script.setAttribute('data-endpoint', props.endpoint);
  }
  if (props.token) {
    script.setAttribute('data-token', props.token);
  }
  if (isDevelopment() && props.debug === false) {
    script.setAttribute('data-debug', 'false');
  }

  script.onerror = (): void => {
    const errorMessage = isDevelopment()
      ? 'Please check if any ad blockers are enabled and try again.'
      : 'Be sure to enable Speed Insights for your project and deploy again. See https://vercel.com/docs/speed-insights for more information.';

    // eslint-disable-next-line no-console -- Logging is okay here
    console.log(
      `[Vercel Speed Insights] Failed to load script from ${src}. ${errorMessage}`,
    );
  };

  document.head.appendChild(script);

  return {
    setDynamicPath: (path: string): void => {
      script.dataset.dynamicPath = path;
    },
  };
}

export { inject };
export type { SpeedInsightsProps };

// eslint-disable-next-line import/no-default-export -- Allow default export
export default {
  inject,
};
