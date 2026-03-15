import { cx } from "../internal/cx";

export interface RatingRecipeOptions {
  // Potential for variants later if needed
}

export function getRatingClasses(_opts: RatingRecipeOptions = {}): string {
  return cx("sp-rating");
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
