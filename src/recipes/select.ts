import { cx } from '../internal/cx'

export interface SelectRecipeOptions {
  disabled?: boolean
  focused?: boolean
}

export function getSelectClasses(opts: SelectRecipeOptions = {}): string {
  const { disabled = false, focused = false } = opts

  return cx(
    'sp-select',
    disabled && 'sp-select--disabled',
    focused && 'sp-select--focus is-focus'
  )
}
