import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const readDistCss = (fileName: string): string =>
  fs.readFileSync(path.join(distDir, fileName), 'utf8');

const CUSTOM_PROPERTY_DECLARATION_PATTERN = /(^|[{\s;])(--[A-Za-z0-9_-]+)\s*:/gm;
const ALLOWED_SHARED_SELECTORS = new Set([':root', ':root[data-spectre-theme="dark"]']);

const ENTRYPOINT_CONTRACTS = [
  {
    fileName: 'base.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-text-on-page-default:'],
    bundleMarkers: ['@layer base', 'body {', ':focus-visible {'],
    forbiddenMarkers: ['@layer components', '@layer utilities', '.sp-btn {', '.sp-stack {'],
    maxBytes: 20000,
  },
  {
    fileName: 'components.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-button-primary-bg:'],
    bundleMarkers: ['@layer components', '.sp-btn {', '.sp-card {'],
    forbiddenMarkers: ['@layer base', '@layer utilities', 'body {', ':focus-visible {', '.sp-stack {', '@keyframes fade-in'],
    maxBytes: 60000,
  },
  {
    fileName: 'utilities.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-layout-stack-gap-md:'],
    bundleMarkers: ['@layer utilities', '.sp-stack {', '@keyframes fade-in'],
    forbiddenMarkers: ['@layer base', '@layer components', 'body {', ':focus-visible {', '.sp-btn {', '.sp-card {'],
    maxBytes: 24000,
  },
] as const;

const getEntryPointRules = (fileName: string) =>
  postcss.parse(readDistCss(fileName), { from: path.join(distDir, fileName) });

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

  it('keeps exported bundles within their size budgets', () => {
    ENTRYPOINT_CONTRACTS.forEach(({ fileName, maxBytes }) => {
      const cssSize = Buffer.byteLength(readDistCss(fileName), 'utf8');

      expect(
        cssSize,
        `${fileName} exceeded its size budget: ${cssSize} bytes > ${maxBytes} bytes`
      ).toBeLessThanOrEqual(maxBytes);
    });
  });

  it('does not repeat selectors within the same exported bundle', () => {
    ENTRYPOINT_CONTRACTS.forEach(({ fileName }) => {
      const selectorCounts = new Map<string, number>();

      getEntryPointRules(fileName).walkRules((rule) => {
        rule.selectors.forEach((selector) => {
          const normalizedSelector = selector.trim();
          selectorCounts.set(
            normalizedSelector,
            (selectorCounts.get(normalizedSelector) ?? 0) + 1,
          );
        });
      });

      const duplicates = [...selectorCounts.entries()]
        .filter(([, count]) => count > 1)
        .map(([selector, count]) => `${selector} (${count}x)`);

      expect(
        duplicates,
        duplicates.length === 0
          ? `${fileName} should not repeat selectors.`
          : `${fileName} contains duplicate selectors:\n- ${duplicates.join('\n- ')}`
      ).toEqual([]);
    });
  });

  it('does not repeat selector blocks across exported bundles beyond shared token roots', () => {
    const selectorToFiles = new Map<string, Set<string>>();

    ENTRYPOINT_CONTRACTS.forEach(({ fileName }) => {
      getEntryPointRules(fileName).walkRules((rule) => {
        rule.selectors.forEach((selector) => {
          const normalizedSelector = selector.trim();
          if (ALLOWED_SHARED_SELECTORS.has(normalizedSelector)) return;

          if (!selectorToFiles.has(normalizedSelector)) {
            selectorToFiles.set(normalizedSelector, new Set());
          }

          selectorToFiles.get(normalizedSelector)?.add(fileName);
        });
      });
    });

    const duplicatesAcrossBundles = [...selectorToFiles.entries()]
      .filter(([, files]) => files.size > 1)
      .map(([selector, files]) => `${selector} (${[...files].sort().join(', ')})`);

    expect(
      duplicatesAcrossBundles,
      duplicatesAcrossBundles.length === 0
        ? 'Expected selector blocks to remain unique to their exported bundle.'
        : `Selectors repeated across exported bundles:\n- ${duplicatesAcrossBundles.join('\n- ')}`
    ).toEqual([]);
  });
});
