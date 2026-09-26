import { cx } from '../internal/cx'

export interface InputGroupRecipeOptions {
  disabled?: boolean
}

/**
 * Fuses addons, inputs, selects, file inputs, and buttons into one control:
 * inner corners are squared and adjacent borders overlap into a single seam.
 */
export function getInputGroupClasses(opts: InputGroupRecipeOptions = {}): string {
  const { disabled = false } = opts

  return cx('sp-input-group', disabled && 'sp-input-group--disabled')
}

/** Static text or icon attached to either end of the group. */
export function getInputGroupAddonClasses(): string {
  return 'sp-input-group__addon'
}
