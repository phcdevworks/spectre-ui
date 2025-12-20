import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssPath = path.join(__dirname, '..', 'dist', 'components.css');
const css = fs.readFileSync(cssPath, 'utf8');

describe('dist/components.css contract', () => {
  it('contains button selectors', () => {
    const selectors = [
      '.sp-btn',
      '.sp-btn--primary',
      '.sp-btn--secondary',
      '.sp-btn--ghost',
      '.sp-btn--danger',
      '.sp-btn--success',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains card selectors', () => {
    const selectors = ['.sp-card', '.sp-card--elevated', '.sp-card--outline', '.sp-card--ghost'];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains input selectors', () => {
    const selectors = [
      '.sp-input',
      '.sp-input--sm',
      '.sp-input--md',
      '.sp-input--lg',
      '.sp-input--error',
      '.sp-input--success',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains badge selectors', () => {
    const selectors = [
      '.sp-badge',
      '.sp-badge--primary',
      '.sp-badge--success',
      '.sp-badge--warning',
      '.sp-badge--danger',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains icon box selectors', () => {
    const selectors = [
      '.sp-iconbox',
      '.sp-iconbox--primary',
      '.sp-iconbox--success',
      '.sp-iconbox--warning',
      '.sp-iconbox--danger',
      '.sp-iconbox--info',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('does not contain legacy form tokens', () => {
    expect(css).not.toContain('--sp-form-');
  });
});
