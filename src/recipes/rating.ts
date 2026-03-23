import { cx } from "../internal/cx";

/**
 * Generate classes for the Rating component.
 * @sync v2.x - Synced with latest design tokens.
 */
export interface RatingRecipeOptions {
  disabled?: boolean;
}

export function getRatingClasses(opts: RatingRecipeOptions = {}): string {
  const { disabled = false } = opts;
  return cx("sp-rating", disabled && "sp-rating--disabled");
}

export function getRatingStarsClasses(): string {
  return cx("sp-rating-stars");
}

export function getRatingStarClasses(isFilled: boolean = false): string {
  return cx(
    "sp-rating-star",
    isFilled && "sp-rating-star--filled"
  );
}

export function getRatingTextClasses(): string {
  return cx("sp-rating-text");
}
