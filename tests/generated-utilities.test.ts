import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const generatedPath = path.join(projectRoot, 'src', 'styles', 'utilities.generated.css');
const tokensCssPath = path.join(
  projectRoot,
  'node_modules',
  '@phcdevworks',
  'spectre-tokens',
  'dist',
  'index.css',
);

const generatedCss = fs.readFileSync(generatedPath, 'utf8');
const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');

const countMatches = (source: string, pattern: RegExp): number =>
  Array.from(source.matchAll(pattern)).length;

describe('generated utility-class engine (Phase 7)', () => {
  it('is idempotent across regenerations (byte-stable)', () => {
    const before = fs.readFileSync(generatedPath, 'utf8');

    execFileSync('node', ['--experimental-strip-types', './scripts/build-utilities.ts'], {
      cwd: projectRoot,
      stdio: 'pipe',
    });

    const after = fs.readFileSync(generatedPath, 'utf8');

    // restore, since this test should not depend on execution order relative
    // to the build step and must not leave a dirty working tree behind.
    fs.writeFileSync(generatedPath, before, 'utf8');

    expect(after).toBe(before);
  });

  it('produces exactly one utility class per published --sp-space-* step', () => {
    const spaceSteps = new Set(
      Array.from(tokensCss.matchAll(/--sp-space-([a-z0-9]+):/g), (m) => m[1]),
    );

    for (const step of spaceSteps) {
      const count = countMatches(generatedCss, new RegExp(`\\.sp-p-${step} \\{`, 'g'));
      expect(count, `.sp-p-${step} should be generated exactly once`).toBe(1);
    }
  });

  it('produces text/bg/border utilities for every published palette hue and step', () => {
    const paletteEntries = Array.from(
      tokensCss.matchAll(/--sp-color-palette-([a-z]+)-([0-9]+):/g),
      (m) => [m[1], m[2]] as const,
    );

    expect(paletteEntries.length).toBeGreaterThan(0);

    for (const [hue, step] of paletteEntries) {
      for (const axis of ['text', 'bg', 'border']) {
        const count = countMatches(generatedCss, new RegExp(`\\.sp-${axis}-${hue}-${step} \\{`, 'g'));
        expect(count, `.sp-${axis}-${hue}-${step} should be generated exactly once`).toBe(1);
      }
    }
  });

  it('produces exactly one utility class per published --sp-radius-*, --sp-shadow-*, --sp-opacity-*, and --sp-z-index-* step', () => {
    const groups: Array<[string, string, RegExp]> = [
      ['radius', 'rounded', /--sp-radius-([a-z0-9]+):/g],
      ['shadow', 'shadow', /--sp-shadow-([a-z0-9]+):/g],
      ['opacity', 'opacity', /--sp-opacity-([a-z0-9]+):/g],
      ['z-index', 'z', /--sp-z-index-([a-z0-9]+):/g],
    ];

    for (const [, prefix, tokenPattern] of groups) {
      const steps = new Set(Array.from(tokensCss.matchAll(tokenPattern), (m) => m[1]));
      expect(steps.size).toBeGreaterThan(0);

      for (const step of steps) {
        const count = countMatches(generatedCss, new RegExp(`\\.sp-${prefix}-${step} \\{`, 'g'));
        expect(count, `.sp-${prefix}-${step} should be generated exactly once`).toBe(1);
      }
    }
  });

  it('generates md/lg responsive spacing variants using the sp-{breakpoint}-{property}-{step} separator', () => {
    expect(generatedCss).toMatch(/\.sp-md-p-4\s*\{/);
    expect(generatedCss).toMatch(/\.sp-lg-p-4\s*\{/);
    expect(generatedCss).toMatch(/\.sp-md-gap-8\s*\{/);
  });

  it('generates the evidence-backed layout, sizing, positioning, and overflow families', () => {
    const expectedClasses = [
      'block',
      'flex',
      'grid',
      'hidden',
      'flex-row',
      'flex-col',
      'flex-wrap',
      'flex-1',
      'justify-between',
      'justify-center',
      'items-center',
      'self-start',
      'relative',
      'absolute',
      'inset-0',
      'w-auto',
      'w-full',
      'w-fit',
      'max-w-full',
      'h-auto',
      'h-full',
      'overflow-hidden',
      'overflow-y-auto',
      'whitespace-nowrap',
      'text-center',
      'mx-auto',
      'mt-auto',
    ];

    for (const className of expectedClasses) {
      expect(generatedCss).toMatch(new RegExp(`\\.sp-${className}\\s*\\{`));
    }
  });

  it('generates md/lg responsive layout variants using the established prefix syntax', () => {
    expect(generatedCss).toMatch(/\.sp-md-flex\s*\{/);
    expect(generatedCss).toMatch(/\.sp-lg-grid\s*\{/);
    expect(generatedCss).toMatch(/\.sp-md-justify-between\s*\{/);
    expect(generatedCss).toMatch(/\.sp-lg-w-full\s*\{/);
    expect(generatedCss).toMatch(/\.sp-lg-mx-auto\s*\{/);
  });

  it('declares deterministic cascade-layer precedence before utility rules', () => {
    const orderIndex = generatedCss.indexOf('@layer base, components, utilities;');
    const utilitiesIndex = generatedCss.indexOf('@layer utilities {');

    expect(orderIndex).toBeGreaterThanOrEqual(0);
    expect(utilitiesIndex).toBeGreaterThan(orderIndex);
  });

  it('bakes only published --sp-breakpoint-* literal values into generated @media blocks', () => {
    const breakpointTokenRegex = /--sp-breakpoint-([a-z0-9]+):\s*([0-9]+px)/g;
    const publishedBreakpoints = new Map(
      Array.from(tokensCss.matchAll(breakpointTokenRegex), (m) => [m[1], m[2]] as const),
    );

    expect(generatedCss).toContain(`@media (min-width: ${publishedBreakpoints.get('md')})`);
    expect(generatedCss).toContain(`@media (min-width: ${publishedBreakpoints.get('lg')})`);

    const mediaFeatureQueryRegex = /@media\s*\(([^)]*)\)/g;
    const publishedValues = new Set(publishedBreakpoints.values());

    for (const match of generatedCss.matchAll(mediaFeatureQueryRegex)) {
      for (const valueMatch of match[1].matchAll(/([0-9]+px)/g)) {
        expect(publishedValues.has(valueMatch[1])).toBe(true);
      }
    }
  });

  it('does not duplicate any generated selector', () => {
    const selectorRegex = /^\s{2,4}(\.sp-[a-z0-9-]+)\s*\{/gm;
    const counts = new Map<string, number>();

    for (const match of generatedCss.matchAll(selectorRegex)) {
      counts.set(match[1], (counts.get(match[1]) ?? 0) + 1);
    }

    const duplicates = [...counts.entries()].filter(([, count]) => count > 1);

    expect(duplicates, `Duplicate generated selectors: ${duplicates.map(([s]) => s).join(', ')}`).toHaveLength(0);
  });
});
