import { describe, expect, it } from 'vitest';
import { getBadgeClasses, getIconBoxClasses } from '@phcdevworks/spectre-ui';

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/);

  expect(result).toBe(result.trim());
  expect(tokens).not.toContain('');
  expect(tokens.join(' ')).toBe(result);
  expect(new Set(tokens).size).toBe(tokens.length);
};

describe('getBadgeClasses', () => {
  it('returns defaults for badges', () => {
    const result = getBadgeClasses();
    expect(result).toBe('sp-badge sp-badge--primary sp-badge--md');
    expectTokenizedClassString(result);
  });

  it('supports all badge variants', () => {
    const variants = [
      { variant: 'primary' as const, className: 'sp-badge--primary' },
      { variant: 'secondary' as const, className: 'sp-badge--secondary' },
      { variant: 'success' as const, className: 'sp-badge--success' },
      { variant: 'warning' as const, className: 'sp-badge--warning' },
      { variant: 'danger' as const, className: 'sp-badge--danger' },
      { variant: 'neutral' as const, className: 'sp-badge--neutral' },
      { variant: 'info' as const, className: 'sp-badge--info' },
      { variant: 'ghost' as const, className: 'sp-badge--ghost' },
      { variant: 'accent' as const, className: 'sp-badge--accent' },
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
    expectTokenizedClassString(result);
  });

  it('supports interactive, hovered, focused and active states', () => {
    const result = getBadgeClasses({ interactive: true, hovered: true, focused: true, active: true });
    expect(result).toContain('sp-badge--interactive');
    expect(result).toContain('sp-badge--hover');
    expect(result).toContain('sp-badge--focus');
    expect(result).toContain('sp-badge--active');
  });

  it('supports loading and disabled states', () => {
    const result = getBadgeClasses({ loading: true, disabled: true });
    expect(result).toContain('sp-badge--loading');
    expect(result).toContain('sp-badge--disabled');
  });
});

describe('getIconBoxClasses', () => {
  it('returns defaults for icon boxes', () => {
    const result = getIconBoxClasses();
    expect(result).toBe('sp-iconbox sp-iconbox--primary sp-iconbox--md');
    expectTokenizedClassString(result);
  });

  it('supports all icon box variants', () => {
    const variants = [
      { variant: 'primary' as const, className: 'sp-iconbox--primary' },
      { variant: 'success' as const, className: 'sp-iconbox--success' },
      { variant: 'warning' as const, className: 'sp-iconbox--warning' },
      { variant: 'danger' as const, className: 'sp-iconbox--danger' },
      { variant: 'info' as const, className: 'sp-iconbox--info' },
      { variant: 'neutral' as const, className: 'sp-iconbox--neutral' },
      { variant: 'ghost' as const, className: 'sp-iconbox--ghost' },
      { variant: 'accent' as const, className: 'sp-iconbox--accent' },
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
    expectTokenizedClassString(result);
  });

  it('supports interactive, hovered and focused states', () => {
    const result = getIconBoxClasses({ interactive: true, hovered: true, focused: true });
    expect(result).toContain('sp-iconbox--interactive');
    expect(result).toContain('sp-iconbox--hover');
    expect(result).toContain('sp-iconbox--focus');
  });

  it('supports loading and disabled states', () => {
    const result = getIconBoxClasses({ loading: true, disabled: true });
    expect(result).toContain('sp-iconbox--loading');
    expect(result).toContain('sp-iconbox--disabled');
  });

  it('supports the pill variant', () => {
    const result = getIconBoxClasses({ pill: true });
    expect(result).toContain('sp-iconbox--pill');
    expectTokenizedClassString(result);
  });
});
