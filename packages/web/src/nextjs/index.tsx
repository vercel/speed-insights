import React from 'react';
import { SpeedInsights as SpeedInsightsScript } from '../react';
import type { SpeedInsightsProps } from '../types';
import { useDynamicPath } from './utils';

export function SpeedInsights(
  props: Omit<SpeedInsightsProps, 'dynamicPath'>,
): JSX.Element {
  const dynamicPath = useDynamicPath();

  return (
    <SpeedInsightsScript {...(dynamicPath && { dynamicPath })} {...props} />
  );
}
