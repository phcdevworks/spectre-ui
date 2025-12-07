import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.join(__dirname, '..', 'src', 'styles', 'components.css');
const css = fs.readFileSync(cssPath, 'utf8');

describe('components.css contract', () => {
  it('contains button selectors', () => {
    expect(css).toContain('.sp-btn');
    expect(css).toContain('.sp-btn--primary');
    expect(css).toContain('.sp-btn--secondary');
    expect(css).toContain('.sp-btn--ghost');
  });

  it('contains card selectors', () => {
    expect(css).toContain('.sp-card');
    expect(css).toContain('.sp-card--elevated');
    expect(css).toContain('.sp-card--outline');
    expect(css).toContain('.sp-card--ghost');
  });

  it('contains input selectors', () => {
    expect(css).toContain('.sp-input');
    expect(css).toContain('.sp-input--sm');
    expect(css).toContain('.sp-input--md');
    expect(css).toContain('.sp-input--lg');
  });
});
