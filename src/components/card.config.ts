export type CardVariant = 'base' | 'elevated' | 'flat';

export interface CardClassConfig {
  baseClass: string;
  variants: Record<CardVariant, string>;
}

export const cardConfig: CardClassConfig = {
  baseClass: 'sp-card',
  variants: {
    base: '',
    elevated: 'sp-card-elevated',
    flat: 'sp-card-flat',
  },
};
