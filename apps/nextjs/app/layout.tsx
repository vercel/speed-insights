'use client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SPEED_INSIGHTS_ID } from '../config';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <SpeedInsights token={SPEED_INSIGHTS_ID} />
      <body>{children}</body>
    </html>
  );
}
