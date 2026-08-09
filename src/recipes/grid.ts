import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const GRID_COLUMNS = {
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '6': true,
  '12': true,
} as const

const GRID_GAPS = {
  sm: true,
  md: true,
  lg: true,
} as const

const GRID_SPANS = {
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  '6': true,
  '7': true,
  '8': true,
  '9': true,
  '10': true,
  '11': true,
  '12': true,
  full: true,
} as const

const GRID_OFFSETS = {
  '0': true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  '6': true,
  '7': true,
  '8': true,
  '9': true,
  '10': true,
  '11': true,
} as const

const GRID_LEADING_WEIGHTS = {
  '1_5': true,
  '1_6': true,
  '2': true,
  '2_5': true,
  '3': true,
} as const

const GRID_FIXED_TRACK_COUNTS = {
  '1': true,
  '2': true,
  '3': true,
  '4': true,
} as const

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12
export type GridGap = keyof typeof GRID_GAPS
export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'
export type GridOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type GridLeadingWeight = 1.5 | 1.6 | 2 | 2.5 | 3
export type GridFixedTrackCount = 1 | 2 | 3 | 4

export interface GridSpanOptions {
  base?: GridSpan
  md?: GridSpan
  lg?: GridSpan
}

export interface GridOffsetOptions {
  base?: GridOffset
  md?: GridOffset
  lg?: GridOffset
}

export interface GridLeadingWeightOptions {
  base?: GridLeadingWeight
  md?: GridLeadingWeight
  lg?: GridLeadingWeight
}

/**
 * Leading-weight tracks: one wider leading column sized by `weight` fr,
 * followed by `columns - 1` equal 1fr columns. Matches an unequal-column
 * layout (e.g. a footer brand column beside equal-width link columns)
 * without a downstream consumer hand-rolling grid-template-columns. A
 * plain `weight` applies at the `lg` breakpoint only, matching the
 * original mega-menu/footer evidence; pass `{ base, md, lg }` for
 * per-breakpoint control.
 */
export interface GridLeadingTracksOptions {
  weight: GridLeadingWeight | GridLeadingWeightOptions
}

/**
 * Fixed-width repeated tracks, sized from --sp-space-240 (15rem), matching
 * the mega-menu column width evidence from the Phase 8 downstream drift
 * audit.
 */
export interface GridFixedTracksOptions {
  count: GridFixedTrackCount
}

export interface GridRecipeOptions {
  columns?: GridColumns
  gap?: GridGap
  columnGap?: GridGap
  rowGap?: GridGap
  span?: GridSpan | GridSpanOptions
  offset?: GridOffset | GridOffsetOptions
  rowSpan?: GridSpan | GridSpanOptions
  rowOffset?: GridOffset | GridOffsetOptions
  leadingTracks?: GridLeadingTracksOptions
  fixedTracks?: GridFixedTracksOptions
}

function resolveSpan(value: GridSpan | undefined, name: string): string | undefined {
  if (value === undefined) return undefined
  return resolveOption({
    name,
    value: String(value),
    allowed: GRID_SPANS,
    fallback: '1',
  })
}

function resolveOffset(value: GridOffset | undefined, name: string): string | undefined {
  if (value === undefined) return undefined
  return resolveOption({
    name,
    value: String(value),
    allowed: GRID_OFFSETS,
    fallback: '0',
  })
}

function weightToToken(weight: GridLeadingWeight): string {
  return String(weight).replace('.', '_')
}

function resolveLeadingWeight(
  value: GridLeadingWeight | undefined,
  name: string
): string | undefined {
  if (value === undefined) return undefined
  return resolveOption({
    name,
    value: weightToToken(value),
    allowed: GRID_LEADING_WEIGHTS,
    fallback: '1_5',
  })
}

function resolveFixedTrackCount(
  value: GridFixedTrackCount | undefined
): string | undefined {
  if (value === undefined) return undefined
  return resolveOption({
    name: 'grid fixed track count',
    value: String(value),
    allowed: GRID_FIXED_TRACK_COUNTS,
    fallback: '1',
  })
}

export function getGridClasses(opts: GridRecipeOptions = {}): string {
  const {
    columns: columnsInput,
    gap: gapInput,
    columnGap: columnGapInput,
    rowGap: rowGapInput,
    span: spanInput,
    offset: offsetInput,
    rowSpan: rowSpanInput,
    rowOffset: rowOffsetInput,
    leadingTracks,
    fixedTracks,
  } = opts

  const columns = resolveOption({
    name: 'grid columns',
    value: columnsInput === undefined ? undefined : String(columnsInput),
    allowed: GRID_COLUMNS,
    fallback: '1',
  })

  const gap = resolveOption({
    name: 'grid gap',
    value: gapInput,
    allowed: GRID_GAPS,
    fallback: 'md',
  })

  const columnGap = columnGapInput
    ? resolveOption({
        name: 'grid column gap',
        value: columnGapInput,
        allowed: GRID_GAPS,
        fallback: 'md',
      })
    : undefined

  const rowGap = rowGapInput
    ? resolveOption({
        name: 'grid row gap',
        value: rowGapInput,
        allowed: GRID_GAPS,
        fallback: 'md',
      })
    : undefined

  const isSpanOptions = typeof spanInput === 'object'

  const baseSpan = resolveSpan(
    isSpanOptions ? spanInput.base : spanInput,
    'grid column span'
  )
  const mdSpan = resolveSpan(
    isSpanOptions ? spanInput.md : undefined,
    'grid column span (md)'
  )
  const lgSpan = resolveSpan(
    isSpanOptions ? spanInput.lg : undefined,
    'grid column span (lg)'
  )

  const isOffsetOptions = typeof offsetInput === 'object'

  const baseOffset = resolveOffset(
    isOffsetOptions ? offsetInput.base : offsetInput,
    'grid column offset'
  )
  const mdOffset = resolveOffset(
    isOffsetOptions ? offsetInput.md : undefined,
    'grid column offset (md)'
  )
  const lgOffset = resolveOffset(
    isOffsetOptions ? offsetInput.lg : undefined,
    'grid column offset (lg)'
  )

  const isRowSpanOptions = typeof rowSpanInput === 'object'

  const baseRowSpan = resolveSpan(
    isRowSpanOptions ? rowSpanInput.base : rowSpanInput,
    'grid row span'
  )
  const mdRowSpan = resolveSpan(
    isRowSpanOptions ? rowSpanInput.md : undefined,
    'grid row span (md)'
  )
  const lgRowSpan = resolveSpan(
    isRowSpanOptions ? rowSpanInput.lg : undefined,
    'grid row span (lg)'
  )

  const isRowOffsetOptions = typeof rowOffsetInput === 'object'

  const baseRowOffset = resolveOffset(
    isRowOffsetOptions ? rowOffsetInput.base : rowOffsetInput,
    'grid row offset'
  )
  const mdRowOffset = resolveOffset(
    isRowOffsetOptions ? rowOffsetInput.md : undefined,
    'grid row offset (md)'
  )
  const lgRowOffset = resolveOffset(
    isRowOffsetOptions ? rowOffsetInput.lg : undefined,
    'grid row offset (lg)'
  )

  const isLeadingWeightOptions = typeof leadingTracks?.weight === 'object'

  const lgLeadingWeight = resolveLeadingWeight(
    isLeadingWeightOptions
      ? (leadingTracks?.weight as GridLeadingWeightOptions).lg
      : (leadingTracks?.weight as GridLeadingWeight | undefined),
    'grid leading track weight (lg)'
  )
  const baseLeadingWeight = isLeadingWeightOptions
    ? resolveLeadingWeight(
        (leadingTracks?.weight as GridLeadingWeightOptions).base,
        'grid leading track weight'
      )
    : undefined
  const mdLeadingWeight = isLeadingWeightOptions
    ? resolveLeadingWeight(
        (leadingTracks?.weight as GridLeadingWeightOptions).md,
        'grid leading track weight (md)'
      )
    : undefined

  const fixedTrackCount = resolveFixedTrackCount(fixedTracks?.count)

  return cx(
    'sp-grid',
    `sp-grid--gap-${gap}`,
    columnGap && `sp-grid--column-gap-${columnGap}`,
    rowGap && `sp-grid--row-gap-${rowGap}`,
    !fixedTrackCount && `sp-grid-cols-${columns}`,
    fixedTrackCount && `sp-grid-fixed-tracks-${fixedTrackCount}`,
    baseLeadingWeight && `sp-grid-leading-${baseLeadingWeight}-of-${columns}`,
    mdLeadingWeight && `sp-md-grid-leading-${mdLeadingWeight}-of-${columns}`,
    lgLeadingWeight && `sp-lg-grid-leading-${lgLeadingWeight}-of-${columns}`,
    baseSpan && `sp-col-span-${baseSpan}`,
    mdSpan && `sp-md-col-span-${mdSpan}`,
    lgSpan && `sp-lg-col-span-${lgSpan}`,
    baseOffset && baseOffset !== '0' && `sp-col-offset-${baseOffset}`,
    mdOffset && mdOffset !== '0' && `sp-md-col-offset-${mdOffset}`,
    lgOffset && lgOffset !== '0' && `sp-lg-col-offset-${lgOffset}`,
    baseRowSpan && `sp-row-span-${baseRowSpan}`,
    mdRowSpan && `sp-md-row-span-${mdRowSpan}`,
    lgRowSpan && `sp-lg-row-span-${lgRowSpan}`,
    baseRowOffset && baseRowOffset !== '0' && `sp-row-offset-${baseRowOffset}`,
    mdRowOffset && mdRowOffset !== '0' && `sp-md-row-offset-${mdRowOffset}`,
    lgRowOffset && lgRowOffset !== '0' && `sp-lg-row-offset-${lgRowOffset}`
  )
}
