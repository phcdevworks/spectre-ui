import { buttonConfig, type ButtonSize, type ButtonState, type ButtonVariant } from '../components/button.config';

export interface GetButtonClassesOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  extraClasses?: string;
}

export const getButtonClasses = ({
  variant = 'primary',
  size = 'md',
  state = 'default',
  extraClasses = '',
}: GetButtonClassesOptions = {}): string => {
  const classes = [
    buttonConfig.baseClass,
    buttonConfig.variants[variant],
    buttonConfig.sizes[size],
    buttonConfig.states[state],
    extraClasses,
  ].filter(Boolean);

  return classes.join(' ').trim();
};
