import '@testing-library/jest-dom';

beforeEach(() => {
  if ('document' in global) {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- there is an HTML element */
    document.querySelector('html')!.innerHTML = '';
  }
});
