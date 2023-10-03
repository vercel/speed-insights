import { useLocation, useParams } from '@remix-run/react';
import { computeRoute } from '../utils';

export const useRoute = (): string | null => {
  const params = useParams();
  const location = useLocation();

  return computeRoute(location.pathname, params as never);
};
