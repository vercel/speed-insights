export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getConnectionSpeed(): string {
  let speed = '';
  if ('connection' in navigator) {
    const connection = navigator.connection as never as
      | {
          effectiveType?: string;
        }
      | undefined;
    if (connection?.effectiveType) {
      speed = connection.effectiveType;
    }
  }
  return speed;
}
