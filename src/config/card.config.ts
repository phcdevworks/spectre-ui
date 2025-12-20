export type CardVariant = "elevated" | "flat" | "outline" | "ghost";

export interface CardClassConfig {
  baseClass: string;
  variants: Record<CardVariant, string>;
  flags: {
    interactive: string;
    padded: string;
    fullHeight: string;
  };
}

export const cardConfig: CardClassConfig = {
  baseClass: "sp-card",
  variants: {
    elevated: "sp-card--elevated",
    flat: "sp-card--flat",
    outline: "sp-card--outline",
    ghost: "sp-card--ghost",
  },
  flags: {
    interactive: "sp-card--interactive",
    padded: "sp-card--padded",
    fullHeight: "sp-card--full",
  },
};
