import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const CARD_VARIANTS = {
  elevated: true,
  flat: true,
  outline: true,
  ghost: true,
} as const;

const CARD_PADDING_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

export type CardVariant = keyof typeof CARD_VARIANTS;
export type CardPaddingSize = keyof typeof CARD_PADDING_SIZES;

export interface CardRecipeOptions {
  variant?: CardVariant;
  interactive?: boolean;
  /**
   * `true`/`false` keep their historical meaning (padded at the `md` step,
   * or unpadded). Pass `'sm'`/`'md'`/`'lg'` to opt into a specific step from
   * `component.card.padding` instead. Omission is neutral and adds no padding
   * modifier; component packages own their public `padded` default and pass
   * the resolved value explicitly.
   */
  padded?: boolean | CardPaddingSize;
  fullHeight?: boolean;
  disabled?: boolean;
  loading?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
}

export function getCardClasses(opts: CardRecipeOptions = {}): string {
  const {
    variant: variantInput,
    interactive = false,
    padded,
    fullHeight = false,
    disabled = false,
    loading = false,
    hovered = false,
    focused = false,
    active = false,
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

  // `true` and `'md'` share the legacy `sp-card--padded` class (aliased to
  // the `md` step in CSS) so existing markup and snapshots are unaffected;
  // `'sm'`/`'lg'` get their own explicit size class. An unrecognized string
  // still goes through resolveOption, so it throws in development the same
  // way an unknown `variant` does, rather than silently rendering unpadded.
  let paddedClass: string | false = false;
  if (padded === true) {
    paddedClass = "sp-card--padded";
  } else if (typeof padded === "string") {
    const paddedSize = resolveOption({
      name: "card padded size",
      value: padded,
      allowed: CARD_PADDING_SIZES,
      fallback: "md",
    });
    paddedClass = paddedSize === "md" ? "sp-card--padded" : `sp-card--padded-${paddedSize}`;
  }

  return cx(
    "sp-card",
    variantClass,
    interactive && "sp-card--interactive",
    paddedClass,
    fullHeight && "sp-card--full",
    disabled && "sp-card--disabled",
    loading && "sp-card--loading",
    hovered && "sp-card--hover is-hover",
    focused && "sp-card--focus is-focus",
    active && "sp-card--active is-active",
  );
}
