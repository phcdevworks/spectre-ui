export type SpectreButtonSize = 'sm' | 'md' | 'lg';
export type SpectreButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type SpectreButtonState = 'default' | 'hover' | 'disabled';

export interface GetButtonClassesOptions {
  variant?: SpectreButtonVariant;
  size?: SpectreButtonSize;
  state?: SpectreButtonState;
  /**
   * Space-separated extra classes appended at the end.
   */
  extraClasses?: string;
}

/**
 * Recipe helper for button class generation.
 *
 * Examples:
 * - getButtonClasses()
 *   => "sp-btn sp-btn--primary sp-btn--md"
 *
 * - getButtonClasses({ variant: "secondary", size: "lg", state: "disabled" })
 *   => "sp-btn sp-btn--secondary sp-btn--lg sp-btn--disabled"
 */
export const getButtonClasses = (
  options: GetButtonClassesOptions = {},
): string => {
  const {
    variant = 'primary',
    size = 'md',
    state = 'default',
    extraClasses,
  } = options;

  const baseClass = 'sp-btn';

  const variantClasses: Record<SpectreButtonVariant, string> = {
    primary: 'sp-btn--primary',
    secondary: 'sp-btn--secondary',
    ghost: 'sp-btn--ghost',
    danger: 'sp-btn--danger',
  };

  const sizeClasses: Record<SpectreButtonSize, string> = {
    sm: 'sp-btn--sm',
    md: 'sp-btn--md',
    lg: 'sp-btn--lg',
  };

  const stateClasses: Record<SpectreButtonState, string> = {
    default: '',
    hover: 'sp-btn--hover',
    disabled: 'sp-btn--disabled',
  };

  const classes: string[] = [
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses[state],
  ];

  if (extraClasses && extraClasses.trim().length > 0) {
    classes.push(extraClasses.trim());
  }

  return classes.filter(Boolean).join(' ');
};
