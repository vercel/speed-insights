'use client';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights
          scriptSrc="https://analytics-script-git-damien-aly-1231-start-tracking-inp-fc3c21.vercel.sh/v1/speed-insights/script.js"
          endpoint="https://vitals.vercel-insights.com/v2/vitals?dsn=AJzRCMjgFYKicMYWe1pdJVZ6RsX"
        />
      </body>
    </html>
  );
}
