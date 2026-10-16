import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import {
  PALETTE_COLORS,
  SEMANTIC_COLORS,
  SINGLE_COLORS
} from '../internal/utility-scales.generated'

/**
 * A raw semantic scale step (`brand-500`, `error-700`, …) from
 * `--sp-color-{scale}-{step}`, or `black` / `white`. These are fixed colors
 * and do not follow color mode; prefer the mode-aware recipes (text
 * variants, surfaces) where one fits.
 */
export type SemanticColor =
  | (typeof SEMANTIC_COLORS)[number]
  | (typeof SINGLE_COLORS)[number]

/** A raw palette hue step (`blue-500`, `phcdevworks-paper-100`, …). */
export type PaletteColor = (typeof PALETTE_COLORS)[number]

const COLOR_PROPERTIES = ['text', 'bg', 'border'] as const

export interface ColorRecipeOptions {
  text?: SemanticColor
  bg?: SemanticColor
  border?: SemanticColor
}

export interface PaletteRecipeOptions {
  text?: PaletteColor
  bg?: PaletteColor
  border?: PaletteColor
}

const isSingleColor = (value: string): boolean =>
  (SINGLE_COLORS as readonly string[]).includes(value)

export function getColorClasses(opts: ColorRecipeOptions = {}): string {
  return cx(
    ...COLOR_PROPERTIES.map((property) => {
      const input = opts[property]
      if (input === undefined) return undefined
      if (isSingleColor(input)) return `sp-${property}-${input}`
      const color = resolveOption({
        name: `${property} color`,
        value: input,
        allowed: SEMANTIC_COLORS as readonly string[],
        fallback: SEMANTIC_COLORS[0]
      })
      return `sp-${property}-color-${color}`
    })
  )
}

export function getPaletteClasses(opts: PaletteRecipeOptions = {}): string {
  return cx(
    ...COLOR_PROPERTIES.map((property) => {
      const input = opts[property]
      if (input === undefined) return undefined
      const color = resolveOption({
        name: `${property} palette color`,
        value: input,
        allowed: PALETTE_COLORS as readonly string[],
        fallback: PALETTE_COLORS[0]
      })
      return `sp-${property}-${color}`
    })
  )
}
