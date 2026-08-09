import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const BUTTON_VARIANTS = {
  primary: true,
  secondary: true,
  ghost: true,
  danger: true,
  success: true,
  cta: true,
  accent: true,
} as const;

const BUTTON_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

export interface ButtonRecipeOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  iconOnly?: boolean;
  pill?: boolean;
  /**
   * Shrinks the visible box below --sp-min-touch-target while an invisible
   * ::after pseudo-element still guarantees the full accessible hit area —
   * use for dense secondary actions (e.g. a utility bar) instead of
   * silently dropping the touch target.
   */
  compact?: boolean;
}

export function getButtonClasses(opts: ButtonRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    fullWidth = false,
    loading = false,
    disabled = false,
    hovered = false,
    focused = false,
    active = false,
    iconOnly = false,
    pill = false,
    compact = false,
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
    cta: "sp-btn--cta",
    accent: "sp-btn--accent",
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
    hovered && "sp-btn--hover is-hover",
    focused && "sp-btn--focus is-focus",
    active && "sp-btn--active is-active",
    iconOnly && "sp-btn--icon",
    pill && "sp-btn--pill",
    compact && "sp-btn--compact",
  );
}
