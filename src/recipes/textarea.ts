import { cx } from '../internal/cx'

export interface TextareaRecipeOptions {
  disabled?: boolean
  focused?: boolean
}

export function getTextareaClasses(opts: TextareaRecipeOptions = {}): string {
  const { disabled = false, focused = false } = opts

  return cx(
    'sp-textarea',
    disabled && 'sp-textarea--disabled',
    focused && 'sp-textarea--focus is-focus'
  )
}
