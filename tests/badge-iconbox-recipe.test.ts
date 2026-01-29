import { describe, expect, it } from 'vitest';
import { getBadgeClasses } from '../src/recipes/badge';
import { getIconBoxClasses } from '../src/recipes/iconbox';

describe('getBadgeClasses', () => {
  it('returns defaults for badges', () => {
    const result = getBadgeClasses();
    expect(result).toBe('sp-badge sp-badge--primary sp-badge--md');
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });

  it('supports all badge variants', () => {
    const variants = [
      { variant: 'primary' as const, className: 'sp-badge--primary' },
      { variant: 'success' as const, className: 'sp-badge--success' },
      { variant: 'warning' as const, className: 'sp-badge--warning' },
      { variant: 'danger' as const, className: 'sp-badge--danger' },
    ];

    variants.forEach(({ variant, className }) => {
      const result = getBadgeClasses({ variant });
      expect(result).toContain(className);
      expect(result).toContain('sp-badge');
    });
  });

  it('supports all badge sizes', () => {
    const sizes = [
      { size: 'sm' as const, className: 'sp-badge--sm' },
      { size: 'md' as const, className: 'sp-badge--md' },
      { size: 'lg' as const, className: 'sp-badge--lg' },
    ];

    sizes.forEach(({ size, className }) => {
      const result = getBadgeClasses({ size });
      expect(result).toContain(className);
    });
  });

  it('creates trimmed, space-delimited class strings for non-default badges', () => {
    const result = getBadgeClasses({ variant: 'warning', size: 'lg' });
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });
});

describe('getIconBoxClasses', () => {
  it('returns defaults for icon boxes', () => {
    const result = getIconBoxClasses();
    expect(result).toBe('sp-iconbox sp-iconbox--primary sp-iconbox--md');
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });

  it('supports all icon box variants', () => {
    const variants = [
      { variant: 'primary' as const, className: 'sp-iconbox--primary' },
      { variant: 'success' as const, className: 'sp-iconbox--success' },
      { variant: 'warning' as const, className: 'sp-iconbox--warning' },
      { variant: 'danger' as const, className: 'sp-iconbox--danger' },
      { variant: 'info' as const, className: 'sp-iconbox--info' },
    ];

    variants.forEach(({ variant, className }) => {
      const result = getIconBoxClasses({ variant });
      expect(result).toContain(className);
      expect(result).toContain('sp-iconbox');
    });
  });

  it('supports icon box sizes', () => {
    const sizes = [
      { size: 'sm' as const, className: 'sp-iconbox--sm' },
      { size: 'md' as const, className: 'sp-iconbox--md' },
      { size: 'lg' as const, className: 'sp-iconbox--lg' },
    ];

    sizes.forEach(({ size, className }) => {
      const result = getIconBoxClasses({ size });
      expect(result).toContain(className);
    });
  });

  it('creates trimmed, space-delimited class strings for non-default icon boxes', () => {
    const result = getIconBoxClasses({ variant: 'info', size: 'sm' });
    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });
});
