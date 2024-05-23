export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function detectEnvironment(): 'development' | 'production' {
  try {
    const env = process.env.NODE_ENV;
    if (env === 'development' || env === 'test') {
      return 'development';
    }
  } catch (e) {
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
    const keys = Object.entries(pathParams).reduce<{
      simple: string[];
      multiple: string[];
    }>(
      ({ simple, multiple }, [key, value]) => ({
        simple: Array.isArray(value) ? simple : [...simple, key],
        multiple: Array.isArray(value) ? [...multiple, key] : multiple,
      }),
      { simple: [], multiple: [] },
    );
    // simple keys must be handled first
    for (const key of keys.simple) {
      const matcher = turnValueToRegExp(pathParams[key] as string);
      if (matcher.test(result)) {
        result = result.replace(matcher, `/[${key}]`);
      }
    }
    // array values next
    for (const key of keys.multiple) {
      const matcher = turnValueToRegExp(
        (pathParams[key] as string[]).join('/'),
      );
      if (matcher.test(result)) {
        result = result.replace(matcher, `/[...${key}]`);
      }
    }

    return result;
  } catch (e) {
    return pathname;
  }
}

function turnValueToRegExp(value: string): RegExp {
  return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
