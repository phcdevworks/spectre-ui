export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonRecipeOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
}

/**
 * Generate Spectre button classes.
 *
 * Rules:
 * - Base: "sp-btn"
 * - Variant: "sp-btn--primary" / "sp-btn--secondary" / "sp-btn--ghost" / "sp-btn--danger" / "sp-btn--success"
 *   - default variant is "primary"
 * - Size: "sp-btn--sm" / "sp-btn--md" / "sp-btn--lg"
 *   - default size is "md"
 * - fullWidth: add "sp-btn--full"
 * - loading: add "sp-btn--loading"
 * - disabled: add "sp-btn--disabled"
 * - iconOnly: add "sp-btn--icon"
 *
 * Must return a single space-joined, trimmed class string.
 */
export function getButtonClasses(opts: ButtonRecipeOptions = {}): string {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false,
  } = opts;

  const classes: string[] = [];

  // Base
  classes.push('sp-btn');

  // Variant
  const variantMap: Record<ButtonVariant, string> = {
    primary: 'sp-btn--primary',
    secondary: 'sp-btn--secondary',
    ghost: 'sp-btn--ghost',
    danger: 'sp-btn--danger',
    success: 'sp-btn--success',
  };
  classes.push(variantMap[variant]);

  // Size
  const sizeMap: Record<ButtonSize, string> = {
    sm: 'sp-btn--sm',
    md: 'sp-btn--md',
    lg: 'sp-btn--lg',
  };
  classes.push(sizeMap[size]);

  // Flags
  if (fullWidth) classes.push('sp-btn--full');
  if (loading) classes.push('sp-btn--loading');
  if (disabled) classes.push('sp-btn--disabled');
  if (iconOnly) classes.push('sp-btn--icon');

  // Final class string
  return classes.filter(Boolean).join(' ').trim();
}
