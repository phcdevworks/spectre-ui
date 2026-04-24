import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as recipes from '@phcdevworks/spectre-ui';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '..', 'ui-contract.manifest.json'), 'utf8'),
) as {
  recipeFamilies: Record<
    string,
    {
      fn: string;
      variants?: string[];
      sizes?: string[];
      states?: string[];
    }
  >;
};

describe('recipe family parity (manifest → live output)', () => {
  for (const [family, spec] of Object.entries(manifest.recipeFamilies)) {
    const fn = (recipes as Record<string, unknown>)[spec.fn];

    it(`${family}: ${spec.fn} is exported and callable`, () => {
      expect(typeof fn, `${spec.fn} must be a function`).toBe('function');
    });

    if (spec.variants) {
      for (const variant of spec.variants) {
        it(`${family}: variant "${variant}" produces a non-empty class string`, () => {
          const call = fn as (opts: Record<string, unknown>) => string;
          const result = call({ variant });
          expect(typeof result).toBe('string');
          expect(result.length, `variant "${variant}" returned empty string`).toBeGreaterThan(0);
          expect(result, `variant "${variant}" class not present in output`).toContain(`--${variant}`);
        });
      }
    }

    if (spec.sizes) {
      for (const size of spec.sizes) {
        it(`${family}: size "${size}" produces a non-empty class string`, () => {
          const call = fn as (opts: Record<string, unknown>) => string;
          const result = call({ size });
          expect(typeof result).toBe('string');
          expect(result.length, `size "${size}" returned empty string`).toBeGreaterThan(0);
          expect(result, `size "${size}" class not present in output`).toContain(`--${size}`);
        });
      }
    }

    if (spec.states) {
      for (const state of spec.states) {
        it(`${family}: state "${state}" produces a non-empty class string`, () => {
          const call = fn as (opts: Record<string, unknown>) => string;
          const result = call({ state });
          expect(typeof result).toBe('string');
          expect(result.length, `state "${state}" returned empty string`).toBeGreaterThan(0);
          if (state !== 'default') {
            expect(result, `state "${state}" class not present in output`).toContain(`--${state}`);
          }
        });
      }
    }
  }
});
