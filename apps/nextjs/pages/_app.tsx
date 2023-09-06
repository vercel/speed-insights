import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights token="wAkFEOQVq9CTI5O4445EXoD5w1Y" sampleRate={0.5} />
    </>
  );
}
