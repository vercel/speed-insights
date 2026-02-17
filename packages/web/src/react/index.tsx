'use client';

import { useEffect, useRef } from 'react';
import { computeRoute, injectSpeedInsights } from '../generic';
import type { SpeedInsightsProps } from '../types';
import { getBasePath, getConfigString } from './utils';

export function SpeedInsights(
  props: SpeedInsightsProps & {
    framework?: string;
    basePath?: string;
    configString?: string; // Internal only, passed from framework wrappers
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
      const script = injectSpeedInsights(
        {
          framework: props.framework ?? 'react',
          basePath: props.basePath ?? getBasePath(),
          ...props,
        },
        props.configString ?? getConfigString(),
      );
      if (script) {
        setScriptRoute.current = script.setRoute;
      }
    }
  }, [props]);
  useEffect(() => {
    if (setScriptRoute.current && props.route) {
      setScriptRoute.current(props.route);
    }
  }, [props.route]);

  return null;
}

export { computeRoute };
