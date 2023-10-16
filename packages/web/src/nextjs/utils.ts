'use client';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const searchParams = useSearchParams();
  const path = usePathname();

  const finalParams = useMemo(() => {
    if (!params) return null;
    if (Object.keys(params).length !== 0) {
      return params;
    }
    // For pages router, we need to use `searchParams` because `params` is an empty object
    return { ...Object.fromEntries(searchParams.entries()) };
  }, [params, searchParams]);

  return computeRoute(path, finalParams);
};
