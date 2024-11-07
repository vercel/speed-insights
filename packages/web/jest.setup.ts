import { beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';
// Adds helpers like `.toHaveAttribute`
import '@testing-library/jest-dom/jest-globals';

beforeEach(() => {
  if ('document' in global) {
    const html = document.querySelector('html');
    if (html) {
      html.innerHTML = '';
    }
  }
});
