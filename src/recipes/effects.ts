import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import {
  ASPECT_RATIO_STEPS,
  ICON_STEPS,
  OPACITY_STEPS,
  SHADOW_INSET_STEPS,
  SHADOW_STEPS,
  Z_INDEX_STEPS
} from '../internal/utility-scales.generated'

// `soft` and `strong` are the named shadow aliases in utilities.css
// (`shadow.md` and `shadow.lg`).
const SHADOW_VALUES = [...SHADOW_STEPS, 'soft', 'strong'] as const

export type ShadowStep = (typeof SHADOW_VALUES)[number]
export type ShadowInsetStep = (typeof SHADOW_INSET_STEPS)[number]
export type OpacityRole = (typeof OPACITY_STEPS)[number]
export type ZIndexRole = (typeof Z_INDEX_STEPS)[number]
export type IconSize = (typeof ICON_STEPS)[number]
export type AspectRatio = (typeof ASPECT_RATIO_STEPS)[number]

export interface ShadowRecipeOptions {
  /** `--sp-shadow-*`, or the `soft` / `strong` aliases. */
  shadow?: ShadowStep
  /** `--sp-shadow-inset-*` */
  inset?: ShadowInsetStep
}

export function getShadowClasses(opts: ShadowRecipeOptions = {}): string {
  const { shadow, inset } = opts

  return cx(
    shadow &&
      `sp-shadow-${resolveOption({
        name: 'shadow',
        value: shadow,
        allowed: SHADOW_VALUES,
        fallback: 'md'
      })}`,
    inset &&
      `sp-shadow-inset-${resolveOption({
        name: 'inset shadow',
        value: inset,
        allowed: SHADOW_INSET_STEPS,
        fallback: 'md'
      })}`
  )
}

export interface OpacityRecipeOptions {
  /** A role from `--sp-opacity-*` (`disabled`, `hover`, `overlay`, …). */
  role?: OpacityRole
}

export function getOpacityClasses(opts: OpacityRecipeOptions = {}): string {
  return opts.role === undefined
    ? ''
    : `sp-opacity-${resolveOption({
        name: 'opacity role',
        value: opts.role,
        allowed: OPACITY_STEPS,
        fallback: 'disabled'
      })}`
}

export interface ZIndexRecipeOptions {
  /** A stacking layer from `--sp-z-index-*` (`dropdown`, `modal`, …). */
  layer?: ZIndexRole
}

export function getZIndexClasses(opts: ZIndexRecipeOptions = {}): string {
  return opts.layer === undefined
    ? ''
    : `sp-z-${resolveOption({
        name: 'z-index layer',
        value: opts.layer,
        allowed: Z_INDEX_STEPS,
        fallback: 'base'
      })}`
}

export interface IconSizeRecipeOptions {
  /** `--sp-icon-*`, applied to width and height. */
  size?: IconSize
}

export function getIconSizeClasses(opts: IconSizeRecipeOptions = {}): string {
  const size = resolveOption({
    name: 'icon size',
    value: opts.size,
    allowed: ICON_STEPS,
    fallback: 'md'
  })

  return cx(`sp-icon-${size}`)
}

export interface AspectRatioRecipeOptions {
  /** `--sp-aspect-ratio-*`, or `auto` to clear a ratio. */
  ratio?: AspectRatio | 'auto'
}

export function getAspectRatioClasses(
  opts: AspectRatioRecipeOptions = {}
): string {
  if (opts.ratio === 'auto') return 'sp-aspect-auto'

  const ratio = resolveOption({
    name: 'aspect ratio',
    value: opts.ratio,
    allowed: ASPECT_RATIO_STEPS,
    fallback: 'square'
  })

  return cx(`sp-aspect-${ratio}`)
}
