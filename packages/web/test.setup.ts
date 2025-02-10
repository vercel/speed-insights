import { beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

beforeEach(() => {
  if (typeof window === 'undefined') return;
  // reset dom before each test
  const html = document.querySelector('html');
  if (html) {
    html.innerHTML = '';
  }
});
