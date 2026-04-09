import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const RATING_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export type RatingSize = keyof typeof RATING_SIZES;

/**
 * Generate classes for the Rating component.
 * @sync v2.x - Synced with latest design tokens.
 */
export interface RatingRecipeOptions {
  size?: RatingSize;
  disabled?: boolean;
  loading?: boolean;
}

export function getRatingClasses(opts: RatingRecipeOptions = {}): string {
  const { size: sizeInput, disabled = false, loading = false } = opts;

  const size = resolveOption({
    name: "rating size",
    value: sizeInput,
    allowed: RATING_SIZES,
    fallback: "md",
  });

  const sizeMap: Record<RatingSize, string> = {
    sm: "sp-rating--sm",
    md: "sp-rating--md",
    lg: "sp-rating--lg",
  };
  const sizeClass = sizeMap[size];

  return cx(
    "sp-rating",
    sizeClass,
    disabled && "sp-rating--disabled",
    loading && "sp-rating--loading"
  );
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
