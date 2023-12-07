import React, { Suspense } from 'react';
import { SpeedInsights as SpeedInsightsScript } from '../react';
import type { SpeedInsightsProps } from '../types';
import { useRoute } from './utils';

type Props = Omit<SpeedInsightsProps, 'route'>;

function SpeedInsightsComponent(props: Props): React.ReactElement {
  const route = useRoute();

  return <SpeedInsightsScript route={route} {...props} framework="next" />;
}

export function SpeedInsights(props: Props): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <SpeedInsightsComponent {...props} />
    </Suspense>
  );
}
