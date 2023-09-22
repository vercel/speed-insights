'use client';
import { useEffect, useRef } from 'react';
import type { SpeedInsightsProps } from '../types';
import { inject } from '../generic';

export function SpeedInsights(props: SpeedInsightsProps): JSX.Element | null {
  const setScriptRoute = useRef<((path: string) => void) | null>(null);
  useEffect(() => {
    const script = inject(props);

    setScriptRoute.current = script?.setRoute || null;
  }, []);

  useEffect(() => {
    if (props.route && setScriptRoute.current) {
      setScriptRoute.current(props.route);
    }
  }, [props.route]);

  return null;
}
