import { cx } from '../internal/cx'

export interface RadioRecipeOptions {
  checked?: boolean
  disabled?: boolean
}

export function getRadioClasses(opts: RadioRecipeOptions = {}): string {
  const { checked = false, disabled = false } = opts

  return cx(
    'sp-radio-indicator',
    checked && 'sp-radio-indicator--checked',
    disabled && 'sp-radio-indicator--disabled'
  )
}
