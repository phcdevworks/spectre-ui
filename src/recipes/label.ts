import { cx } from '../internal/cx'

export interface LabelRecipeOptions {
  disabled?: boolean
  required?: boolean
}

export function getLabelClasses(opts: LabelRecipeOptions = {}): string {
  const { disabled = false, required = false } = opts

  return cx(
    'sp-form-label',
    disabled && 'sp-form-label--disabled',
    required && 'sp-form-label--required'
  )
}
