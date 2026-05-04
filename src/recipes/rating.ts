import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const RATING_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export type RatingSize = keyof typeof RATING_SIZES;

export interface RatingRecipeOptions {
  size?: RatingSize;
  disabled?: boolean;
  loading?: boolean;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  pill?: boolean;
  fullWidth?: boolean;
}

export function getRatingClasses(opts: RatingRecipeOptions = {}): string {
  const {
    size: sizeInput,
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    pill = false,
    fullWidth = false,
  } = opts;

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
    loading && "sp-rating--loading",
    interactive && "sp-rating--interactive",
    hovered && "sp-rating--hover",
    focused && "sp-rating--focus",
    active && "sp-rating--active",
    pill && "sp-rating--pill",
    fullWidth && "sp-rating--full"
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
