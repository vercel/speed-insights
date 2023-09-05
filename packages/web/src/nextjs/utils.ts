'use client';
import { useParams, usePathname } from 'next/navigation';

export const useDynamicPath = (): string | null => {
  const params = useParams();
  const path = usePathname();

  return computePathname(path, params);
};

// Refined version from dvoytenko
// https://github.com/vercel/front/pull/25076
function computePathname(
  pathname: string | null,
  pathParams: Record<string, string | string[]> | null,
): string | null {
  if (pathname === null) {
    return null;
  }
  if (pathname === '' || !pathParams) {
    return pathname;
  }
  let result = pathname;
  for (const [key, valueOrArray] of Object.entries(pathParams)) {
    let value: string;
    let expr: string;
    if (Array.isArray(valueOrArray)) {
      // An array-based segment, e.g. "/[...slugs]".
      expr = `...${key}`;
      value = valueOrArray.join('/');
    } else {
      // A single dynamic segment, e.g. "/posts/[pid]".
      expr = key;
      value = valueOrArray;
    }
    if (!value) {
      continue;
    }
    let start = 0;
    while (start !== -1) {
      start = result.indexOf(`/${value}`, start);
      if (start !== -1) {
        const end = start + value.length + 2;
        if (
          end >= result.length ||
          result[end] === '/' ||
          result[end] === '?' ||
          result[end] === '#'
        ) {
          result = `${result.substring(
            0,
            start + 1,
          )}[${expr}]${result.substring(end)}`;
          break;
        }
        start += value.length + 1;
      }
    }
  }
  return result;
}
