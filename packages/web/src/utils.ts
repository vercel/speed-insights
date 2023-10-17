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

  for (const [key, valueOrArray] of Object.entries(pathParams)) {
    const isValueArray = Array.isArray(valueOrArray);
    const value = isValueArray ? valueOrArray.join('/') : valueOrArray;
    const expr = isValueArray ? `...${key}` : key;

    const matcher = new RegExp(`/${value}(?=[/?#]|$)`);
    if (matcher.test(result)) {
      result = result.replace(matcher, `/[${expr}]`);
    }
  }

  return result;
}
