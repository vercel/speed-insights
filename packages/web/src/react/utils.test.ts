import { afterEach, describe, expect, it } from 'vitest';
import { getBasePath, getConfigString } from './utils';

const processSave = { ...process };
const envSave = { ...process.env };
afterEach(() => {
  global.process = { ...processSave };
  process.env = { ...envSave };
});

describe('getBasePath()', () => {
  it('returns null without process', () => {
    // @ts-expect-error -- yes, we want to completely drop process for this test!!
    global.process = undefined;
    expect(getBasePath()).toBeUndefined();
  });

  it('returns null without process.env', () => {
    // @ts-expect-error -- yes, we want to completely drop process.env for this test!!
    process.env = undefined;
    expect(getBasePath()).toBeUndefined();
  });

  it('returns basepath set for CRA', () => {
    const basepath = `/_vercel-${Math.random()}/insights`;
    process.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH = basepath;
    expect(getBasePath()).toBe(basepath);
  });
});

describe('getConfigString()', () => {
  it('returns undefined without process', () => {
    // @ts-expect-error -- yes, we want to completely drop process for this test!!
    global.process = undefined;
    expect(getConfigString()).toBeUndefined();
  });

  it('returns undefined without process.env', () => {
    // @ts-expect-error -- yes, we want to completely drop process.env for this test!!
    process.env = undefined;
    expect(getConfigString()).toBeUndefined();
  });

  it('returns configuration string set for React/Vite', () => {
    const config = JSON.stringify({
      speedInsights: {
        endpoint: `/_vercel-${Math.random()}`,
      },
    });
    process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG = config;
    expect(getConfigString()).toBe(config);
  });
});
