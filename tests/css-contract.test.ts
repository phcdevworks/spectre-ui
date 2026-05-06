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
  getInputWrapperClasses,
  getInputLabelClasses,
  getInputHelperTextClasses,
  getInputErrorMessageClasses,
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

const toClassNames = (classes: string): string[] =>
  classes.split(/\s+/).filter((className) => className.startsWith('sp-'));

const buildSelectorMatcher = (className: string): RegExp =>
  new RegExp(String.raw`\.${escapeRegex(className)}(?=[\s{,:])`);

const buildSelectorFragmentMatcher = (selector: string): RegExp =>
  new RegExp(escapeRegex(selector));

const collectSelectors = (classGroups: string[]): string[] =>
  [...new Set(classGroups.flatMap(toClassNames))];

const exhaustiveBooleanOptions = <T extends string>(keys: readonly T[]): Array<Record<T, boolean>> => {
  if (keys.length === 0) {
    return [{} as Record<T, boolean>];
  }

  const [currentKey, ...remainingKeys] = keys;
  const tail = exhaustiveBooleanOptions(remainingKeys);

  return tail.flatMap((entry) => [
    { ...entry, [currentKey]: false },
    { ...entry, [currentKey]: true },
  ]);
};

const buildRecipeOutputs = <T extends Record<string, unknown>>(config: {
  axes?: Record<string, readonly unknown[]>;
  booleans?: readonly (keyof T & string)[];
  getClasses: (options: T) => string;
}): string[] => {
  const axisEntries = Object.entries(config.axes ?? {});
  const axisOptions = axisEntries.reduce<Array<Record<string, unknown>>>(
    (combinations, [key, values]) =>
      combinations.flatMap((combination) =>
        values.map((value) => ({ ...combination, [key]: value })),
      ),
    [{}],
  );
  const booleanOptions = exhaustiveBooleanOptions(config.booleans ?? []);

  return axisOptions.flatMap((axisOption) =>
    booleanOptions.map((booleanOption) =>
      config.getClasses({
        ...(axisOption as T),
        ...(booleanOption as T),
      }),
    ),
  );
};

const buttonSelectors = collectSelectors(
  buildRecipeOutputs({
    axes: {
      variant: ['primary', 'secondary', 'ghost', 'danger', 'success', 'cta', 'accent'],
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['fullWidth', 'loading', 'disabled', 'hovered', 'focused', 'active', 'iconOnly', 'pill'],
    getClasses: getButtonClasses,
  }),
);

const cardSelectors = collectSelectors(
  buildRecipeOutputs({
    axes: {
      variant: ['elevated', 'flat', 'outline', 'ghost'],
    },
    booleans: ['interactive', 'padded', 'fullHeight', 'disabled', 'loading', 'hovered', 'focused', 'active'],
    getClasses: getCardClasses,
  }),
);

const inputSelectors = collectSelectors([
  ...buildRecipeOutputs({
    axes: {
      state: ['default', 'error', 'success', 'disabled', 'loading'],
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['fullWidth', 'pill', 'focused', 'hovered'],
    getClasses: getInputClasses,
  }),
  getInputWrapperClasses(),
  getInputLabelClasses(),
  getInputLabelClasses({ disabled: true }),
  getInputHelperTextClasses(),
  getInputHelperTextClasses({ disabled: true }),
  getInputErrorMessageClasses(),
]);

const badgeSelectors = collectSelectors(
  buildRecipeOutputs({
    axes: {
      variant: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral', 'info', 'ghost', 'accent'],
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['interactive', 'hovered', 'focused', 'active', 'disabled', 'loading'],
    getClasses: getBadgeClasses,
  }),
);

const iconBoxSelectors = collectSelectors(
  buildRecipeOutputs({
    axes: {
      variant: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral', 'ghost', 'accent'],
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['disabled', 'loading', 'interactive', 'hovered', 'focused', 'active', 'pill'],
    getClasses: getIconBoxClasses,
  }),
);

const testimonialSelectors = collectSelectors([
  ...buildRecipeOutputs({
    booleans: ['disabled', 'loading', 'interactive', 'hovered', 'focused', 'active', 'fullHeight'],
    getClasses: getTestimonialClasses,
  }),
  getTestimonialQuoteClasses(),
  getTestimonialAuthorClasses(),
  getTestimonialAuthorInfoClasses(),
  getTestimonialAuthorNameClasses(),
  getTestimonialAuthorTitleClasses(),
]);

const pricingCardSelectors = collectSelectors([
  ...buildRecipeOutputs({
    booleans: ['featured', 'disabled', 'loading', 'interactive', 'hovered', 'focused', 'active'],
    getClasses: getPricingCardClasses,
  }),
  getPricingCardBadgeClasses(),
  getPricingCardPriceContainerClasses(),
  getPricingCardPriceClasses(),
  getPricingCardDescriptionClasses(),
]);

const ratingSelectors = collectSelectors([
  ...buildRecipeOutputs({
    axes: {
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['disabled', 'loading', 'interactive', 'hovered', 'focused', 'active', 'fullWidth'],
    getClasses: getRatingClasses,
  }),
  getRatingStarsClasses(),
  getRatingStarClasses(),
  getRatingStarClasses(true),
  getRatingTextClasses(),
]);

const recipeSelectorContracts = [
  { name: 'button', selectors: buttonSelectors },
  { name: 'card', selectors: cardSelectors },
  { name: 'input', selectors: inputSelectors },
  { name: 'badge', selectors: badgeSelectors },
  { name: 'icon box', selectors: iconBoxSelectors },
  { name: 'testimonial', selectors: testimonialSelectors },
  { name: 'pricing card', selectors: pricingCardSelectors },
  { name: 'rating', selectors: ratingSelectors },
] as const;

const interactionStateContracts = [
  {
    name: 'button variants',
    selectors: [
      '.sp-btn:focus-visible',
      '.sp-btn.sp-btn--disabled',
      '.sp-btn[aria-disabled="true"]',
      '.sp-btn:disabled',
      '.sp-btn--primary:hover',
      '.sp-btn--primary:disabled',
      '.sp-btn--secondary:hover',
      '.sp-btn--secondary:disabled',
      '.sp-btn--ghost:hover',
      '.sp-btn--ghost:disabled',
      '.sp-btn--danger:hover',
      '.sp-btn--danger:disabled',
      '.sp-btn--success:hover',
      '.sp-btn--success:disabled',
      '.sp-btn--cta:hover',
      '.sp-btn--cta:disabled',
      '.sp-btn--accent:hover',
      '.sp-btn--accent:disabled',
    ],
  },
  {
    name: 'input states',
    selectors: [
      '.sp-input:hover',
      '.sp-input:focus',
      '.sp-input:disabled',
      '.sp-input[aria-disabled="true"]',
      '.sp-input--disabled:focus',
    ],
  },
  {
    name: 'card states',
    selectors: [
      '.sp-card--interactive:hover',
      '.sp-card--interactive:focus-visible',
      '.sp-card--interactive:focus-within',
      '.sp-card--disabled',
    ],
  },
  {
    name: 'badge variants',
    selectors: [
      '.sp-badge--interactive:focus-visible',
      '.sp-badge:disabled',
      '.sp-badge[aria-disabled="true"]',
      '.sp-badge--disabled',
      '.sp-badge[aria-busy="true"]',
      '.sp-badge--primary.sp-badge--interactive:hover',
      '.sp-badge--secondary.sp-badge--interactive:hover',
      '.sp-badge--success.sp-badge--interactive:hover',
      '.sp-badge--warning.sp-badge--interactive:hover',
      '.sp-badge--danger.sp-badge--interactive:hover',
      '.sp-badge--neutral.sp-badge--interactive:hover',
      '.sp-badge--info.sp-badge--interactive:hover',
      '.sp-badge--ghost.sp-badge--interactive:hover',
      '.sp-badge--accent.sp-badge--interactive:hover',
    ],
  },
  {
    name: 'icon box variants',
    selectors: [
      '.sp-iconbox--interactive:hover',
      '.sp-iconbox--interactive:focus-visible',
      '.sp-iconbox:disabled',
      '.sp-iconbox[aria-disabled="true"]',
      '.sp-iconbox--disabled',
    ],
  },
  {
    name: 'pricing card states',
    selectors: [
      '.sp-pricing-card--interactive:hover',
      '.sp-pricing-card--interactive:focus-visible',
      '.sp-pricing-card--interactive:focus-within',
      '.sp-pricing-card--disabled',
      '.sp-pricing-card--featured.sp-pricing-card--interactive:hover',
      '.sp-pricing-card--featured.sp-pricing-card--interactive:focus-visible',
      '.sp-pricing-card--featured.sp-pricing-card--interactive:focus-within',
    ],
  },
  {
    name: 'rating states',
    selectors: [
      '.sp-rating--interactive:hover',
      '.sp-rating--interactive:focus-visible',
      '.sp-rating:disabled',
      '.sp-rating[aria-disabled="true"]',
      '.sp-rating--disabled',
    ],
  },
] as const;

const sizeVariantContracts = [
  {
    name: 'button sizes',
    selectors: ['.sp-btn--sm', '.sp-btn--md', '.sp-btn--lg'],
  },
  {
    name: 'input sizes',
    selectors: ['.sp-input--sm', '.sp-input--md', '.sp-input--lg'],
  },
  {
    name: 'badge sizes',
    selectors: ['.sp-badge--sm', '.sp-badge--md', '.sp-badge--lg'],
  },
  {
    name: 'icon box sizes',
    selectors: ['.sp-iconbox--sm', '.sp-iconbox--md', '.sp-iconbox--lg'],
  },
  {
    name: 'rating sizes',
    selectors: ['.sp-rating--sm', '.sp-rating--md', '.sp-rating--lg'],
  },
] as const;

describe('dist/components.css contract', () => {
  recipeSelectorContracts.forEach(({ name, selectors }) => {
    it(`contains all ${name} selectors exposed by recipes`, () => {
      selectors.forEach((selector) => {
        expect(css).toMatch(buildSelectorMatcher(selector));
      });
    });
  });

  interactionStateContracts.forEach(({ name, selectors }) => {
    it(`contains required interaction state selectors for ${name}`, () => {
      selectors.forEach((selector) => {
        expect(css).toMatch(buildSelectorFragmentMatcher(selector));
      });
    });
  });

  sizeVariantContracts.forEach(({ name, selectors }) => {
    it(`contains required size selectors for ${name}`, () => {
      selectors.forEach((selector) => {
        expect(css).toMatch(buildSelectorFragmentMatcher(selector));
      });
    });
  });

  it('contains selectors for every public recipe class emitted by the exhaustive matrix', () => {
    const generatedClassNames = new Set(recipeSelectorContracts.flatMap(({ selectors }) => selectors));

    generatedClassNames.forEach((className) => {
      expect(css).toMatch(buildSelectorMatcher(className));
    });
  });
});
