import * as React from 'react';
import { afterEach, beforeEach, describe, it, expect } from '@jest/globals';
import { cleanup, render } from '@testing-library/react';
import type { SpeedInsightsProps } from '../types';
import { SpeedInsights } from '.';

describe('<SpeedInsights />', () => {
  afterEach(() => {
    cleanup();
  });

  describe.each([
    {
      mode: 'development',
      file: 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js',
    },
    {
      mode: 'production',
      file: 'http://localhost/_vercel/speed-insights/script.js',
    },
  ])('in $mode mode', ({ mode, file }) => {
    const env = process.env.NODE_ENV;
    beforeEach(() => {
      process.env.NODE_ENV = mode;
      window.si = undefined;
      window.siq = undefined;
    });

    afterEach(() => {
      process.env.NODE_ENV = env;
    });

    it('adds the script tag correctly', () => {
      render(<SpeedInsights />);

      const scripts = document.getElementsByTagName('script');
      expect(scripts).toHaveLength(1);

      const script = document.head.querySelector('script');
      expect(script).toBeDefined();
      expect(script?.src).toEqual(file);
      expect(script).toHaveAttribute('defer');
    });

    it('sets and changes beforeSend', () => {
      const beforeSend: Required<SpeedInsightsProps>['beforeSend'] = (event) =>
        event;
      const beforeSend2: Required<SpeedInsightsProps>['beforeSend'] = (event) =>
        event;
      const { rerender } = render(<SpeedInsights beforeSend={beforeSend} />);

      expect(window.siq?.[0]).toEqual(['beforeSend', beforeSend]);
      expect(window.siq).toHaveLength(1);
      window.siq?.splice(0, 1);

      rerender(<SpeedInsights beforeSend={beforeSend} />);
      expect(window.siq).toHaveLength(0);

      rerender(<SpeedInsights beforeSend={beforeSend2} />);
      expect(window.siq?.[0]).toEqual(['beforeSend', beforeSend2]);
      expect(window.siq).toHaveLength(1);
    });
  });
});
