export type SpectreCardVariant = 'elevated' | 'outline' | 'ghost';

export interface GetCardClassesOptions {
  variant?: SpectreCardVariant;
  padded?: boolean;
  interactive?: boolean;
  fullHeight?: boolean;
  /**
   * Space-separated extra classes appended at the end.
   */
  extraClasses?: string;
}

/**
 * Recipe helper for card class generation.
 *
 * Examples:
 * - getCardClasses()
 *   => "sp-card sp-card--elevated"
 *
 * - getCardClasses({ variant: "outline", padded: true })
 *   => "sp-card sp-card--outline sp-card--padded"
 */
export const getCardClasses = (
  options: GetCardClassesOptions = {},
): string => {
  const {
    variant = 'elevated',
    padded = false,
    interactive = false,
    fullHeight = false,
    extraClasses,
  } = options;

  const baseClass = 'sp-card';

  const variantClasses: Record<SpectreCardVariant, string> = {
    elevated: 'sp-card--elevated',
    outline: 'sp-card--outline',
    ghost: 'sp-card--ghost',
  };

  const classes: string[] = [baseClass, variantClasses[variant]];

  if (padded) {
    classes.push('sp-card--padded');
  }

  if (interactive) {
    classes.push('sp-card--interactive');
  }

  if (fullHeight) {
    classes.push('sp-card--full');
  }

  if (extraClasses && extraClasses.trim().length > 0) {
    classes.push(extraClasses.trim());
  }

  return classes.filter(Boolean).join(' ');
};
