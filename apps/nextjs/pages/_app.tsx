import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';
import { SPEED_INSIGHTS_ID } from '../config';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights sampleRate={0.5} />
    </>
  );
}
