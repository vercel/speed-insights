import React from 'react';
import { SpeedInsights as SpeedInsightsScript } from '../react';
import type { SpeedInsightsProps } from '../types';
import { getBasePath, getConfigString, useRoute } from './utils';

export function SpeedInsights(
  props: Omit<SpeedInsightsProps, 'route'>,
): JSX.Element {
  return (
    <SpeedInsightsScript
      route={useRoute()}
      {...props}
      basePath={getBasePath()}
      configString={getConfigString()}
      framework="remix"
    />
  );
}
