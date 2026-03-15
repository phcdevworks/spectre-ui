import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * Aesthetic Guard (The "Shit Test")
 * 
 * This test scans the component role mappings in Layer 2 to ensure 
 * we aren't creating visually offensive or unreadable combinations 
 * using the design tokens.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const componentsCssPath = path.join(projectRoot, 'src', 'styles', 'components.css');
const cssContent = fs.readFileSync(componentsCssPath, 'utf8');

// Rough luminance weights
const getLuminance = (hex: string) => {
  if (hex.length < 7) return undefined;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) return undefined;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrast = (l1: number, l2: number) => {
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
};

// Hardcoded token values for the audit (simulating the token layer knowledge)
// In a real prod environment, we'd pull these from the core.json of @phcdevworks/spectre-tokens
const TOKEN_VALUES: Record<string, string> = {
  'var(--sp-color-neutral-900)': '#0f172a',
  'var(--sp-color-neutral-50)': '#f8fafc',
  'var(--sp-color-brand-600)': '#2563eb',
  'var(--sp-color-info-600)': '#2563eb',
  'var(--sp-color-warning-500)': '#f59e0b',
  'var(--sp-color-accent-600)': '#7c3aed',
  'var(--sp-surface-card)': '#ffffff',
  'var(--sp-text-on-surface-default)': '#0f172a',
  // ... and others
};

describe('aesthetic guard (the "shit test")', () => {
  it('prevents known visual clashes in component roles', () => {
    // Audit pricing card featured roles
    const bgMatch = cssContent.match(/--sp-component-pricing-card-featured-bg:\s*([^;]+)/);
    const textMatch = cssContent.match(/--sp-component-pricing-card-featured-text:\s*([^;]+)/);
    const badgeBgMatch = cssContent.match(/--sp-component-pricing-card-featured-badge-bg:\s*([^;]+)/);

    const ctaBgMatch = cssContent.match(/--sp-component-button-cta-bg:\s*([^;]+)/);
    const ctaTextMatch = cssContent.match(/--sp-component-button-cta-text:\s*([^;]+)/);

    if (ctaBgMatch && ctaBgMatch[1]) {
      const bg = ctaBgMatch[1].trim();
      if (bg.includes('warning-500') || bg.includes('warning-600') || bg.includes('button-cta-bg')) {
        throw new Error('Aesthetic Violation: CTA buttons must not use the warning/gold palette. It looks like a warning, not a call to action.');
      }
    }

    if (bgMatch && textMatch && bgMatch[1] && textMatch[1]) {
      const bg = bgMatch[1].trim();
      const text = textMatch[1].trim();
      
      // Specifically catch the "Gold on Blue" user complaint
      const isBlue = bg?.includes('info-600') || bg?.includes('brand-600');
      const isGold = text?.includes('warning-500') || (badgeBgMatch && badgeBgMatch[1] && badgeBgMatch[1].includes('warning-500'));
      
      if (isBlue && isGold) {
        throw new Error('Aesthetic Violation: Blue and Gold clashing combination detected. This looks like shit.');
      }
    }
  });

  it('enforces a minimum contrast ratio for primary component roles', () => {
    // This is a simplified version that checks the mappings we just fixed
    const pricingBgMatch = cssContent.match(/--sp-component-pricing-card-featured-bg:\s*([^;]+)/);
    const pricingTextMatch = cssContent.match(/--sp-component-pricing-card-featured-text:\s*([^;]+)/);

    const roles = [
      {
        name: 'Pricing Card Featured',
        bg: pricingBgMatch?.[1]?.trim(),
        text: pricingTextMatch?.[1]?.trim()
      }
    ];

    roles.forEach(role => {
      if (role.bg && role.text) {
        const bgHex = TOKEN_VALUES[role.bg] || (role.bg.includes('neutral-900') ? '#0f172a' : null);
        const textHex = TOKEN_VALUES[role.text] || (role.text.includes('neutral-50') ? '#f8fafc' : null);

        if (bgHex && textHex) {
          const l1 = getLuminance(bgHex);
          const l2 = getLuminance(textHex);
          if (l1 !== undefined && l2 !== undefined) {
            const contrast = getContrast(l1, l2);
            expect(contrast, `Role "${role.name}" has poor contrast (${contrast.toFixed(2)}:1)`).toBeGreaterThan(4.5);
          }
        }
      }
    });
  });
});
