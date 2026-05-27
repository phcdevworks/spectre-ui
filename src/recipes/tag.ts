import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TAG_VARIANTS = {
  default: true,
  outline: true,
} as const

export type TagVariant = keyof typeof TAG_VARIANTS

export interface TagRecipeOptions {
  variant?: TagVariant
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

  return cx(
    'sp-tag',
    `sp-tag--${variant}`,
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
