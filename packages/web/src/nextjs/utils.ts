'use client';
import { useParams, usePathname, useSearchParams } from 'next/navigation.js';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const searchParams = useSearchParams();
  const path = usePathname();

  const finalParams = {
    ...Object.fromEntries(searchParams.entries()),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be empty in pages router
    ...(params || {}),
  };

  return computeRoute(path, finalParams);
};
