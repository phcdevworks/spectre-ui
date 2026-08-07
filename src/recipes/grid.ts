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

/**
 * Leading-weight tracks: one wider leading column sized by `weight` fr,
 * followed by `columns - 1` equal 1fr columns. Matches an unequal-column
 * layout (e.g. a footer brand column beside equal-width link columns)
 * without a downstream consumer hand-rolling grid-template-columns.
 */
export interface GridLeadingTracksOptions {
  weight: GridLeadingWeight
}

/**
 * Fixed-width repeated tracks, sized from --sp-space-96 (the largest step
 * on the published space scale). There is no larger token step today, so
 * this is a token gap for wider fixed tracks (e.g. mega-menu columns) —
 * see TODO.md.
 */
export interface GridFixedTracksOptions {
  count: GridFixedTrackCount
}

export interface GridRecipeOptions {
  columns?: GridColumns
  gap?: GridGap
  span?: GridSpan | GridSpanOptions
  offset?: GridOffset | GridOffsetOptions
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
  value: GridLeadingWeight | undefined
): string | undefined {
  if (value === undefined) return undefined
  return resolveOption({
    name: 'grid leading track weight',
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
    span: spanInput,
    offset: offsetInput,
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

  const leadingWeight = resolveLeadingWeight(leadingTracks?.weight)
  const fixedTrackCount = resolveFixedTrackCount(fixedTracks?.count)

  return cx(
    'sp-grid',
    `sp-grid--gap-${gap}`,
    !fixedTrackCount && `sp-grid-cols-${columns}`,
    fixedTrackCount && `sp-grid-fixed-tracks-${fixedTrackCount}`,
    leadingWeight && `sp-lg-grid-leading-${leadingWeight}-of-${columns}`,
    baseSpan && `sp-col-span-${baseSpan}`,
    mdSpan && `sp-md-col-span-${mdSpan}`,
    lgSpan && `sp-lg-col-span-${lgSpan}`,
    baseOffset && baseOffset !== '0' && `sp-col-offset-${baseOffset}`,
    mdOffset && mdOffset !== '0' && `sp-md-col-offset-${mdOffset}`,
    lgOffset && lgOffset !== '0' && `sp-lg-col-offset-${lgOffset}`
  )
}
