export type CardVariant = 'elevated' | 'outline' | 'ghost';

export interface CardClassConfig {
  baseClass: string;
  variants: Record<CardVariant, string>;
}

export const cardConfig: CardClassConfig = {
  baseClass: 'sp-card',
  variants: {
    elevated: 'sp-card--elevated',
    outline: 'sp-card--outline',
    ghost: 'sp-card--ghost',
  },
};
