import { describe, expect, it } from 'vitest';
import { getSpinnerClasses } from '@phcdevworks/spectre-ui';

describe('getSpinnerClasses', () => {
  it('leaves loading neutral when the caller omits loading', () => {
    const result = getSpinnerClasses();

    expect(result).toBe('sp-spinner sp-spinner--md');
    expect(result).not.toContain('sp-spinner--loading');
    expect(result).not.toContain('sp-spinner--disabled');
  });

  it('omits the loading class when loading is explicitly false', () => {
    const result = getSpinnerClasses({ loading: false });

    expect(result).toBe('sp-spinner sp-spinner--md');
    expect(result).not.toContain('sp-spinner--loading');
  });

  it('adds the loading class only when loading is explicitly true', () => {
    expect(getSpinnerClasses({ loading: true })).toBe(
      'sp-spinner sp-spinner--md sp-spinner--loading',
    );
  });

  it('maps every published variant', () => {
    const variants = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'neutral',
      'accent',
      'cta',
    ] as const;

    variants.forEach((variant) => {
      expect(getSpinnerClasses({ variant })).toContain(`sp-spinner--${variant}`);
    });
  });

  it('maps every published size', () => {
    expect(getSpinnerClasses({ size: 'sm' })).toContain('sp-spinner--sm');
    expect(getSpinnerClasses({ size: 'md' })).toContain('sp-spinner--md');
    expect(getSpinnerClasses({ size: 'lg' })).toContain('sp-spinner--lg');
  });

  it('adds the disabled class', () => {
    expect(getSpinnerClasses({ disabled: true })).toContain('sp-spinner--disabled');
  });
});
