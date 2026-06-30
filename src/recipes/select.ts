import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SELECT_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

const SELECT_STATES = {
  default: true,
  invalid: true,
  success: true
} as const

export type SelectSize = keyof typeof SELECT_SIZES
export type SelectState = keyof typeof SELECT_STATES

export interface SelectRecipeOptions {
  size?: SelectSize
  state?: SelectState
  fullWidth?: boolean
  pill?: boolean
  disabled?: boolean
  focused?: boolean
  loading?: boolean
}

export function getSelectClasses(opts: SelectRecipeOptions = {}): string {
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
    name: 'select size',
    value: sizeInput,
    allowed: SELECT_SIZES,
    fallback: 'md'
  })

  const state = resolveOption({
    name: 'select state',
    value: stateInput,
    allowed: SELECT_STATES,
    fallback: 'default'
  })

  return cx(
    'sp-select',
    `sp-select--${size}`,
    fullWidth && 'sp-select--full',
    pill && 'sp-select--pill',
    state === 'invalid' && 'sp-select--invalid',
    state === 'success' && 'sp-select--success',
    disabled && 'sp-select--disabled',
    loading && 'sp-select--loading',
    focused && 'sp-select--focus is-focus'
  )
}
