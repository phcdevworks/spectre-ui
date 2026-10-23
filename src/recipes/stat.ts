import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const STAT_SIZES = {
  sm: true,
  md: true,
  lg: true,
  xl: true
} as const

const STAT_ALIGNS = {
  start: true,
  center: true,
  end: true
} as const

const STAT_SURFACES = {
  page: true,
  surface: true,
  inverse: true
} as const

const STAT_UNIT_TONES = {
  accent: true,
  action: true
} as const

export type StatSize = keyof typeof STAT_SIZES
export type StatAlign = keyof typeof STAT_ALIGNS
export type StatSurface = keyof typeof STAT_SURFACES
export type StatUnitTone = keyof typeof STAT_UNIT_TONES

export interface StatRecipeOptions {
  /** Type scale of the figure. */
  size?: StatSize
  align?: StatAlign
  /**
   * What the stat sits on, which picks the text roles: `page`
   * (`text.onPage.*`), `surface` for a card (`text.onSurface.*`), or
   * `inverse` (`text.onInverse.*`). The unit takes that role's `accent`.
   */
  surface?: StatSurface
  /**
   * Colour of the unit. `accent` (default) is the surface's text accent;
   * `action` is the theme's action colour (`action.onPage` /
   * `action.onSurface`, `spectre-tokens` 4.15.0). `inverse` has no action
   * role, so it keeps its accent.
   */
  unitTone?: StatUnitTone
}

/**
 * A single metric for stat rails, metric cards, and case-study figures.
 * Wraps a figure (with an optional accent-coloured unit) and a label.
 */
export function getStatClasses(opts: StatRecipeOptions = {}): string {
  const size = resolveOption({
    name: 'stat size',
    value: opts.size,
    allowed: STAT_SIZES,
    fallback: 'md'
  })

  const align = resolveOption({
    name: 'stat align',
    value: opts.align,
    allowed: STAT_ALIGNS,
    fallback: 'start'
  })

  const surface = resolveOption({
    name: 'stat surface',
    value: opts.surface,
    allowed: STAT_SURFACES,
    fallback: 'page'
  })

  const unitTone = resolveOption({
    name: 'stat unit tone',
    value: opts.unitTone,
    allowed: STAT_UNIT_TONES,
    fallback: 'accent'
  })

  return cx(
    'sp-stat',
    `sp-stat--${size}`,
    align !== 'start' && `sp-stat--align-${align}`,
    surface !== 'page' && `sp-stat--on-${surface}`,
    unitTone !== 'accent' && `sp-stat--unit-${unitTone}`
  )
}

/** The number itself; uses tabular numerals. */
export function getStatFigureClasses(): string {
  return 'sp-stat__figure'
}

/** A unit or suffix inside the figure (`%`, `x`, `k+`), accent-coloured. */
export function getStatUnitClasses(): string {
  return 'sp-stat__unit'
}

export function getStatLabelClasses(): string {
  return 'sp-stat__label'
}
