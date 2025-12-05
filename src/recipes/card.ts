export type CardVariant = 'elevated' | 'outline' | 'ghost';

export interface CardRecipeOptions {
  variant?: CardVariant;
  interactive?: boolean; // hover/focus styles
  padded?: boolean; // apply default padding
  fullHeight?: boolean;
}

/**
 * Generate Spectre card classes.
 *
 * Rules:
 * - Base class: "sp-card"
 * - Variant (default: elevated):
 *   - "sp-card--elevated"
 *   - "sp-card--outline"
 *   - "sp-card--ghost"
 * - interactive: add "sp-card--interactive"
 * - padded: add "sp-card--padded"
 * - fullHeight: add "sp-card--full"
 */
export function getCardClasses(opts: CardRecipeOptions = {}): string {
  const {
    variant = 'elevated',
    interactive = false,
    padded = false,
    fullHeight = false,
  } = opts;

  const classes: string[] = [];

  // Base
  classes.push('sp-card');

  // Variant
  const variantMap: Record<CardVariant, string> = {
    elevated: 'sp-card--elevated',
    outline: 'sp-card--outline',
    ghost: 'sp-card--ghost',
  };
  classes.push(variantMap[variant]);

  // Flags
  if (interactive) classes.push('sp-card--interactive');
  if (padded) classes.push('sp-card--padded');
  if (fullHeight) classes.push('sp-card--full');

  return classes.filter(Boolean).join(' ').trim();
}
