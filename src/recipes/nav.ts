import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const ALIGN_MAP = { start: true, center: true, end: true } as const

const NAV_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true
} as const

const NAV_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true
} as const

export type NavAlign = keyof typeof ALIGN_MAP
export type NavAccentEdge = keyof typeof NAV_ACCENT_EDGES
export type NavAccentColor = keyof typeof NAV_ACCENT_COLORS

export interface NavRecipeOptions {
  bordered?: boolean
  sticky?: boolean
  fullWidth?: boolean
  align?: NavAlign
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.nav.accent.thickness` (`spectre-tokens` 4.9.0). Omission
   * renders no rail. `accentColor` defaults to `'brand'` when `accent` is
   * set but `accentColor` is omitted.
   */
  accent?: NavAccentEdge
  accentColor?: NavAccentColor
}

export function getNavClasses(opts: NavRecipeOptions = {}): string {
  const {
    bordered = false,
    sticky = false,
    fullWidth = false,
    align: alignInput,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts

  const align = alignInput
    ? resolveOption({
        name: 'nav align',
        value: alignInput,
        allowed: ALIGN_MAP,
        fallback: 'start'
      })
    : undefined

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'nav accent edge',
      value: accentInput,
      allowed: NAV_ACCENT_EDGES,
      fallback: 'bottom'
    })
    accentEdgeClass = `sp-nav--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'nav accent color',
      value: accentColorInput,
      allowed: NAV_ACCENT_COLORS,
      fallback: 'brand'
    })
    accentColorClass = `sp-nav--accent-${accentColor}`
  }

  return cx(
    'sp-nav',
    bordered && 'sp-nav--bordered',
    sticky && 'sp-nav--sticky',
    fullWidth && 'sp-nav--full',
    align && `sp-nav--align-${align}`,
    accentEdgeClass,
    accentColorClass
  )
}

export function getNavLinksClasses(): string {
  return cx('sp-nav__links')
}

export interface NavLinkRecipeOptions {
  active?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getNavLinkClasses(opts: NavLinkRecipeOptions = {}): string {
  const {
    active = false,
    disabled = false,
    hovered = false,
    focused = false,
  } = opts

  return cx(
    'sp-nav__link',
    active && 'sp-nav__link--active',
    disabled && 'sp-nav__link--disabled',
    hovered && 'sp-nav__link--hover is-hover',
    focused && 'sp-nav__link--focus is-focus'
  )
}
