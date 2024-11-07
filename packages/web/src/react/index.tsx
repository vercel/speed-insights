'use client';
import { useEffect, useRef } from 'react';
import type { SpeedInsightsProps } from '../types';
import { computeRoute, injectSpeedInsights } from '../generic';

export function SpeedInsights(
  props: SpeedInsightsProps & {
    framework?: string;
  },
): JSX.Element | null {
  useEffect(() => {
    if (props.beforeSend) {
      window.si?.('beforeSend', props.beforeSend);
    }
  }, [props.beforeSend]);

  const setScriptRoute = useRef<((path: string) => void) | null>(null);
  useEffect(() => {
    if (!setScriptRoute.current) {
      const script = injectSpeedInsights({
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

export { computeRoute };
