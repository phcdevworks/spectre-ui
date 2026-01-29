import { describe, expect, it } from 'vitest';
import { getButtonClasses } from '../src/recipes/button';

describe('getButtonClasses', () => {
  it('returns default primary md button classes', () => {
    const result = getButtonClasses();
    expect(result).toBe('sp-btn sp-btn--primary sp-btn--md');
  });

  it('matches README example for large full-width primary button', () => {
    const result = getButtonClasses({ variant: 'primary', size: 'lg', fullWidth: true });
    expect(result).toBe('sp-btn sp-btn--primary sp-btn--lg sp-btn--full');
  });

  it('includes variant modifiers', () => {
    const variants: Array<{
      variant: NonNullable<Parameters<typeof getButtonClasses>[0]>['variant'];
      token: string;
    }> = [
        { variant: 'secondary', token: 'sp-btn--secondary' },
        { variant: 'ghost', token: 'sp-btn--ghost' },
        { variant: 'danger', token: 'sp-btn--danger' },
      ];

    variants.forEach(({ variant, token }) => {
      const result = getButtonClasses({ variant });
      expect(result).toContain(token);
    });
  });

  it('includes size modifiers', () => {
    const sizes: Array<{
      size: NonNullable<Parameters<typeof getButtonClasses>[0]>['size'];
      token: string;
    }> = [
        { size: 'sm', token: 'sp-btn--sm' },
        { size: 'md', token: 'sp-btn--md' },
        { size: 'lg', token: 'sp-btn--lg' },
      ];

    sizes.forEach(({ size, token }) => {
      const result = getButtonClasses({ size });
      expect(result).toContain(token);
    });
  });

  it('applies boolean flag modifiers', () => {
    const result = getButtonClasses({
      fullWidth: true,
      loading: true,
      disabled: true,
      iconOnly: true,
    });

    expect(result).toContain('sp-btn--full');
    expect(result).toContain('sp-btn--loading');
    expect(result).toContain('sp-btn--disabled');
    expect(result).toContain('sp-btn--icon');
  });

  it('creates trimmed, space-delimited class strings with no duplicates', () => {
    const result = getButtonClasses({
      variant: 'danger',
      size: 'lg',
      fullWidth: true,
      loading: true,
      disabled: true,
      iconOnly: true,
    });

    expect(result).toBe(result.trim());
    expect(result.includes('  ')).toBe(false);
  });
});
