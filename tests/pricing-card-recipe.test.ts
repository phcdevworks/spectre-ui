import { describe, expect, it } from 'vitest';
import { getPricingCardClasses } from '../src/recipes/pricing-card';

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/);

  expect(result).toBe(result.trim());
  expect(tokens).not.toContain('');
  expect(tokens.join(' ')).toBe(result);
  expect(new Set(tokens).size).toBe(tokens.length);
};

describe('getPricingCardClasses', () => {
  it('returns default pricing card classes', () => {
    const result = getPricingCardClasses();
    expect(result).toBe('sp-pricing-card');
    expectTokenizedClassString(result);
  });

  it('adds featured modifier', () => {
    const result = getPricingCardClasses({ featured: true });
    expect(result).toContain('sp-pricing-card--featured');
    expectTokenizedClassString(result);
  });

  it('adds disabled and loading modifiers', () => {
    const result = getPricingCardClasses({ disabled: true, loading: true });
    expect(result).toContain('sp-pricing-card--disabled');
    expect(result).toContain('sp-pricing-card--loading');
    expectTokenizedClassString(result);
  });

  it('adds interactive, hovered, focused and active modifiers', () => {
    const result = getPricingCardClasses({
      interactive: true,
      hovered: true,
      focused: true,
      active: true,
    });
    expect(result).toContain('sp-pricing-card--interactive');
    expect(result).toContain('sp-pricing-card--hover');
    expect(result).toContain('sp-pricing-card--focus');
    expect(result).toContain('sp-pricing-card--active');
    expectTokenizedClassString(result);
  });

  it('adds fullHeight modifier', () => {
    const result = getPricingCardClasses({ fullHeight: true });
    expect(result).toContain('sp-pricing-card--full');
    expectTokenizedClassString(result);
  });

  it('combines multiple modifiers correctly', () => {
    const result = getPricingCardClasses({
      featured: true,
      interactive: true,
      fullHeight: true,
    });
    expect(result).toBe('sp-pricing-card sp-pricing-card--featured sp-pricing-card--interactive sp-pricing-card--full');
    expectTokenizedClassString(result);
  });
});
