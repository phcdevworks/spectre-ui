import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

export type IconBoxVariant = "primary" | "success" | "warning" | "danger" | "info";
export type IconBoxSize = "sm" | "md" | "lg";

const iconBoxVariants: IconBoxVariant[] = ["primary", "success", "warning", "danger", "info"];
const iconBoxSizes: IconBoxSize[] = ["sm", "md", "lg"];

export interface IconBoxRecipeOptions {
  variant?: IconBoxVariant;
  size?: IconBoxSize;
}

export function getIconBoxClasses(opts: IconBoxRecipeOptions = {}): string {
  const { variant: variantInput, size: sizeInput } = opts;

  const variant = resolveOption({
    name: "icon box variant",
    value: variantInput,
    allowed: iconBoxVariants,
    fallback: "primary",
  });
  const size = resolveOption({
    name: "icon box size",
    value: sizeInput,
    allowed: iconBoxSizes,
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
