import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TEXTAREA_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

export type TextareaSize = keyof typeof TEXTAREA_SIZES

export interface TextareaRecipeOptions {
  size?: TextareaSize
  fullWidth?: boolean
  pill?: boolean
  disabled?: boolean
  focused?: boolean
}

export function getTextareaClasses(opts: TextareaRecipeOptions = {}): string {
  const {
    size: sizeInput,
    fullWidth = false,
    pill = false,
    disabled = false,
    focused = false
  } = opts

  const size = resolveOption({
    name: 'textarea size',
    value: sizeInput,
    allowed: TEXTAREA_SIZES,
    fallback: 'md'
  })

  return cx(
    'sp-textarea',
    `sp-textarea--${size}`,
    fullWidth && 'sp-textarea--full',
    pill && 'sp-textarea--pill',
    disabled && 'sp-textarea--disabled',
    focused && 'sp-textarea--focus is-focus'
  )
}
