import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TEXTAREA_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

const TEXTAREA_STATES = {
  default: true,
  invalid: true,
  success: true
} as const

export type TextareaSize = keyof typeof TEXTAREA_SIZES
export type TextareaState = keyof typeof TEXTAREA_STATES

export interface TextareaRecipeOptions {
  size?: TextareaSize
  state?: TextareaState
  fullWidth?: boolean
  pill?: boolean
  disabled?: boolean
  focused?: boolean
  loading?: boolean
}

export function getTextareaClasses(opts: TextareaRecipeOptions = {}): string {
  const {
    size: sizeInput,
    state: stateInput,
    fullWidth = false,
    pill = false,
    disabled = false,
    focused = false,
    loading = false
  } = opts

  const size = resolveOption({
    name: 'textarea size',
    value: sizeInput,
    allowed: TEXTAREA_SIZES,
    fallback: 'md'
  })

  const state = resolveOption({
    name: 'textarea state',
    value: stateInput,
    allowed: TEXTAREA_STATES,
    fallback: 'default'
  })

  return cx(
    'sp-textarea',
    `sp-textarea--${size}`,
    fullWidth && 'sp-textarea--full',
    pill && 'sp-textarea--pill',
    state === 'invalid' && 'sp-textarea--invalid',
    state === 'success' && 'sp-textarea--success',
    disabled && 'sp-textarea--disabled',
    loading && 'sp-textarea--loading',
    focused && 'sp-textarea--focus is-focus'
  )
}
