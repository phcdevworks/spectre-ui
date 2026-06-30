import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SELECT_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

export type SelectSize = keyof typeof SELECT_SIZES

export interface SelectRecipeOptions {
  size?: SelectSize
  fullWidth?: boolean
  pill?: boolean
  disabled?: boolean
  focused?: boolean
}

export function getSelectClasses(opts: SelectRecipeOptions = {}): string {
  const {
    size: sizeInput,
    fullWidth = false,
    pill = false,
    disabled = false,
    focused = false
  } = opts

  const size = resolveOption({
    name: 'select size',
    value: sizeInput,
    allowed: SELECT_SIZES,
    fallback: 'md'
  })

  return cx(
    'sp-select',
    `sp-select--${size}`,
    fullWidth && 'sp-select--full',
    pill && 'sp-select--pill',
    disabled && 'sp-select--disabled',
    focused && 'sp-select--focus is-focus'
  )
}
