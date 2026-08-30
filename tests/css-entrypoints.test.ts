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
    // "Host — Custom Element Display Contract". Raised again 2026-08-30
    // (base.css grew to 47305 bytes) when the spectre-tokens dependency
    // range was bumped to ^4.7.0 — an unrelated, already-published
    // dependency update adding layout.container.maxWidthWide,
    // component.card.padding, and the surface.inverse/on-inverse semantic
    // role set, not a regression here. Raised again 2026-08-30 (base.css
    // grew to 48029 bytes) for the bare sp-section display: block host
    // rule (TODO.md "Requested by Downstream" / "Section — block-level
    // custom-element host contract") — a deliberate, scoped increase, not
    // a regression. Raised again 2026-08-30 (base.css grew to 48313 bytes)
    // to fold sp-stack into that same bare-tag rule (TODO.md "Host —
    // extend the block-level display contract to sp-stack") — a
    // deliberate, scoped increase, not a regression.
    maxBytes: 48500,
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
    // published dependency update, not a regression here. Raised again
    // 2026-08-30 (components.css grew to 150565 bytes) when the
    // spectre-tokens dependency range was bumped to ^4.7.0 — an unrelated,
    // already-published dependency update adding
    // layout.container.maxWidthWide, component.card.padding, and the
    // surface.inverse/on-inverse semantic role set, not a regression here.
    // Raised again 2026-08-30 (components.css grew to 151005 bytes) for the
    // .sp-card--padded-sm/-md/-lg size scale sourced from
    // component.card.padding (TODO.md "Requested by Downstream" / "Card —
    // padding size scale") — a deliberate, scoped increase, not a
    // regression. Raised again 2026-08-30 (components.css grew to 154255
    // bytes) for the inverse Button/Badge variants and Text on-inverse
    // color variants (TODO.md "Requested by Downstream" / "On-dark/inverse
    // surface role") — a deliberate, scoped increase, not a regression.
    maxBytes: 154500,
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
    // "Prose — Editor Content Recipe"). Raised again 2026-08-30
    // (utilities.css grew to 349756 bytes) for the .sp-shadow-inset-{sm,md,
    // lg,xl,2xl} utility scale generated from the published
    // --sp-shadow-inset-* tokens (TODO.md "Shadow — deliver the inset token
    // scale as utilities") — a deliberate, scoped increase, not a
    // regression. Raised again 2026-08-30 (utilities.css grew to 355757
    // bytes) when the spectre-tokens dependency range was bumped to ^4.7.0
    // — an unrelated, already-published dependency update adding
    // layout.container.maxWidthWide, component.card.padding, and the
    // surface.inverse/on-inverse semantic role set to the standalone
    // token block this bundle embeds, not a regression here. Raised again
    // 2026-08-30 (utilities.css grew to 356168 bytes) when .sp-section
    // moved from @layer utilities to @layer components so the standalone
    // sp-py-*/sp-pt-*/sp-pb-* spacing utilities win by layer precedence
    // (TODO.md "Requested by Downstream" / "Section — spacing utility
    // override of section padding") — a deliberate, scoped increase, not a
    // regression. Raised again 2026-08-30 (utilities.css grew to 356525
    // bytes) for .sp-container--max-width-wide (TODO.md "Requested by
    // Downstream" / "Container — wide max-width variant") — a deliberate,
    // scoped increase, not a regression. Raised again 2026-08-30
    // (utilities.css grew to 357032 bytes) for .sp-link--on-inverse
    // (TODO.md "Requested by Downstream" / "On-dark/inverse surface role")
    // — a deliberate, scoped increase, not a regression. Raised again
    // 2026-08-30 (utilities.css grew to 357390 bytes) for
    // .sp-surface--inverse, the background half of the same on-dark/
    // inverse surface role — a deliberate, scoped increase, not a
    // regression.
    maxBytes: 357600,
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

  it('sets display: block unconditionally on the bare sp-section/sp-stack hosts, without widening the attribute-scoped contract for unrelated inline components', () => {
    // Regression for TODO.md "Requested by Downstream" / "Section —
    // block-level custom-element host contract" and "Host — extend the
    // block-level display contract to sp-stack": neither tag has a
    // reflected full-width/full-height attribute to opt into the rule
    // above, so each needs an unconditional bare-tag rule, unlike every
    // host in fullAttributeHosts. Per the CSS spec, width/max-width/height
    // have no effect on `display: inline` boxes — the UA default a custom
    // element gets before this rule (or spectre-components' post-hydration
    // connectedCallback fallback) applies — so an unconditional
    // `display: block` here is what makes a host-level max-width or
    // background take effect pre-hydration, including on a server-rendered
    // element the client never upgrades.
    const css = readDistCss('base.css');
    const root = postcss.parse(css, { from: path.join(distDir, 'base.css') });

    const bareBlockHosts = ['sp-section', 'sp-stack'] as const;

    let bareHostRule: import('postcss').Rule | undefined;
    root.walkRules((rule) => {
      const selectors = rule.selector.split(',').map((s) => s.trim());
      if (bareBlockHosts.every((tag) => selectors.includes(tag))) {
        bareHostRule = rule;
      }
    });

    expect(bareHostRule).toBeDefined();
    expect(bareHostRule?.toString()).toContain('display: block');

    // sp-hstack is a direction variant of the same sp-stack custom element,
    // not a distinct registered tag, so it must not appear as its own
    // selector anywhere in this stylesheet.
    expect(css).not.toMatch(/(?<![\w[-])sp-hstack\s*[,{[]/);

    // The bare host rule must stay scoped to these two tags — it must not
    // fold into (or widen) the attribute-scoped full-width/full-height
    // selector list, and no other host in that list should gain a matching
    // bare-tag rule as a side effect.
    let attributeScopedRule: import('postcss').Rule | undefined;
    root.walkRules((rule) => {
      if (rule.selector.includes('sp-card[full-height]')) {
        attributeScopedRule = rule;
      }
    });
    bareBlockHosts.forEach((tag) => {
      expect(attributeScopedRule?.selector).not.toContain(tag);
    });
  });
});
