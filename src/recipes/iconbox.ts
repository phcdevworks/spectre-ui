import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const iconBoxVariants = ["primary", "success", "warning", "danger", "info"] as const;
const iconBoxSizes = ["sm", "md", "lg"] as const;

export type IconBoxVariant = (typeof iconBoxVariants)[number];
export type IconBoxSize = (typeof iconBoxSizes)[number];

const ICONBOX_VARIANTS = {
  primary: true,
  success: true,
  warning: true,
  danger: true,
  info: true,
} as const;

const ICONBOX_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export interface IconBoxRecipeOptions {
  variant?: IconBoxVariant;
  size?: IconBoxSize;
}

export function getIconBoxClasses(opts: IconBoxRecipeOptions = {}): string {
  const { variant: variantInput, size: sizeInput } = opts;

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
  };
  const variantClass = variantMap[variant];

  const sizeMap: Record<IconBoxSize, string> = {
    sm: "sp-iconbox--sm",
    md: "sp-iconbox--md",
    lg: "sp-iconbox--lg",
  };
  const sizeClass = sizeMap[size];

  return cx("sp-iconbox", variantClass, sizeClass);
}
