import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const LIST_GROUP_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true
} as const

const LIST_GROUP_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true
} as const

export type ListGroupAccentEdge = keyof typeof LIST_GROUP_ACCENT_EDGES
export type ListGroupAccentColor = keyof typeof LIST_GROUP_ACCENT_COLORS

export interface ListGroupRecipeOptions {
  /** Drops the outer border and radius so items sit edge-to-edge in a parent surface. */
  flush?: boolean
  /** Lays items out in a row instead of a column. */
  horizontal?: boolean
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.listGroup.accent.thickness` (`spectre-tokens` 4.10.0).
   * Omission renders no rail. `accentColor` defaults to `'brand'` when
   * `accent` is set but `accentColor` is omitted.
   */
  accent?: ListGroupAccentEdge
  accentColor?: ListGroupAccentColor
}

export function getListGroupClasses(opts: ListGroupRecipeOptions = {}): string {
  const {
    flush = false,
    horizontal = false,
    accent: accentInput,
    accentColor: accentColorInput
  } = opts

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'list group accent edge',
      value: accentInput,
      allowed: LIST_GROUP_ACCENT_EDGES,
      fallback: 'top'
    })
    accentEdgeClass = `sp-list-group--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'list group accent color',
      value: accentColorInput,
      allowed: LIST_GROUP_ACCENT_COLORS,
      fallback: 'brand'
    })
    accentColorClass = `sp-list-group--accent-${accentColor}`
  }

  return cx(
    'sp-list-group',
    flush && 'sp-list-group--flush',
    horizontal && 'sp-list-group--horizontal',
    accentEdgeClass,
    accentColorClass
  )
}

export interface ListGroupItemRecipeOptions {
  /** Renders the item as an actionable row (link or button) with hover feedback. */
  interactive?: boolean
  /** The current/primary item — a filled highlight. */
  active?: boolean
  /** A checked item in a multi-select list — a subtle tint, distinct from `active`. */
  selected?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getListGroupItemClasses(
  opts: ListGroupItemRecipeOptions = {}
): string {
  const {
    interactive = false,
    active = false,
    selected = false,
    disabled = false,
    hovered = false,
    focused = false
  } = opts

  return cx(
    'sp-list-group__item',
    interactive && 'sp-list-group__item--interactive',
    active && 'sp-list-group__item--active is-active',
    selected && 'sp-list-group__item--selected',
    disabled && 'sp-list-group__item--disabled',
    hovered && 'sp-list-group__item--hover is-hover',
    focused && 'sp-list-group__item--focus is-focus'
  )
}

export function getListGroupItemHeadingClasses(): string {
  return 'sp-list-group__heading'
}

export function getListGroupItemTextClasses(): string {
  return 'sp-list-group__text'
}
