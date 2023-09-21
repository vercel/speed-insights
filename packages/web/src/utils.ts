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
