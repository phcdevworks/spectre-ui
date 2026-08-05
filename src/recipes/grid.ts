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

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12
export type GridGap = keyof typeof GRID_GAPS
export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'

export interface GridSpanOptions {
  base?: GridSpan
  md?: GridSpan
  lg?: GridSpan
}

export interface GridRecipeOptions {
  columns?: GridColumns
  gap?: GridGap
  span?: GridSpan | GridSpanOptions
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

export function getGridClasses(opts: GridRecipeOptions = {}): string {
  const { columns: columnsInput, gap: gapInput, span: spanInput } = opts

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

  return cx(
    'sp-grid',
    `sp-grid--gap-${gap}`,
    `sp-grid-cols-${columns}`,
    baseSpan && `sp-col-span-${baseSpan}`,
    mdSpan && `sp-md-col-span-${mdSpan}`,
    lgSpan && `sp-lg-col-span-${lgSpan}`
  )
}
