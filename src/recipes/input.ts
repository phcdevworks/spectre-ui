export type InputState = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputRecipeOptions {
  state?: InputState;
  size?: InputSize;
  fullWidth?: boolean;
}

/**
 * Generate Spectre input classes.
 *
 * Rules:
 * - Base class: "sp-input"
 * - State:
 *   - "default" => no state modifier
 *   - "error"   => "sp-input--error"
 *   - "success" => "sp-input--success"
 * - Size (default: md):
 *   - "sp-input--sm"
 *   - "sp-input--md"
 *   - "sp-input--lg"
 * - fullWidth: add "sp-input--full"
 */
export function getInputClasses(opts: InputRecipeOptions = {}): string {
  const {
    state = 'default',
    size = 'md',
    fullWidth = false,
  } = opts;

  const classes: string[] = [];

  // Base
  classes.push('sp-input');

  // State
  if (state === 'error') {
    classes.push('sp-input--error');
  } else if (state === 'success') {
    classes.push('sp-input--success');
  }

  // Size
  const sizeMap: Record<InputSize, string> = {
    sm: 'sp-input--sm',
    md: 'sp-input--md',
    lg: 'sp-input--lg',
  };
  classes.push(sizeMap[size]);

  // Flags
  if (fullWidth) {
    classes.push('sp-input--full');
  }

  return classes.filter(Boolean).join(' ').trim();
}
