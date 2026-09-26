import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TABLE_SIZES = {
  sm: true,
  md: true
} as const

const TABLE_ROW_VARIANTS = {
  neutral: true,
  info: true,
  success: true,
  warning: true,
  danger: true
} as const

export type TableSize = keyof typeof TABLE_SIZES
export type TableRowVariant = keyof typeof TABLE_ROW_VARIANTS

export interface TableRecipeOptions {
  size?: TableSize
  /** Tints alternating body rows. */
  striped?: boolean
  /** Tints body rows under the pointer. */
  hoverable?: boolean
  /** Draws a border around every cell instead of row dividers only. */
  bordered?: boolean
}

export function getTableClasses(opts: TableRecipeOptions = {}): string {
  const {
    size: sizeInput,
    striped = false,
    hoverable = false,
    bordered = false
  } = opts

  const size = resolveOption({
    name: 'table size',
    value: sizeInput,
    allowed: TABLE_SIZES,
    fallback: 'md'
  })

  return cx(
    'sp-table',
    `sp-table--${size}`,
    striped && 'sp-table--striped',
    hoverable && 'sp-table--hover',
    bordered && 'sp-table--bordered'
  )
}

/** Horizontal-scroll wrapper so wide tables never overflow a narrow layout. */
export function getTableWrapperClasses(): string {
  return 'sp-table-wrapper'
}

export interface TableRowRecipeOptions {
  /** Contextual row role; omission renders a plain row. */
  variant?: TableRowVariant
  selected?: boolean
}

export function getTableRowClasses(opts: TableRowRecipeOptions = {}): string {
  const { variant: variantInput, selected = false } = opts

  const variantClass =
    variantInput === undefined
      ? false
      : `sp-table__row--${resolveOption({
          name: 'table row variant',
          value: variantInput,
          allowed: TABLE_ROW_VARIANTS,
          fallback: 'neutral'
        })}`

  return cx(
    'sp-table__row',
    variantClass,
    selected && 'sp-table__row--selected'
  )
}
