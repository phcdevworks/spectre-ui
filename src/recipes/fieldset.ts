import { cx } from '../internal/cx'

export interface FieldsetRecipeOptions {
  disabled?: boolean
}

export function getFieldsetClasses(opts: FieldsetRecipeOptions = {}): string {
  const { disabled = false } = opts

  return cx('sp-fieldset', disabled && 'sp-fieldset--disabled')
}

export function getFieldsetLegendClasses(): string {
  return cx('sp-fieldset__legend')
}
