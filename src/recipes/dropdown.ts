import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const DROPDOWN_PLACEMENTS = {
  'bottom-start': true,
  'bottom-end': true,
  'top-start': true,
  'top-end': true,
} as const

const DROPDOWN_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true,
} as const

const DROPDOWN_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true,
} as const

export type DropdownPlacement = keyof typeof DROPDOWN_PLACEMENTS
export type DropdownAccentEdge = keyof typeof DROPDOWN_ACCENT_EDGES
export type DropdownAccentColor = keyof typeof DROPDOWN_ACCENT_COLORS

export interface DropdownRecipeOptions {
  fullWidth?: boolean
  /**
   * Anchors the menu to the nearest positioned ancestor (e.g. `sp-nav`)
   * instead of this trigger wrapper, for mega-menu panels that span the
   * nav row rather than tracking trigger width.
   */
  mega?: boolean
  /**
   * Breaks the menu out to the full browser viewport width instead of
   * tracking the trigger or the nearest positioned ancestor — for a wide
   * menu that would otherwise overflow past the edge of a narrow trigger
   * or a width-constrained nav. Also sets `position: static` on this
   * wrapper like `mega`, so pair with `viewport` on `getDropdownMenuClasses`
   * rather than combining with `mega`. Uses the standard full-bleed
   * breakout technique (`left: 50%; width: 100vw; margin-left: -50vw`),
   * which assumes the menu's positioned ancestor is horizontally centered
   * in the viewport (true for a centered `sp-container`-based layout); it
   * will not center correctly inside an off-center ancestor (e.g. a fixed
   * sidebar layout).
   */
  viewport?: boolean
}

export function getDropdownClasses(opts: DropdownRecipeOptions = {}): string {
  const { fullWidth = false, mega = false, viewport = false } = opts

  return cx(
    'sp-dropdown',
    fullWidth && 'sp-dropdown--full',
    mega && 'sp-dropdown--mega',
    viewport && 'sp-dropdown--viewport'
  )
}

export interface DropdownMenuRecipeOptions {
  placement?: DropdownPlacement
  open?: boolean
  /** Pairs with `mega` on `getDropdownClasses` — spans the positioned ancestor's full width instead of the trigger's. */
  mega?: boolean
  /**
   * Pairs with `viewport` on `getDropdownClasses` — breaks the menu out to
   * the full browser viewport width instead of the trigger's or the
   * positioned ancestor's. Takes precedence over `mega` if both are set.
   */
  viewport?: boolean
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.dropdown.accent.thickness` (`spectre-tokens` 4.9.0). Omission
   * renders no rail. `accentColor` defaults to `'brand'` when `accent` is
   * set but `accentColor` is omitted.
   */
  accent?: DropdownAccentEdge
  accentColor?: DropdownAccentColor
}

export function getDropdownMenuClasses(
  opts: DropdownMenuRecipeOptions = {}
): string {
  const {
    placement: placementInput,
    open = false,
    mega = false,
    viewport = false,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts

  const placement = resolveOption({
    name: 'dropdown menu placement',
    value: placementInput,
    allowed: DROPDOWN_PLACEMENTS,
    fallback: 'bottom-start',
  })

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'dropdown menu accent edge',
      value: accentInput,
      allowed: DROPDOWN_ACCENT_EDGES,
      fallback: 'top',
    })
    accentEdgeClass = `sp-dropdown__menu--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'dropdown menu accent color',
      value: accentColorInput,
      allowed: DROPDOWN_ACCENT_COLORS,
      fallback: 'brand',
    })
    accentColorClass = `sp-dropdown__menu--accent-${accentColor}`
  }

  return cx(
    'sp-dropdown__menu',
    `sp-dropdown__menu--${placement}`,
    open && 'sp-dropdown__menu--open',
    mega && 'sp-dropdown__menu--mega',
    viewport && 'sp-dropdown__menu--viewport',
    accentEdgeClass,
    accentColorClass
  )
}

export interface DropdownItemRecipeOptions {
  active?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getDropdownItemClasses(
  opts: DropdownItemRecipeOptions = {}
): string {
  const {
    active = false,
    disabled = false,
    hovered = false,
    focused = false,
  } = opts

  return cx(
    'sp-dropdown__item',
    active && 'sp-dropdown__item--active',
    disabled && 'sp-dropdown__item--disabled',
    hovered && 'sp-dropdown__item--hover is-hover',
    focused && 'sp-dropdown__item--focus is-focus'
  )
}
