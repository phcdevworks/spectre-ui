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
    bundleMarkers: ['@layer base', 'body {', ':focus-visible {', 'sp-card[full-height]'],
    forbiddenMarkers: ['@layer components {', '@layer utilities {', '.sp-btn {', '.sp-stack {'],
    // spectre-tokens Phase 11: independent component.footer semantic group
    // adds new CSS variables in default and dark modes — a deliberate,
    // scoped size increase, not a regression. See spectre-tokens TODO.md
    // Phase 11 P0/P1. Raised again 2026-08-19 (base.css grew to 41304 bytes)
    // when the spectre-tokens dependency range was bumped to ^4.5.0 (an
    // unrelated, already-published dependency update) and again for the new
    // custom-element host display:block rule for full-width/full-height —
    // both deliberate, scoped increases, not regressions. See TODO.md
    // "Host — Custom Element Display Contract".
    maxBytes: 42000,
  },
  {
    fileName: 'components.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-button-primary-bg:'],
    bundleMarkers: ['@layer components', '.sp-btn {', '.sp-card {'],
    forbiddenMarkers: ['@layer base {', '@layer utilities {', 'body {', ':focus-visible {', '.sp-stack {', '@keyframes fade-in'],
    // Phase 9: independent component.footer semantic contract adds Footer
    // anatomy classes (heading, muted text, links, divider, icon chip) and
    // drops the Nav-alias token reuse — a deliberate, scoped size increase,
    // not a regression. See TODO.md Phase 9. Raised again 2026-08-19
    // (components.css grew to 144564 bytes) when the spectre-tokens
    // dependency range was bumped to ^4.5.0 — an unrelated, already-
    // published dependency update, not a regression here.
    maxBytes: 145000,
  },
  {
    fileName: 'utilities.css',
    standaloneTokens: ['--sp-surface-page:', '--sp-layout-stack-gap-md:'],
    // .sp-stack / .sp-grid--gap-* / .sp-grid--column-gap-* / .sp-grid--row-gap-*
    // live inside a `@layer components` block within this same standalone
    // bundle — not imported from components.css — so the sp-gap-*/
    // sp-column-gap-*/sp-row-gap-* utility scale always wins on layer
    // precedence regardless of source order. See TODO.md "Layout — Spacing
    // Utility Override Of Layout Primitives".
    bundleMarkers: ['@layer base, components, utilities;', '@layer utilities', '@layer components {', '.sp-stack {', '@keyframes fade-in', '.sp-p-4 {', '.sp-flex {'],
    forbiddenMarkers: ['@layer base {', 'body {', ':focus-visible {', '.sp-btn {', '.sp-card {'],
    // Phase 7 P1: generated utility-class engine adds full palette (286
    // steps), spacing, radius, shadow, opacity, and z-index coverage plus
    // responsive variants — a deliberate, scoped size increase, not a
    // regression. See TODO.md Phase 7 P0/P1. Raised again 2026-08-18 when
    // responsive coverage extended from md/lg to the full sm/md/lg/xl/2xl
    // breakpoint scale (TODO.md "Decide whether to extend responsive
    // coverage"), which roughly doubled every responsive spacing/layout
    // class count; this is raw (unminified, ungzipped) size, and utility CSS
    // — near-total selector/declaration repetition — compresses far better
    // than typical CSS under gzip/brotli in transit. Raised again 2026-08-19
    // (utilities.css grew to 342018 bytes) for the sp-md-/sp-lg-grid-template--*
    // responsive variants (TODO.md "Grid — Responsive Explicit Template
    // Variants") plus the unrelated spectre-tokens ^4.5.0 bump — both
    // deliberate, scoped increases, not a regression. Raised again
    // 2026-08-20 (utilities.css grew to 344534 bytes) for the
    // sp-grid-template--fluid-fixed-*/sp-md-/sp-lg- variants (TODO.md
    // "Grid — Fluid Plus Equal Fixed Tracks Template"). Raised again
    // 2026-08-20 (utilities.css grew to 347668 bytes) for
    // sp-col-start-*/sp-md-/sp-lg- and sp-grid--align-* (TODO.md
    // "Grid — Cell Alignment And Column Start"). Raised again 2026-08-20
    // (utilities.css grew to 348868 bytes) for .sp-prose (TODO.md
    // "Prose — Editor Content Recipe").
    maxBytes: 349500,
  },
] as const;

const getEntryPointRules = (fileName: string) =>
  postcss.parse(readDistCss(fileName), { from: path.join(distDir, fileName) });

const isKeyframeRule = (rule: postcss.Rule): boolean => {
  let node: postcss.Node | undefined = rule.parent
  while (node) {
    if (node.type === 'atrule' && (node as postcss.AtRule).name === 'keyframes') return true
    node = node.parent
  }
  return false
}

const getRuleContext = (rule: postcss.Rule): string => {
  const contexts: string[] = [];
  let current = rule.parent;

  while (current) {
    if (current.type === 'atrule') {
      contexts.unshift(`@${current.name} ${current.params}`.trim());
    }
    current = current.parent;
  }

  return contexts.join(' > ');
};

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
      const selectorCounts = new Map<string, { count: number; selector: string }>();

      getEntryPointRules(fileName).walkRules((rule) => {
        if (isKeyframeRule(rule)) return;
        const context = getRuleContext(rule);

        rule.selectors.forEach((selector) => {
          const normalizedSelector = selector.trim();
          const key = context ? `${context} :: ${normalizedSelector}` : normalizedSelector;
          const existing = selectorCounts.get(key);
          selectorCounts.set(key, {
            selector: normalizedSelector,
            count: (existing?.count ?? 0) + 1,
          });
        });
      });

      const duplicates = [...selectorCounts.values()]
        .filter(({ count }) => count > 1)
        .map(({ selector, count }) => `${selector} (${count}x)`);

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
        if (isKeyframeRule(rule)) return;
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

  it('sets display: block on every full-width/full-height custom-element host, and nothing else', () => {
    // Regression for TODO.md "Host — Custom Element Display Contract": the
    // rule must be scoped by the reflected full-width/full-height attribute
    // (not a bare tag selector), so default (non-full) usage of these
    // elements stays at the UA default inline display.
    const css = readDistCss('base.css');
    const root = postcss.parse(css, { from: path.join(distDir, 'base.css') });

    const fullAttributeHosts = [
      ['sp-alert', 'full-width'],
      ['sp-avatar', 'full-width'],
      ['sp-badge', 'full-width'],
      ['sp-button', 'full-width'],
      ['sp-card', 'full-height'],
      ['sp-dropdown', 'full-width'],
      ['sp-footer', 'full-width'],
      ['sp-icon-box', 'full-width'],
      ['sp-input', 'full-width'],
      ['sp-modal', 'full-width'],
      ['sp-nav', 'full-width'],
      ['sp-pricing-card', 'full-height'],
      ['sp-select', 'full-width'],
      ['sp-tag', 'full-width'],
      ['sp-testimonial', 'full-height'],
      ['sp-textarea', 'full-width'],
      ['sp-toast', 'full-width'],
    ] as const;

    let matchedRule: import('postcss').Rule | undefined;
    root.walkRules((rule) => {
      if (rule.selector.includes('sp-card[full-height]')) {
        matchedRule = rule;
      }
    });

    expect(matchedRule).toBeDefined();
    expect(matchedRule?.toString()).toContain('display: block');

    fullAttributeHosts.forEach(([tag, attribute]) => {
      expect(matchedRule?.selector).toContain(`${tag}[${attribute}]`);
    });

    // A bare tag selector (no attribute qualifier) would force every
    // instance of these elements to display: block, including ordinary
    // inline usage (e.g. a badge inline with text) that never opts into
    // full-width/full-height — that regression is exactly what the
    // attribute-scoped selector avoids.
    fullAttributeHosts.forEach(([tag]) => {
      expect(css).not.toMatch(new RegExp(`(?<![\\w[-])${tag}\\s*[,{]`));
    });
  });
});
