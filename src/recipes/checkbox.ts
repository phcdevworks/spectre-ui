import { cx } from '../internal/cx'

export interface CheckboxRecipeOptions {
  checked?: boolean
  disabled?: boolean
}

export function getCheckboxClasses(opts: CheckboxRecipeOptions = {}): string {
  const { checked = false, disabled = false } = opts

  return cx(
    'sp-checkbox-indicator',
    checked && 'sp-checkbox-indicator--checked',
    disabled && 'sp-checkbox-indicator--disabled'
  )
}
