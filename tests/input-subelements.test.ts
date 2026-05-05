import { describe, expect, it } from 'vitest';
import {
  getInputWrapperClasses,
  getInputLabelClasses,
  getInputHelperTextClasses,
  getInputErrorMessageClasses
} from '../src/recipes/input';

describe('Input Sub-element Recipes', () => {
  it('returns correct classes for input wrapper', () => {
    expect(getInputWrapperClasses()).toBe('sp-input-wrapper');
  });

  it('returns correct classes for label', () => {
    expect(getInputLabelClasses()).toBe('sp-label');
    expect(getInputLabelClasses({ disabled: true })).toBe('sp-label sp-label--disabled');
  });

  it('returns correct classes for helper text', () => {
    expect(getInputHelperTextClasses()).toBe('sp-helper-text');
    expect(getInputHelperTextClasses({ disabled: true })).toBe('sp-helper-text sp-helper-text--disabled');
  });

  it('returns correct classes for error message', () => {
    expect(getInputErrorMessageClasses()).toBe('sp-error-message');
  });
});
