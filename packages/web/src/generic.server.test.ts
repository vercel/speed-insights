/** @jest-environment node */
import { injectSpeedInsights } from './generic';

describe('injectSpeedInsights()', () => {
  it('does nothing in a server environment', () => {
    expect(injectSpeedInsights({})).toBe(null);
  });
});
