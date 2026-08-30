import { describe, expect, it } from 'vitest';
import {
  getBadgeClasses,
  getButtonClasses,
  getPricingCardClasses,
  getRatingClasses,
  getTestimonialClasses,
} from '@phcdevworks/spectre-ui';

describe('Arsenal Sync Recipes', () => {
  it('supports new button variants from the root package export surface', () => {
    expect(getButtonClasses({ variant: 'cta' })).toContain('sp-btn--cta');
    expect(getButtonClasses({ variant: 'accent' })).toContain('sp-btn--accent');
  });

  it('supports new badge variants', () => {
    expect(getBadgeClasses({ variant: 'neutral' })).toContain('sp-badge--neutral');
    expect(getBadgeClasses({ variant: 'info' })).toContain('sp-badge--info');
  });

  // Regression: getTestimonialClasses() previously defaulted variant to
  // 'outline' while <sp-testimonial> (spectre-components) defaulted its own
  // variant to 'elevated' — a bare recipe call and a bare component instance
  // rendered differently. Aligned to 'elevated' so both match, the same fix
  // applied to Card's padded default; see TODO.md "Requested by Downstream".
  it('returns classes for testimonial, defaulting to elevated to match <sp-testimonial>', () => {
    expect(getTestimonialClasses()).toBe('sp-testimonial sp-testimonial--elevated');
    expect(getTestimonialClasses({ variant: 'outline' })).toBe('sp-testimonial sp-testimonial--outline');
  });

  it('returns classes for pricing card', () => {
    expect(getPricingCardClasses()).toBe('sp-pricing-card');
    expect(getPricingCardClasses({ featured: true })).toContain('sp-pricing-card--featured');
  });

  it('returns classes for rating', () => {
    expect(getRatingClasses()).toBe('sp-rating sp-rating--md');
    expect(getRatingClasses({ size: 'sm' })).toContain('sp-rating--sm');
    expect(getRatingClasses({ size: 'lg' })).toContain('sp-rating--lg');
  });
});
