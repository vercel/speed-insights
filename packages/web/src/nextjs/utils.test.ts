import { afterEach, describe, expect, it } from 'vitest';
import {
  filterParallelRouteParams,
  getBasePath,
  getConfigString,
} from './utils';

const processSave = { ...process };
const envSave = { ...process.env };

afterEach(() => {
  global.process = { ...processSave };
  process.env = { ...envSave };
});

describe('filterParallelRouteParams()', () => {
  it('filters single-segment slot catch-all from static main route', () => {
    // @sidebar/[...catchAll] matched "dashboard" — a single segment not in main route
    const result = filterParallelRouteParams({ catchAll: ['dashboard'] }, [
      'dashboard',
    ]);
    expect(result).toEqual({});
  });

  it('keeps multi-segment catch-all that appears in segments', () => {
    const result = filterParallelRouteParams({ slug: ['blog', 'my-post'] }, [
      'blog/my-post',
    ]);
    expect(result).toEqual({ slug: ['blog', 'my-post'] });
  });

  it('keeps string params and filters slot array params', () => {
    const result = filterParallelRouteParams(
      { id: 'abc', catchAll: ['dashboard'] },
      ['some-other-segment'],
    );
    expect(result).toEqual({ id: 'abc' });
  });

  it('filters multi-segment slot catch-all whose joined value is not in segments', () => {
    const result = filterParallelRouteParams({ catchAll: ['a', 'b'] }, [
      'c',
      'd',
    ]);
    expect(result).toEqual({});
  });

  it('keeps all params when segments is empty', () => {
    const result = filterParallelRouteParams(
      { id: 'abc', slug: ['x', 'y'] },
      [],
    );
    expect(result).toEqual({ id: 'abc' });
  });
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

  it('returns basepath set for Nextjs', () => {
    const basepath = `/_vercel-${Math.random()}/insights`;
    process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH = basepath;
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

  it('returns configuration string set for Next.js', () => {
    const config = JSON.stringify({
      speedInsights: {
        endpoint: `/_vercel-${Math.random()}`,
      },
    });
    process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG = config;
    expect(getConfigString()).toBe(config);
  });
});
