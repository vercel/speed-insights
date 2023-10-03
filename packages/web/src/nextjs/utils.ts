'use client';
import { useParams, usePathname } from 'next/navigation';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const path = usePathname();

  return computeRoute(path, params);
};
