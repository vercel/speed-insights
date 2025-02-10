'use client';

import React, { Suspense } from 'react';
import { SpeedInsights as SpeedInsightsScript } from '../react';
import type { SpeedInsightsProps } from '../types';
import { getBasePath, useRoute } from './utils';

type Props = Omit<SpeedInsightsProps, 'route'>;

function SpeedInsightsComponent(props: Props): React.ReactElement {
  const route = useRoute();

  return (
    <SpeedInsightsScript
      route={route}
      {...props}
      framework="next"
      basePath={getBasePath()}
    />
  );
}

export function SpeedInsights(props: Props): null {
  // Because of incompatible types between ReactNode in React 19 and React 18 we return null (which is also what we render)
  return (
    <Suspense fallback={null}>
      <SpeedInsightsComponent {...props} />
    </Suspense>
  ) as never;
}
