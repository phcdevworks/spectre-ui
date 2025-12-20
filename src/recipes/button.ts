import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const buttonVariants = ["primary", "secondary", "ghost", "danger", "success"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonSize = (typeof buttonSizes)[number];

const BUTTON_VARIANTS = {
  primary: true,
  secondary: true,
  ghost: true,
  danger: true,
  success: true,
} as const;

const BUTTON_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

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
    allowed: BUTTON_VARIANTS,
    fallback: "primary",
  });
  const size = resolveOption({
    name: "button size",
    value: sizeInput,
    allowed: BUTTON_SIZES,
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
