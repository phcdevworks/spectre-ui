import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import {
  RESPONSIVE_BREAKPOINTS,
  SPACE_STEPS,
  type SpaceStepValue
} from '../internal/utility-scales.generated'

export type SpaceStep = SpaceStepValue
export type SpacingBreakpoint = (typeof RESPONSIVE_BREAKPOINTS)[number]
type MarginValue = SpaceStep | 'auto'

// Option name → generated utility axis (`sp-{axis}-{step}`).
const SPACING_AXIS_CLASSES = {
  p: 'p',
  px: 'px',
  py: 'py',
  pt: 'pt',
  pr: 'pr',
  pb: 'pb',
  pl: 'pl',
  m: 'm',
  mx: 'mx',
  my: 'my',
  mt: 'mt',
  mr: 'mr',
  mb: 'mb',
  ml: 'ml',
  gap: 'gap',
  gapX: 'gap-x',
  gapY: 'gap-y',
  basis: 'basis'
} as const

// Margin axes also take `auto` (`sp-mx-auto`).
const MARGIN_AXES = {
  m: true,
  mx: true,
  my: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true
} as const

type SpacingAxis = keyof typeof SPACING_AXIS_CLASSES

/** Each axis takes a step from the `--sp-space-*` scale. */
export interface SpacingValues {
  p?: SpaceStep
  px?: SpaceStep
  py?: SpaceStep
  pt?: SpaceStep
  pr?: SpaceStep
  pb?: SpaceStep
  pl?: SpaceStep
  m?: MarginValue
  mx?: MarginValue
  my?: MarginValue
  mt?: MarginValue
  mr?: MarginValue
  mb?: MarginValue
  ml?: MarginValue
  gap?: SpaceStep
  gapX?: SpaceStep
  gapY?: SpaceStep
  basis?: SpaceStep
}

/**
 * Base spacing plus per-breakpoint overrides that apply from that
 * breakpoint up, e.g. `{ p: 16, lg: { p: 32 } }`.
 */
export interface SpacingRecipeOptions extends SpacingValues {
  sm?: SpacingValues
  md?: SpacingValues
  lg?: SpacingValues
  xl?: SpacingValues
  '2xl'?: SpacingValues
}

const spacingClasses = (values: SpacingValues, prefix: string): string[] =>
  (Object.keys(SPACING_AXIS_CLASSES) as SpacingAxis[]).flatMap((axis) => {
    const input = values[axis]
    if (input === undefined) return []
    const value =
      input === 'auto' && axis in MARGIN_AXES
        ? 'auto'
        : resolveOption({
            name: `spacing ${axis}`,
            value: String(input),
            allowed: SPACE_STEPS,
            fallback: '0'
          })
    return [`sp-${prefix}${SPACING_AXIS_CLASSES[axis]}-${value}`]
  })

export function getSpacingClasses(opts: SpacingRecipeOptions = {}): string {
  return cx(
    ...spacingClasses(opts, ''),
    ...RESPONSIVE_BREAKPOINTS.flatMap((breakpoint) => {
      const values = opts[breakpoint]
      return values ? spacingClasses(values, `${breakpoint}-`) : []
    })
  )
}
