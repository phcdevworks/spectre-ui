import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  getBadgeClasses,
  getButtonClasses,
  getCardClasses,
  getIconBoxClasses,
  getInputClasses,
  getPricingCardBadgeClasses,
  getPricingCardClasses,
  getPricingCardDescriptionClasses,
  getPricingCardPriceClasses,
  getPricingCardPriceContainerClasses,
  getRatingClasses,
  getRatingStarClasses,
  getRatingStarsClasses,
  getRatingTextClasses,
  getTestimonialAuthorClasses,
  getTestimonialAuthorInfoClasses,
  getTestimonialAuthorNameClasses,
  getTestimonialAuthorTitleClasses,
  getTestimonialClasses,
  getTestimonialQuoteClasses,
} from '@phcdevworks/spectre-ui';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssPath = path.join(__dirname, '..', 'dist', 'components.css');
const css = fs.readFileSync(cssPath, 'utf8');

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const recipeClassMatrix = [
  getButtonClasses(),
  getButtonClasses({ variant: 'cta', hovered: true }),
  getButtonClasses({ variant: 'accent', focused: true, active: true }),
  getButtonClasses({ variant: 'secondary', size: 'lg', fullWidth: true, iconOnly: true }),
  getButtonClasses({
    variant: 'danger',
    size: 'lg',
    fullWidth: true,
    loading: true,
    disabled: true,
    iconOnly: true,
  }),
  getCardClasses(),
  getCardClasses({ variant: 'outline', interactive: true, padded: true, fullHeight: true }),
  getInputClasses(),
  getInputClasses({ state: 'error', size: 'lg', fullWidth: true }),
  getInputClasses({ state: 'success', size: 'sm', fullWidth: true }),
  getBadgeClasses(),
  getBadgeClasses({ variant: 'secondary', size: 'sm' }),
  getBadgeClasses({ variant: 'warning', size: 'lg' }),
  getBadgeClasses({ variant: 'danger', size: 'lg' }),
  getBadgeClasses({ variant: 'neutral', size: 'md' }),
  getBadgeClasses({ variant: 'info', size: 'sm' }),
  getBadgeClasses({ variant: 'success', size: 'sm' }),
  getBadgeClasses({ interactive: true, hovered: true, focused: true, active: true }),
  getBadgeClasses({ loading: true, disabled: true }),
  getIconBoxClasses(),
  getIconBoxClasses({ variant: 'success', size: 'sm' }),
  getIconBoxClasses({ variant: 'warning', size: 'lg' }),
  getIconBoxClasses({ variant: 'danger', size: 'md' }),
  getIconBoxClasses({ variant: 'info', size: 'sm' }),
  getIconBoxClasses({ interactive: true, hovered: true, focused: true }),
  getIconBoxClasses({ loading: true, disabled: true }),
  getTestimonialClasses(),
  getTestimonialQuoteClasses(),
  getTestimonialAuthorClasses(),
  getTestimonialAuthorInfoClasses(),
  getTestimonialAuthorNameClasses(),
  getTestimonialAuthorTitleClasses(),
  getPricingCardClasses({ featured: true }),
  getPricingCardClasses({ loading: true }),
  getPricingCardClasses({ interactive: true, hovered: true, focused: true, active: true }),
  getPricingCardBadgeClasses(),
  getPricingCardPriceContainerClasses(),
  getPricingCardPriceClasses(),
  getPricingCardDescriptionClasses(),
  getRatingClasses(),
  getRatingClasses({ disabled: true }),
  getRatingClasses({ loading: true }),
  getRatingStarsClasses(),
  getRatingStarClasses(),
  getRatingStarClasses(true),
  getRatingTextClasses(),
];

const generatedClassNames = new Set(
  recipeClassMatrix
    .flatMap((classes) => classes.split(/\s+/))
    .filter((className) => className.startsWith('sp-')),
);

describe('dist/components.css contract', () => {
  it('contains button selectors', () => {
    const selectors = [
      '.sp-btn',
      '.sp-btn--primary',
      '.sp-btn--secondary',
      '.sp-btn--ghost',
      '.sp-btn--danger',
      '.sp-btn--success',
      '.sp-btn--cta',
      '.sp-btn--accent',
      '.sp-btn--hover',
      '.sp-btn--focus',
      '.sp-btn--active',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains card selectors', () => {
    const selectors = ['.sp-card', '.sp-card--elevated', '.sp-card--outline', '.sp-card--ghost'];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains input selectors', () => {
    const selectors = [
      '.sp-input',
      '.sp-input--sm',
      '.sp-input--md',
      '.sp-input--lg',
      '.sp-input--error',
      '.sp-input--success',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains badge selectors', () => {
    const selectors = [
      '.sp-badge',
      '.sp-badge--primary',
      '.sp-badge--secondary',
      '.sp-badge--success',
      '.sp-badge--warning',
      '.sp-badge--danger',
      '.sp-badge--neutral',
      '.sp-badge--info',
      '.sp-badge--sm',
      '.sp-badge--md',
      '.sp-badge--lg',
      '.sp-badge--interactive',
      '.sp-badge--hover',
      '.sp-badge--focus',
      '.sp-badge--active',
      '.sp-badge--loading',
      '.sp-badge--disabled',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains icon box selectors', () => {
    const selectors = [
      '.sp-iconbox',
      '.sp-iconbox--primary',
      '.sp-iconbox--success',
      '.sp-iconbox--warning',
      '.sp-iconbox--danger',
      '.sp-iconbox--info',
      '.sp-iconbox--sm',
      '.sp-iconbox--md',
      '.sp-iconbox--lg',
      '.sp-iconbox--interactive',
      '.sp-iconbox--hover',
      '.sp-iconbox--focus',
      '.sp-iconbox--loading',
      '.sp-iconbox--disabled',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains rating selectors', () => {
    const selectors = [
      '.sp-rating',
      '.sp-rating--disabled',
      '.sp-rating--loading',
      '.sp-rating-stars',
      '.sp-rating-star',
      '.sp-rating-star--filled',
      '.sp-rating-text',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains testimonial and pricing helper selectors', () => {
    const selectors = [
      '.sp-testimonial-quote',
      '.sp-testimonial-author',
      '.sp-testimonial-author-info',
      '.sp-testimonial-author-name',
      '.sp-testimonial-author-title',
      '.sp-pricing-card-badge',
      '.sp-pricing-card-price-container',
      '.sp-pricing-card-price',
      '.sp-pricing-card-description',
    ];

    selectors.forEach((selector) => {
      expect(css).toContain(selector);
    });
  });

  it('contains selectors for all generated recipe classes', () => {
    generatedClassNames.forEach((className) => {
      const matcher = new RegExp(String.raw`\.${escapeRegex(className)}(\s|\{|,)`);
      expect(css).toMatch(matcher);
    });
  });
});
