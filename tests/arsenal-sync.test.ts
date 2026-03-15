import { describe, expect, it } from 'vitest';
import {
  getTestimonialClasses,
  getPricingCardClasses,
  getRatingClasses,
  getButtonClasses,
  getBadgeClasses
} from '../src/recipes';

describe('Arsenal Sync Recipes', () => {
  it('supports new button variants', () => {
    expect(getButtonClasses({ variant: 'cta' })).toContain('sp-btn--cta');
    expect(getButtonClasses({ variant: 'accent' })).toContain('sp-btn--accent');
  });

  it('supports new badge variants', () => {
    expect(getBadgeClasses({ variant: 'neutral' })).toContain('sp-badge--neutral');
    expect(getBadgeClasses({ variant: 'info' })).toContain('sp-badge--info');
  });

  it('returns classes for testimonial', () => {
    expect(getTestimonialClasses()).toBe('sp-testimonial');
  });

  it('returns classes for pricing card', () => {
    expect(getPricingCardClasses()).toBe('sp-pricing-card');
    expect(getPricingCardClasses({ featured: true })).toContain('sp-pricing-card--featured');
  });

  it('returns classes for rating', () => {
    expect(getRatingClasses()).toBe('sp-rating');
  });
});
