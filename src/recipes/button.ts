export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTone = 'default' | 'success' | 'warning' | 'danger';

export interface ButtonRecipeOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
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
 * - Variant: "sp-btn--primary" / "sp-btn--secondary" / "sp-btn--ghost" / "sp-btn--danger"
 *   - default variant is "primary"
 * - Size: "sp-btn--sm" / "sp-btn--md" / "sp-btn--lg"
 *   - default size is "md"
 * - Tone: "sp-btn--tone-success" / "sp-btn--tone-warning" / "sp-btn--tone-danger"
 *   - default tone is "default" (no tone class)
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
    tone = 'default',
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
  };
  classes.push(variantMap[variant]);

  // Size
  const sizeMap: Record<ButtonSize, string> = {
    sm: 'sp-btn--sm',
    md: 'sp-btn--md',
    lg: 'sp-btn--lg',
  };
  classes.push(sizeMap[size]);

  // Tone (optional)
  if (tone !== 'default') {
    const toneMap: Record<Exclude<ButtonTone, 'default'>, string> = {
      success: 'sp-btn--tone-success',
      warning: 'sp-btn--tone-warning',
      danger: 'sp-btn--tone-danger',
    };
    classes.push(toneMap[tone as Exclude<ButtonTone, 'default'>]);
  }

  // Flags
  if (fullWidth) classes.push('sp-btn--full');
  if (loading) classes.push('sp-btn--loading');
  if (disabled) classes.push('sp-btn--disabled');
  if (iconOnly) classes.push('sp-btn--icon');

  // Final class string
  return classes.filter(Boolean).join(' ').trim();
}
