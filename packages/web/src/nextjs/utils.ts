'use client';
import {
  useParams,
  usePathname,
  useSearchParams,
  useSelectedLayoutSegments,
} from 'next/navigation.js';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const searchParams = useSearchParams() || new URLSearchParams();
  const path = usePathname();
  const segments = useSelectedLayoutSegments();

  // Until we have route parameters, we don't compute the route
  if (!params) {
    return null;
  }
  // in Next.js@13, useParams() could return an empty object for pages router, and we default to searchParams.
  const paramObject = Object.keys(params).length
    ? params
    : Object.fromEntries(searchParams.entries());

  const finalParams =
    segments !== null
      ? filterParallelRouteParams(paramObject, segments)
      : paramObject;
  return computeRoute(path, finalParams);
};

export function filterParallelRouteParams(
  params: Record<string, string | string[]>,
  segments: string[],
): Record<string, string | string[]> {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (!Array.isArray(value)) return true;
      const joined = value.join('/');
      return joined.includes('/') && segments.includes(joined);
    }),
  );
}

// !! important !!
// do not access env variables using process.env[varname]
// some bundlers won't replace the value at build time.

export function getBasePath(): string | undefined {
  if (typeof process === 'undefined' || typeof process.env === 'undefined') {
    return undefined;
  }
  return process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH;
}

export function getConfigString(): string | undefined {
  if (typeof process === 'undefined' || typeof process.env === 'undefined') {
    return undefined;
  }
  return process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG;
}
