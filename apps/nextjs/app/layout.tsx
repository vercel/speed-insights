'use client';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <SpeedInsights token="wAkFEOQVq9CTI5O4445EXoD5w1Y" />
      <body>{children}</body>
    </html>
  );
}
