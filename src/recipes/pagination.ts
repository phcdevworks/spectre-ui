import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const PAGINATION_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

export type PaginationSize = keyof typeof PAGINATION_SIZES

export interface PaginationRecipeOptions {
  size?: PaginationSize
}

export function getPaginationClasses(opts: PaginationRecipeOptions = {}): string {
  const size = resolveOption({
    name: 'pagination size',
    value: opts.size,
    allowed: PAGINATION_SIZES,
    fallback: 'md'
  })

  return cx('sp-pagination', `sp-pagination--${size}`)
}

export interface PaginationItemRecipeOptions {
  /** The current page; pair with `aria-current="page"`. */
  active?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getPaginationItemClasses(
  opts: PaginationItemRecipeOptions = {}
): string {
  const {
    active = false,
    disabled = false,
    hovered = false,
    focused = false
  } = opts

  return cx(
    'sp-pagination__item',
    active && 'sp-pagination__item--active is-active',
    disabled && 'sp-pagination__item--disabled',
    hovered && 'sp-pagination__item--hover is-hover',
    focused && 'sp-pagination__item--focus is-focus'
  )
}

/** Non-interactive gap marker between page ranges (e.g. an ellipsis). */
export function getPaginationEllipsisClasses(): string {
  return 'sp-pagination__ellipsis'
}
