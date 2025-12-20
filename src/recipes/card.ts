import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const cardVariants = ["elevated", "flat", "outline", "ghost"] as const;

export type CardVariant = (typeof cardVariants)[number];

const CARD_VARIANTS = {
  elevated: true,
  flat: true,
  outline: true,
  ghost: true,
} as const;

export interface CardRecipeOptions {
  variant?: CardVariant;
  interactive?: boolean; // hover/focus styles
  padded?: boolean;      // apply default padding
  fullHeight?: boolean;
}

export function getCardClasses(opts: CardRecipeOptions = {}): string {
  const {
    variant: variantInput,
    interactive = false,
    padded = false,
    fullHeight = false,
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
  );
}
