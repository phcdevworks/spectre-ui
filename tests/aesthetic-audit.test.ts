import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
// Replace this import path with the real generated token export your package exposes.
import tokens from '@phcdevworks/spectre-tokens';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const componentsCssPath = path.join(projectRoot, 'src', 'styles', 'components.css');
const cssContent = fs.readFileSync(componentsCssPath, 'utf8');

function getCssCustomProperty(name: string): string | undefined {
  const match = cssContent.match(new RegExp(`${escapeRegExp(name)}\\s*:\\s*([^;]+);`));
  return match?.[1]?.trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getLuminance(hex: string): number | undefined {
  const normalized = normalizeHex(hex);
  if (!normalized) return undefined;

  const r = parseInt(normalized.slice(1, 3), 16) / 255;
  const g = parseInt(normalized.slice(3, 5), 16) / 255;
  const b = parseInt(normalized.slice(5, 7), 16) / 255;

  const channels = [r, g, b].map(v =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function getContrastRatio(hexA: string, hexB: string): number | undefined {
  const lumA = getLuminance(hexA);
  const lumB = getLuminance(hexB);

  if (lumA === undefined || lumB === undefined) return undefined;

  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);

  return (lighter + 0.05) / (darker + 0.05);
}

function normalizeHex(value: string): string | undefined {
  if (!value.startsWith('#')) return undefined;
  if (value.length === 7) return value.toLowerCase();
  if (value.length === 4) {
    const r = value[1];
    const g = value[2];
    const b = value[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return undefined;
}

/**
 * Transitional token resolver
 *
 * Prefer mapping directly from a generated token export when available.
 * This helper keeps the lookup isolated so it can be replaced cleanly.
 */
function resolveTokenReferenceToHex(reference: string): string | undefined {
  const tokenMap: Record<string, string | undefined> = {
    'var(--sp-color-neutral-900)': getNestedToken(tokens, ['colors', 'neutral', '900']),
    'var(--sp-color-neutral-50)': getNestedToken(tokens, ['colors', 'neutral', '50']),
    'var(--sp-color-brand-600)': getNestedToken(tokens, ['colors', 'brand', '600']),
    'var(--sp-color-accent-600)': getNestedToken(tokens, ['colors', 'accent', '600']),
    'var(--sp-color-info-600)': getNestedToken(tokens, ['colors', 'info', '600']),
    'var(--sp-color-warning-500)': getNestedToken(tokens, ['colors', 'warning', '500']),
    'var(--sp-color-warning-600)': getNestedToken(tokens, ['colors', 'warning', '600']),
    'var(--sp-surface-card)': getNestedToken(tokens, ['surface', 'card']),
    'var(--sp-text-on-surface-default)': getNestedToken(tokens, ['text', 'onSurface', 'default']),
    // Component tokens
    'var(--sp-button-cta-bg)': getNestedToken(tokens, ['buttons', 'cta', 'bg']),
    'var(--sp-button-cta-text)': getNestedToken(tokens, ['buttons', 'cta', 'text']),
    'var(--sp-button-text-on-primary)': getNestedToken(tokens, ['component', 'button', 'textOnPrimary']),
  };

  const resolved = tokenMap[reference];
  return typeof resolved === 'string' ? resolved : undefined;
}

function getNestedToken(source: unknown, pathParts: string[]): string | undefined {
  let current: unknown = source;

  for (const part of pathParts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  // Handle { value: "..." } structure found in raw token definitions
  if (current && typeof current === 'object' && 'value' in current) {
    current = (current as { value: unknown }).value;
  }

  // Handle "{colors.path.to.token}" references by recursing
  if (typeof current === 'string' && current.startsWith('{') && current.endsWith('}')) {
    const referencePath = current.slice(1, -1).split('.');
    return getNestedToken(source, referencePath);
  }

  return typeof current === 'string' ? current : undefined;
}

describe('design contract guard', () => {
  describe('semantic role guard', () => {
    it('keeps CTA roles aligned with the upstream CTA token alias', () => {
      const ctaBg = getCssCustomProperty('--sp-component-button-cta-bg');

      expect(ctaBg).toBe('var(--sp-button-cta-bg)');
    });
  });

  describe('brand pairing guard', () => {
    it('keeps featured pricing roles aligned with upstream token semantics', () => {
      const featuredBg = getCssCustomProperty('--sp-component-pricing-card-featured-bg');
      const featuredText = getCssCustomProperty('--sp-component-pricing-card-featured-text');
      const featuredBadgeBg = getCssCustomProperty('--sp-component-pricing-card-featured-badge-bg');

      expect(featuredBg).toBe('var(--sp-color-info-600)');
      expect(featuredText).toBe('var(--sp-button-text-on-primary)');
      expect(featuredBadgeBg).toBe('var(--sp-color-warning-500)');
    });
  });

  describe('contrast compliance guard', () => {
    it('enforces minimum contrast for key component roles', () => {
      const roles = [
        {
          name: 'Pricing Card Featured',
          background: getCssCustomProperty('--sp-component-pricing-card-featured-bg'),
          foreground: getCssCustomProperty('--sp-component-pricing-card-featured-text'),
          minContrast: 4.5,
        },
        {
          name: 'CTA Button',
          background: getCssCustomProperty('--sp-component-button-cta-bg'),
          foreground: getCssCustomProperty('--sp-component-button-cta-text'),
          minContrast: 4.5,
        },
      ];

      for (const role of roles) {
        expect(role.background, `Missing background for ${role.name}`).toBeDefined();
        expect(role.foreground, `Missing foreground for ${role.name}`).toBeDefined();

        if (!role.background || !role.foreground) continue;

        const bgHex = resolveTokenReferenceToHex(role.background);
        const fgHex = resolveTokenReferenceToHex(role.foreground);

        expect(bgHex, `Could not resolve background token for ${role.name}: ${role.background}`).toBeDefined();
        expect(fgHex, `Could not resolve foreground token for ${role.name}: ${role.foreground}`).toBeDefined();

        if (!bgHex || !fgHex) continue;

        const contrast = getContrastRatio(bgHex, fgHex);

        expect(contrast, `Could not compute contrast for ${role.name}`).toBeDefined();

        if (contrast === undefined) continue;

        expect(
          contrast,
          `${role.name} contrast ratio is ${contrast.toFixed(2)}:1, below ${role.minContrast}:1`
        ).toBeGreaterThanOrEqual(role.minContrast);
      }
    });
  });
});
