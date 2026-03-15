import { cx } from "../internal/cx";

export interface PricingCardRecipeOptions {
  featured?: boolean;
}

export function getPricingCardClasses(opts: PricingCardRecipeOptions = {}): string {
  const { featured = false } = opts;
  return cx(
    "sp-pricing-card",
    featured && "sp-pricing-card--featured"
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
