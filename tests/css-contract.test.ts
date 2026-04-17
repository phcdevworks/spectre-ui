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

const toClassNames = (classes: string): string[] =>
  classes.split(/\s+/).filter((className) => className.startsWith('sp-'));

const buildSelectorMatcher = (className: string): RegExp =>
  new RegExp(String.raw`\.${escapeRegex(className)}(?=[\s{,:])`);

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

const inputSelectors = collectSelectors(
  buildRecipeOutputs({
    axes: {
      state: ['default', 'error', 'success', 'disabled', 'loading'],
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['fullWidth', 'pill', 'focused', 'hovered'],
    getClasses: getInputClasses,
  }),
);

const badgeSelectors = collectSelectors(
  buildRecipeOutputs({
    axes: {
      variant: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral', 'info'],
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['interactive', 'hovered', 'focused', 'active', 'disabled', 'loading'],
    getClasses: getBadgeClasses,
  }),
);

const iconBoxSelectors = collectSelectors(
  buildRecipeOutputs({
    axes: {
      variant: ['primary', 'success', 'warning', 'danger', 'info'],
      size: ['sm', 'md', 'lg'],
    },
    booleans: ['disabled', 'loading', 'interactive', 'hovered', 'focused', 'active', 'pill'],
    getClasses: getIconBoxClasses,
  }),
);

const testimonialSelectors = collectSelectors([
  ...buildRecipeOutputs({
    booleans: ['disabled', 'loading'],
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
    booleans: ['disabled', 'loading', 'interactive', 'hovered', 'focused', 'active'],
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

describe('dist/components.css contract', () => {
  recipeSelectorContracts.forEach(({ name, selectors }) => {
    it(`contains all ${name} selectors exposed by recipes`, () => {
      selectors.forEach((selector) => {
        expect(css).toMatch(buildSelectorMatcher(selector));
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
