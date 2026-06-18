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

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12
export type GridGap = keyof typeof GRID_GAPS

export interface GridRecipeOptions {
  columns?: GridColumns
  gap?: GridGap
}

export function getGridClasses(opts: GridRecipeOptions = {}): string {
  const { columns: columnsInput, gap: gapInput } = opts

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

  return cx('sp-grid', `sp-grid--gap-${gap}`, `sp-grid-cols-${columns}`)
}
