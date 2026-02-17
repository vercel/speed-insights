import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { SpeedInsightsProps } from '../types';
import { SpeedInsights } from '.';

describe('<SpeedInsights />', () => {
  const envSave = { ...process.env };

  afterEach(() => {
    process.env = { ...envSave };
    cleanup();
  });

  describe.each([
    {
      mode: 'development',
      file: 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js',
    },
    {
      mode: 'production',
      file: 'http://localhost:3000/_vercel/speed-insights/script.js',
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

    it('uses config string', () => {
      const endpoint = `/_vercel-${Math.random()}`;
      const sampleRate = Math.round(Math.random() * 10) / 10;
      const scriptSrc = `http://acme.org/_vercel/${Math.random()}`;
      process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG = JSON.stringify(
        {
          speedInsights: {
            endpoint,
            sampleRate,
            scriptSrc,
          },
        },
      );
      render(<SpeedInsights />);

      const scripts = document.getElementsByTagName('script');
      expect(scripts).toHaveLength(1);

      const script = document.head.querySelector('script');
      expect(script).toBeDefined();
      expect(script?.src).toEqual(scriptSrc);
      expect(script).toHaveAttribute('defer');
      expect(script).toHaveAttribute('data-endpoint', endpoint);
      expect(script).toHaveAttribute('data-sample-rate', sampleRate.toString());
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

    it('does not change beforeSend when undefined', () => {
      const beforeSend: Required<SpeedInsightsProps>['beforeSend'] = (event) =>
        event;
      const { rerender } = render(<SpeedInsights beforeSend={beforeSend} />);

      expect(window.siq?.[0]).toEqual(['beforeSend', beforeSend]);
      expect(window.siq).toHaveLength(1);
      window.siq?.splice(0, 1);

      rerender(<SpeedInsights />);
      expect(window.siq).toHaveLength(0);
    });
  });
});
