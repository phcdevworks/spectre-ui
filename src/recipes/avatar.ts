import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const AVATAR_SIZES = {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
} as const

const AVATAR_SHAPES = {
  circle: true,
  square: true,
} as const

export type AvatarSize = keyof typeof AVATAR_SIZES
export type AvatarShape = keyof typeof AVATAR_SHAPES

export interface AvatarRecipeOptions {
  size?: AvatarSize
  shape?: AvatarShape
  disabled?: boolean
  loading?: boolean
  interactive?: boolean
  hovered?: boolean
  focused?: boolean
  active?: boolean
  fullWidth?: boolean
  placeholder?: boolean
}

export function getAvatarClasses(opts: AvatarRecipeOptions = {}): string {
  const {
    size: sizeInput,
    shape: shapeInput,
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    fullWidth = false,
    placeholder = false,
  } = opts

  const size = resolveOption({
    name: 'avatar size',
    value: sizeInput,
    allowed: AVATAR_SIZES,
    fallback: 'md',
  })

  const shape = resolveOption({
    name: 'avatar shape',
    value: shapeInput,
    allowed: AVATAR_SHAPES,
    fallback: 'circle',
  })

  return cx(
    'sp-avatar',
    `sp-avatar--${size}`,
    `sp-avatar--${shape}`,
    disabled && 'sp-avatar--disabled',
    loading && 'sp-avatar--loading',
    interactive && 'sp-avatar--interactive',
    hovered && 'sp-avatar--hover is-hover',
    focused && 'sp-avatar--focus is-focus',
    active && 'sp-avatar--active is-active',
    fullWidth && 'sp-avatar--full',
    placeholder && 'sp-avatar--placeholder'
  )
}
