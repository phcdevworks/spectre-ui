import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const ICONBOX_VARIANTS = {
  primary: true,
  success: true,
  warning: true,
  danger: true,
  info: true,
  neutral: true,
  ghost: true,
} as const;

const ICONBOX_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export type IconBoxVariant = keyof typeof ICONBOX_VARIANTS;
export type IconBoxSize = keyof typeof ICONBOX_SIZES;

export interface IconBoxRecipeOptions {
  variant?: IconBoxVariant;
  size?: IconBoxSize;
  disabled?: boolean;
  loading?: boolean;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  pill?: boolean;
}

export function getIconBoxClasses(opts: IconBoxRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    pill = false,
  } = opts;

  const variant = resolveOption({
    name: "icon box variant",
    value: variantInput,
    allowed: ICONBOX_VARIANTS,
    fallback: "primary",
  });
  const size = resolveOption({
    name: "icon box size",
    value: sizeInput,
    allowed: ICONBOX_SIZES,
    fallback: "md",
  });

  const variantMap: Record<IconBoxVariant, string> = {
    primary: "sp-iconbox--primary",
    success: "sp-iconbox--success",
    warning: "sp-iconbox--warning",
    danger: "sp-iconbox--danger",
    info: "sp-iconbox--info",
    neutral: "sp-iconbox--neutral",
    ghost: "sp-iconbox--ghost",
  };
  const variantClass = variantMap[variant];

  const sizeMap: Record<IconBoxSize, string> = {
    sm: "sp-iconbox--sm",
    md: "sp-iconbox--md",
    lg: "sp-iconbox--lg",
  };
  const sizeClass = sizeMap[size];

  return cx(
    "sp-iconbox",
    variantClass,
    sizeClass,
    disabled && "sp-iconbox--disabled",
    loading && "sp-iconbox--loading",
    interactive && "sp-iconbox--interactive",
    hovered && "sp-iconbox--hover",
    focused && "sp-iconbox--focus",
    active && "sp-iconbox--active",
    pill && "sp-iconbox--pill"
  );
}
