'use client';
import { useEffect, useRef } from 'react';
import type { SpeedInsightsProps } from '../types';
import { inject } from '../generic';

export function SpeedInsights(
  props: SpeedInsightsProps & {
    framework?: string;
  },
): JSX.Element | null {
  const setScriptRoute = useRef<((path: string) => void) | null>(null);
  useEffect(() => {
    if (!setScriptRoute.current) {
      const script = inject({
        framework: props.framework || 'react',
        ...props,
      });
      if (script) {
        setScriptRoute.current = script.setRoute;
      }
    } else if (props.route) {
      setScriptRoute.current(props.route);
    }
  }, [props.route]);

  return null;
}
