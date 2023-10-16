'use client';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const searchParams = useSearchParams();
  const path = usePathname();

  const finalParams = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be null on pages router
    if (!params) return null;
    if (Object.keys(params).length !== 0) {
      return params;
    }
    // For pages router, we need to use `searchParams` because `params` is an empty object
    return { ...Object.fromEntries(searchParams.entries()) };
  }, [params, searchParams]);

  return computeRoute(path, finalParams);
};
