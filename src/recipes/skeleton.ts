import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SKELETON_SHAPES = {
  text: true,
  rect: true,
  circle: true,
} as const

export type SkeletonShape = keyof typeof SKELETON_SHAPES

export interface SkeletonRecipeOptions {
  /**
   * `text` is one line tall at the body size, `rect` fills the box the
   * consumer sizes, `circle` is a square-ratio round placeholder (avatars).
   */
  shape?: SkeletonShape
  /**
   * Sweeps the `component.skeleton.shimmer` highlight across the base color.
   * The sweep stops under `prefers-reduced-motion: reduce`.
   */
  animated?: boolean
}

export function getSkeletonClasses(opts: SkeletonRecipeOptions = {}): string {
  const { shape: shapeInput, animated = false } = opts

  const shape = resolveOption({
    name: 'skeleton shape',
    value: shapeInput,
    allowed: SKELETON_SHAPES,
    fallback: 'text',
  })

  return cx(
    'sp-skeleton',
    `sp-skeleton--${shape}`,
    animated && 'sp-skeleton--animated'
  )
}
