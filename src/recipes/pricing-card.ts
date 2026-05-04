import { cx } from "../internal/cx";

export interface PricingCardRecipeOptions {
  featured?: boolean;
  disabled?: boolean;
  loading?: boolean;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  fullHeight?: boolean;
}

export function getPricingCardClasses(opts: PricingCardRecipeOptions = {}): string {
  const {
    featured = false,
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    fullHeight = false,
  } = opts;

  return cx(
    "sp-pricing-card",
    featured && "sp-pricing-card--featured",
    disabled && "sp-pricing-card--disabled",
    loading && "sp-pricing-card--loading",
    interactive && "sp-pricing-card--interactive",
    hovered && "sp-pricing-card--hover",
    focused && "sp-pricing-card--focus",
    active && "sp-pricing-card--active",
    fullHeight && "sp-pricing-card--full"
  );
}

export function getPricingCardBadgeClasses(): string {
  return cx("sp-pricing-card-badge");
}

export function getPricingCardPriceContainerClasses(): string {
  return cx("sp-pricing-card-price-container");
}

export function getPricingCardPriceClasses(): string {
  return cx("sp-pricing-card-price");
}

export function getPricingCardDescriptionClasses(): string {
  return cx("sp-pricing-card-description");
}
