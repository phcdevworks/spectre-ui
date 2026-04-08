import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const BADGE_VARIANTS = {
  primary: true,
  secondary: true,
  success: true,
  warning: true,
  danger: true,
  neutral: true,
  info: true,
} as const;

const BADGE_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;
export type BadgeSize = keyof typeof BADGE_SIZES;

/**
 * Generate classes for the Badge component.
 * @sync v2.x - Synced with latest design tokens, including hover states.
 */
export interface BadgeRecipeOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export function getBadgeClasses(opts: BadgeRecipeOptions = {}): string {
  const { variant: variantInput, size: sizeInput, interactive, hovered, focused, disabled, loading } = opts;

  const variant = resolveOption({
    name: "badge variant",
    value: variantInput,
    allowed: BADGE_VARIANTS,
    fallback: "primary",
  });
  const size = resolveOption({
    name: "badge size",
    value: sizeInput,
    allowed: BADGE_SIZES,
    fallback: "md",
  });

  const variantMap: Record<BadgeVariant, string> = {
    primary: "sp-badge--primary",
    secondary: "sp-badge--secondary",
    success: "sp-badge--success",
    warning: "sp-badge--warning",
    danger: "sp-badge--danger",
    neutral: "sp-badge--neutral",
    info: "sp-badge--info",
  };
  const variantClass = variantMap[variant];

  const sizeMap: Record<BadgeSize, string> = {
    sm: "sp-badge--sm",
    md: "sp-badge--md",
    lg: "sp-badge--lg",
  };
  const sizeClass = sizeMap[size];

  return cx(
    "sp-badge",
    variantClass,
    sizeClass,
    interactive && "sp-badge--interactive",
    hovered && "sp-badge--hover",
    focused && "sp-badge--focus",
    disabled && "sp-badge--disabled",
    loading && "sp-badge--loading"
  );
}
