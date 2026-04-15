import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const readDistCss = (fileName: string): string =>
  fs.readFileSync(path.join(distDir, fileName), 'utf8');

const ENTRYPOINT_CONTRACTS = [
  {
    fileName: 'base.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-text-on-page-default:'],
    bundleMarkers: ['@layer base', 'body {', ':focus-visible {'],
  },
  {
    fileName: 'components.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-button-primary-bg:'],
    bundleMarkers: ['@layer components', '.sp-btn {', '.sp-card {'],
  },
  {
    fileName: 'utilities.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-layout-stack-gap-md:'],
    bundleMarkers: ['@layer utilities', '.sp-stack {', '@keyframes fade-in'],
  },
] as const;

describe('dist CSS entrypoints', () => {
  it('ships standalone exported bundles with entrypoint-specific contract markers', () => {
    ENTRYPOINT_CONTRACTS.forEach(({ fileName, standaloneTokens, bundleMarkers }) => {
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
    });
  });
});
