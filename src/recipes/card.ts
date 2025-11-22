import { cardConfig, type CardVariant } from '../components/card.config';

export interface GetCardClassesOptions {
  variant?: CardVariant;
  extraClasses?: string;
}

export const getCardClasses = ({
  variant = 'base',
  extraClasses = '',
}: GetCardClassesOptions = {}): string => {
  const classes = [cardConfig.baseClass, cardConfig.variants[variant], extraClasses].filter(Boolean);
  return classes.join(' ').trim();
};
