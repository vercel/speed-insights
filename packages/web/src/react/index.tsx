'use client';
import { useEffect, useRef } from 'react';
import type { SpeedInsightsProps } from '../types';
import { inject } from '../generic';

export function SpeedInsights(props: SpeedInsightsProps): JSX.Element | null {
  const scriptDynamicPath = useRef<((path: string) => void) | null>(null);
  useEffect(() => {
    const script = inject(props);

    scriptDynamicPath.current = script?.setDynamicPath || null;
  }, []);

  useEffect(() => {
    if (props.dynamicPath && scriptDynamicPath.current) {
      scriptDynamicPath.current(props.dynamicPath);
    }
  }, [props.dynamicPath]);

  return null;
}
