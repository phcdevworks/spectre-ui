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
  ghost: true,
  outline: true,
  accent: true,
  cta: true,
} as const;

const BADGE_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;
export type BadgeSize = keyof typeof BADGE_SIZES;

export interface BadgeRecipeOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function getBadgeClasses(opts: BadgeRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    disabled = false,
    loading = false,
    fullWidth = false,
  } = opts;

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
    ghost: "sp-badge--ghost",
    outline: "sp-badge--outline",
    accent: "sp-badge--accent",
    cta: "sp-badge--cta",
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
    hovered && "sp-badge--hover is-hover",
    focused && "sp-badge--focus is-focus",
    active && "sp-badge--active is-active",
    disabled && "sp-badge--disabled",
    loading && "sp-badge--loading",
    fullWidth && "sp-badge--full"
  );
}
