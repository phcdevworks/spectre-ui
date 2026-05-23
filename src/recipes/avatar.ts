import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const AVATAR_SIZES = {
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
}

export function getAvatarClasses(opts: AvatarRecipeOptions = {}): string {
  const { size: sizeInput, shape: shapeInput } = opts

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

  return cx('sp-avatar', `sp-avatar--${size}`, `sp-avatar--${shape}`)
}
