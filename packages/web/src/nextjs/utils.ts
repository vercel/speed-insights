'use client';
import { useParams, usePathname, useSearchParams } from 'next/navigation.js';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const searchParams = useSearchParams() || new URLSearchParams();
  const path = usePathname();
  // Until we have route parameters, we don't compute the route
  if (!params) {
    return null;
  }
  // in Next.js@13, useParams() could return an empty object for pages router, and we default to searchParams.
  const finalParams = Object.keys(params).length
    ? params
    : Object.fromEntries(searchParams.entries());
  return computeRoute(path, finalParams);
};

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
