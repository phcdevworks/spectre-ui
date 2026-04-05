import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const CARD_VARIANTS = {
  elevated: true,
  flat: true,
  outline: true,
  ghost: true,
} as const;

export type CardVariant = keyof typeof CARD_VARIANTS;

export interface CardRecipeOptions {
  variant?: CardVariant;
  interactive?: boolean; // hover/focus styles
  padded?: boolean;      // apply default padding
  fullHeight?: boolean;
  disabled?: boolean;
  loading?: boolean;
  hovered?: boolean;
  focused?: boolean;
}

export function getCardClasses(opts: CardRecipeOptions = {}): string {
  const {
    variant: variantInput,
    interactive = false,
    padded = false,
    fullHeight = false,
    disabled = false,
    loading = false,
    hovered = false,
    focused = false,
  } = opts;

  const variant = resolveOption({
    name: "card variant",
    value: variantInput,
    allowed: CARD_VARIANTS,
    fallback: "elevated",
  });

  const variantMap: Record<CardVariant, string> = {
    elevated: "sp-card--elevated",
    flat: "sp-card--flat",
    outline: "sp-card--outline",
    ghost: "sp-card--ghost",
  };
  const variantClass = variantMap[variant];

  return cx(
    "sp-card",
    variantClass,
    interactive && "sp-card--interactive",
    padded && "sp-card--padded",
    fullHeight && "sp-card--full",
    disabled && "sp-card--disabled",
    loading && "sp-card--loading",
    hovered && "sp-card--hover",
    focused && "sp-card--focus",
  );
}
