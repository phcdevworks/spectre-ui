import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

const buttonVariants: ButtonVariant[] = ["primary", "secondary", "ghost", "danger", "success"];
const buttonSizes: ButtonSize[] = ["sm", "md", "lg"];

export interface ButtonRecipeOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
}

export function getButtonClasses(opts: ButtonRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false,
  } = opts;

  const variant = resolveOption({
    name: "button variant",
    value: variantInput,
    allowed: buttonVariants,
    fallback: "primary",
  });
  const size = resolveOption({
    name: "button size",
    value: sizeInput,
    allowed: buttonSizes,
    fallback: "md",
  });

  const variantMap: Record<ButtonVariant, string> = {
    primary: "sp-btn--primary",
    secondary: "sp-btn--secondary",
    ghost: "sp-btn--ghost",
    danger: "sp-btn--danger",
    success: "sp-btn--success",
  };
  const variantClass = variantMap[variant];

  const sizeMap: Record<ButtonSize, string> = {
    sm: "sp-btn--sm",
    md: "sp-btn--md",
    lg: "sp-btn--lg",
  };
  const sizeClass = sizeMap[size];

  return cx(
    "sp-btn",
    variantClass,
    sizeClass,
    fullWidth && "sp-btn--full",
    loading && "sp-btn--loading",
    disabled && "sp-btn--disabled",
    iconOnly && "sp-btn--icon",
  );
}
