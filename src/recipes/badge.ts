import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

export type BadgeVariant = "primary" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md" | "lg";

const badgeVariants: BadgeVariant[] = ["primary", "success", "warning", "danger"];
const badgeSizes: BadgeSize[] = ["sm", "md", "lg"];

export interface BadgeRecipeOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function getBadgeClasses(opts: BadgeRecipeOptions = {}): string {
  const { variant: variantInput, size: sizeInput } = opts;

  const variant = resolveOption({
    name: "badge variant",
    value: variantInput,
    allowed: badgeVariants,
    fallback: "primary",
  });
  const size = resolveOption({
    name: "badge size",
    value: sizeInput,
    allowed: badgeSizes,
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
