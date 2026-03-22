import { cx } from "../internal/cx";

/**
 * Generate classes for the PricingCard component.
 * @sync v2.x - Synced with latest design tokens.
 */
export interface PricingCardRecipeOptions {
  featured?: boolean;
  disabled?: boolean;
}

export function getPricingCardClasses(opts: PricingCardRecipeOptions = {}): string {
  const { featured = false, disabled = false } = opts;
  return cx(
    "sp-pricing-card",
    featured && "sp-pricing-card--featured",
    disabled && "sp-pricing-card--disabled"
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
