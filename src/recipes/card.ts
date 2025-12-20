import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

export type CardVariant = "elevated" | "flat" | "outline" | "ghost";

const cardVariants: CardVariant[] = ["elevated", "flat", "outline", "ghost"];

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
    allowed: cardVariants,
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
