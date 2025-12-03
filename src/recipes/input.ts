export type SpectreInputState = 'default' | 'error' | 'success' | 'disabled';

export interface GetInputClassesOptions {
  state?: SpectreInputState;
  fullWidth?: boolean;
  /**
   * Space-separated extra classes appended at the end.
   */
  extraClasses?: string;
}

/**
 * Recipe helper for input class generation.
 *
 * Examples:
 * - getInputClasses()
 *   => "sp-input"
 *
 * - getInputClasses({ state: "error" })
 *   => "sp-input sp-input--error"
 */
export const getInputClasses = (
  options: GetInputClassesOptions = {},
): string => {
  const {
    state = 'default',
    fullWidth = false,
    extraClasses,
  } = options;

  const baseClass = 'sp-input';

  const stateClasses: Record<SpectreInputState, string> = {
    default: '',
    error: 'sp-input--error',
    success: 'sp-input--success',
    disabled: 'sp-input--disabled',
  };

  const classes: string[] = [baseClass, stateClasses[state]];

  if (fullWidth) {
    classes.push('sp-input--full');
  }

  if (extraClasses && extraClasses.trim().length > 0) {
    classes.push(extraClasses.trim());
  }

  return classes.filter(Boolean).join(' ');
};
