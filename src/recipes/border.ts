import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import {
  BORDER_STYLE_STEPS,
  BORDER_WIDTH_STEPS,
  RADIUS_STEPS
} from '../internal/utility-scales.generated'

// Thick borders on --sp-border-width-thick in surface.divider; any
// getColorClasses / getPaletteClasses border color overrides the color.
const BORDER_THICK_SIDES = {
  all: 'sp-border-thick',
  t: 'sp-border-thick-t',
  r: 'sp-border-thick-r',
  b: 'sp-border-thick-b',
  l: 'sp-border-thick-l'
} as const

export type BorderThickSide = keyof typeof BORDER_THICK_SIDES
export type BorderStyle = (typeof BORDER_STYLE_STEPS)[number]
export type BorderWidth = (typeof BORDER_WIDTH_STEPS)[number]
export type RadiusStep = (typeof RADIUS_STEPS)[number]

export interface BorderRecipeOptions {
  thick?: BorderThickSide
  /** `--sp-border-style-*` */
  style?: BorderStyle
  /** `--sp-border-width-*` */
  width?: BorderWidth
  /** `--sp-radius-*` */
  radius?: RadiusStep
}

export function getBorderClasses(opts: BorderRecipeOptions = {}): string {
  const { thick, style, width, radius } = opts

  return cx(
    thick &&
      BORDER_THICK_SIDES[
        resolveOption({
          name: 'border thick side',
          value: thick,
          allowed: BORDER_THICK_SIDES,
          fallback: 'all'
        })
      ],
    style &&
      `sp-border-style-${resolveOption({
        name: 'border style',
        value: style,
        allowed: BORDER_STYLE_STEPS,
        fallback: 'solid'
      })}`,
    width &&
      `sp-border-width-${resolveOption({
        name: 'border width',
        value: width,
        allowed: BORDER_WIDTH_STEPS,
        fallback: 'base'
      })}`,
    radius &&
      `sp-rounded-${resolveOption({
        name: 'border radius',
        value: radius,
        allowed: RADIUS_STEPS,
        fallback: 'md'
      })}`
  )
}
