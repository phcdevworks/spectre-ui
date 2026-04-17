import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const readDistCss = (fileName: string): string =>
  fs.readFileSync(path.join(distDir, fileName), 'utf8');

const CUSTOM_PROPERTY_DECLARATION_PATTERN = /(^|[{\s;])(--[A-Za-z0-9_-]+)\s*:/gm;

const ENTRYPOINT_CONTRACTS = [
  {
    fileName: 'base.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-text-on-page-default:'],
    bundleMarkers: ['@layer base', 'body {', ':focus-visible {'],
    forbiddenMarkers: ['@layer components', '@layer utilities', '.sp-btn {', '.sp-stack {'],
  },
  {
    fileName: 'components.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-button-primary-bg:'],
    bundleMarkers: ['@layer components', '.sp-btn {', '.sp-card {'],
    forbiddenMarkers: ['@layer base', '@layer utilities', 'body {', ':focus-visible {', '.sp-stack {', '@keyframes fade-in'],
  },
  {
    fileName: 'utilities.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-layout-stack-gap-md:'],
    bundleMarkers: ['@layer utilities', '.sp-stack {', '@keyframes fade-in'],
    forbiddenMarkers: ['@layer base', '@layer components', 'body {', ':focus-visible {', '.sp-btn {', '.sp-card {'],
  },
] as const;

describe('dist CSS entrypoints', () => {
  it('ships standalone exported bundles with enforced entrypoint boundaries', () => {
    ENTRYPOINT_CONTRACTS.forEach(({ fileName, standaloneTokens, bundleMarkers, forbiddenMarkers }) => {
      const css = readDistCss(fileName);

      standaloneTokens.forEach((token) => {
        expect(
          css,
          `${fileName} is missing standalone token context: ${token}`
        ).toContain(token);
      });

      bundleMarkers.forEach((marker) => {
        expect(
          css,
          `${fileName} is missing its bundle-specific contract marker: ${marker}`
        ).toContain(marker);
      });

      forbiddenMarkers.forEach((marker) => {
        expect(
          css,
          `${fileName} leaked cross-bundle marker: ${marker}`
        ).not.toContain(marker);
      });
    });
  });

  it('allows only Spectre-prefixed CSS variables in exported bundles', () => {
    ENTRYPOINT_CONTRACTS.forEach(({ fileName }) => {
      const css = readDistCss(fileName);
      const nonSpectreVariables = new Set<string>();

      for (const match of css.matchAll(CUSTOM_PROPERTY_DECLARATION_PATTERN)) {
        const variableName = match[2];

        if (!variableName.startsWith('--sp-')) {
          nonSpectreVariables.add(variableName);
        }
      }

      expect(
        [...nonSpectreVariables],
        nonSpectreVariables.size === 0
          ? `${fileName} should only declare Spectre-prefixed CSS variables.`
          : `${fileName} contains non-Spectre CSS variables: ${[...nonSpectreVariables].join(', ')}`
      ).toEqual([]);
    });
  });
});
