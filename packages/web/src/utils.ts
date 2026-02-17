import { name as packageName, version } from '../package.json';
import type {
  BeforeSend,
  InjectSpeedInsightsProps,
  SpeedInsightsProps,
} from './types';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function detectEnvironment(): 'development' | 'production' {
  try {
    const env = process.env.NODE_ENV;
    if (env === 'development' || env === 'test') {
      return 'development';
    }
  } catch {
    // do nothing, this is okay
  }
  return 'production';
}

export function isProduction(): boolean {
  return detectEnvironment() === 'production';
}

export function isDevelopment(): boolean {
  return detectEnvironment() === 'development';
}

export function computeRoute(
  pathname: string | null,
  pathParams: Record<string, string | string[]> | null,
): string | null {
  if (!pathname || !pathParams) {
    return pathname;
  }

  let result = pathname;
  try {
    const entries = Object.entries(pathParams);
    // simple keys must be handled first
    for (const [key, value] of entries) {
      if (!Array.isArray(value)) {
        const matcher = turnValueToRegExp(value);
        if (matcher.test(result)) {
          result = result.replace(matcher, `/[${key}]`);
        }
      }
    }
    // array values next
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        const matcher = turnValueToRegExp(value.join('/'));
        if (matcher.test(result)) {
          result = result.replace(matcher, `/[...${key}]`);
        }
      }
    }
    return result;
  } catch {
    return pathname;
  }
}

function turnValueToRegExp(value: string): RegExp {
  return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getScriptSrc(
  props: SpeedInsightsProps & { basePath?: string },
): string {
  if (props.scriptSrc) {
    return makeAbsolute(props.scriptSrc);
  }
  if (isDevelopment()) {
    return 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js';
  }
  if (props.dsn) {
    return 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
  }
  if (props.basePath) {
    return makeAbsolute(`${props.basePath}/speed-insights/script.js`);
  }
  return '/_vercel/speed-insights/script.js';
}

export function loadProps(
  explicitProps: InjectSpeedInsightsProps,
  confString?: string,
): {
  src: string;
  beforeSend?: BeforeSend;
  dataset: Record<string, string>;
} {
  let props = explicitProps;
  if (confString) {
    try {
      props = {
        ...(JSON.parse(confString)
          ?.speedInsights as Partial<SpeedInsightsProps>),
        ...explicitProps,
      };
    } catch {
      // Invalid JSON, use only explicit props
    }
  }

  const dataset: Record<string, string> = {
    sdkn: packageName + (props.framework ? `/${props.framework}` : ''),
    sdkv: version,
  };

  if (props.sampleRate) {
    dataset.sampleRate = props.sampleRate.toString();
  }
  if (props.route) {
    dataset.route = props.route;
  }
  if (isDevelopment() && props.debug === false) {
    dataset.debug = 'false';
  }
  if (props.dsn) {
    dataset.dsn = props.dsn;
  }

  if (props.endpoint) {
    dataset.endpoint = makeAbsolute(props.endpoint);
  } else if (props.basePath) {
    // backward compatibility
    dataset.endpoint = makeAbsolute(`${props.basePath}/speed-insights/vitals`);
  }

  return {
    src: getScriptSrc(props),
    beforeSend: props.beforeSend,
    dataset,
  };
}

function makeAbsolute(url: string): string {
  return url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('/')
    ? url
    : `/${url}`;
}
