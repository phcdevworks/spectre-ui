import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TAG_VARIANTS = {
  default: true,
  outline: true,
} as const

const TAG_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const

export type TagVariant = keyof typeof TAG_VARIANTS
export type TagSize = keyof typeof TAG_SIZES

export interface TagRecipeOptions {
  variant?: TagVariant
  size?: TagSize
  dismissible?: boolean
  selected?: boolean
  disabled?: boolean
  loading?: boolean
  interactive?: boolean
  hovered?: boolean
  focused?: boolean
  active?: boolean
  fullWidth?: boolean
}

export function getTagClasses(opts: TagRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    dismissible = false,
    selected = false,
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    fullWidth = false,
  } = opts

  const variant = resolveOption({
    name: 'tag variant',
    value: variantInput,
    allowed: TAG_VARIANTS,
    fallback: 'default',
  })

  const size =
    sizeInput &&
    resolveOption({
      name: 'tag size',
      value: sizeInput,
      allowed: TAG_SIZES,
      fallback: 'md',
    })

  return cx(
    'sp-tag',
    `sp-tag--${variant}`,
    size && `sp-tag--${size}`,
    dismissible && 'sp-tag--dismissible',
    selected && 'sp-tag--selected',
    disabled && 'sp-tag--disabled',
    loading && 'sp-tag--loading',
    interactive && 'sp-tag--interactive',
    hovered && 'sp-tag--hover is-hover',
    focused && 'sp-tag--focus is-focus',
    active && 'sp-tag--active is-active',
    fullWidth && 'sp-tag--full'
  )
}
