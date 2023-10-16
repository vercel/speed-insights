'use client';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const searchParams = useSearchParams();
  const path = usePathname();

  const merged = useMemo(
    () => ({
      ...params,
      ...Object.fromEntries(searchParams.entries()),
    }),
    [params, searchParams],
  );

  return computeRoute(path, merged);
};
