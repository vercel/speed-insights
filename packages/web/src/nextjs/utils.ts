'use client';
/* eslint-disable @typescript-eslint/no-unnecessary-condition -- can be empty in pages router */
import { useParams, usePathname, useSearchParams } from 'next/navigation.js';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const searchParams = useSearchParams();
  const path = usePathname();

  const finalParams = {
    ...Object.fromEntries(searchParams.entries()),
    ...(params || {}),
  };

  return params ? computeRoute(path, finalParams) : null;
};
