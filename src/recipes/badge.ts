import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const badgeVariants = ["primary", "success", "warning", "danger"] as const;
const badgeSizes = ["sm", "md", "lg"] as const;

export type BadgeVariant = (typeof badgeVariants)[number];
export type BadgeSize = (typeof badgeSizes)[number];

const BADGE_VARIANTS = {
  primary: true,
  success: true,
  warning: true,
  danger: true,
} as const;

const BADGE_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export interface BadgeRecipeOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function getBadgeClasses(opts: BadgeRecipeOptions = {}): string {
  const { variant: variantInput, size: sizeInput } = opts;

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
    success: "sp-badge--success",
    warning: "sp-badge--warning",
    danger: "sp-badge--danger",
  };
  const variantClass = variantMap[variant];

  const sizeMap: Record<BadgeSize, string> = {
    sm: "sp-badge--sm",
    md: "sp-badge--md",
    lg: "sp-badge--lg",
  };
  const sizeClass = sizeMap[size];

  return cx("sp-badge", variantClass, sizeClass);
}
