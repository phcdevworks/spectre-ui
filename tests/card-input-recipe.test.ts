import { describe, expect, it } from 'vitest';
import { getCardClasses } from '../src/recipes/card';
import { getInputClasses } from '../src/recipes/input';

describe('getCardClasses', () => {
  it('returns defaults for elevated card without extra flags', () => {
    const result = getCardClasses();

    expect(result).toBe('sp-card sp-card--elevated');
    expect(result).not.toContain('sp-card--interactive');
    expect(result).not.toContain('sp-card--padded');
    expect(result).not.toContain('sp-card--full');
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });

  it('maps card variants correctly', () => {
    const variants = [
      { variant: 'elevated' as const, className: 'sp-card--elevated' },
      { variant: 'outline' as const, className: 'sp-card--outline' },
      { variant: 'ghost' as const, className: 'sp-card--ghost' },
    ];

    variants.forEach(({ variant, className }) => {
      const result = getCardClasses({ variant });
      expect(result).toContain(className);
    });
  });

  it('adds card flag modifiers', () => {
    const result = getCardClasses({ interactive: true, padded: true, fullHeight: true });

    expect(result).toContain('sp-card--interactive');
    expect(result).toContain('sp-card--padded');
    expect(result).toContain('sp-card--full');
  });

  it('combines classes deterministically for a complex card', () => {
    const result = getCardClasses({ variant: 'outline', interactive: true, padded: true });
    expect(result).toBe('sp-card sp-card--outline sp-card--interactive sp-card--padded');
  });

  it('creates trimmed, space-delimited class strings for a full option card', () => {
    const result = getCardClasses({
      variant: 'ghost',
      interactive: true,
      padded: true,
      fullHeight: true,
    });

    expect(result).toContain('sp-card--ghost');
    expect(result).toContain('sp-card--interactive');
    expect(result).toContain('sp-card--padded');
    expect(result).toContain('sp-card--full');
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });
});

describe('getInputClasses', () => {
  it('returns defaults for md input without modifiers', () => {
    const result = getInputClasses();

    expect(result).toBe('sp-input sp-input--md');
    expect(result).not.toContain('sp-input--error');
    expect(result).not.toContain('sp-input--success');
    expect(result).not.toContain('sp-input--full');
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });

  it('includes size modifiers', () => {
    const sizes = [
      { size: 'sm' as const, className: 'sp-input--sm' },
      { size: 'md' as const, className: 'sp-input--md' },
      { size: 'lg' as const, className: 'sp-input--lg' },
    ];

    sizes.forEach(({ size, className }) => {
      const result = getInputClasses({ size });
      expect(result).toContain(className);
    });
  });

  it('applies state modifiers', () => {
    expect(getInputClasses({ state: 'default' })).not.toMatch(/sp-input--(error|success)/);
    expect(getInputClasses({ state: 'error' })).toContain('sp-input--error');
    expect(getInputClasses({ state: 'success' })).toContain('sp-input--success');
  });

  it('adds fullWidth modifier', () => {
    const result = getInputClasses({ fullWidth: true });
    expect(result).toContain('sp-input--full');
  });

  it('creates trimmed, space-delimited class strings for complex input options', () => {
    const result = getInputClasses({ state: 'success', size: 'lg', fullWidth: true });

    expect(result).toContain('sp-input--success');
    expect(result).toContain('sp-input--lg');
    expect(result).toContain('sp-input--full');
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });
});
