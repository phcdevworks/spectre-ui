import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const FOOTER_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true
} as const

const FOOTER_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true
} as const

export type FooterAccentEdge = keyof typeof FOOTER_ACCENT_EDGES
export type FooterAccentColor = keyof typeof FOOTER_ACCENT_COLORS

export interface FooterRecipeOptions {
  bordered?: boolean
  fullWidth?: boolean
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.footer.accent.thickness` (`spectre-tokens` 4.9.0). Omission
   * renders no rail. `accentColor` defaults to `'brand'` when `accent` is
   * set but `accentColor` is omitted.
   */
  accent?: FooterAccentEdge
  accentColor?: FooterAccentColor
}

export function getFooterClasses(opts: FooterRecipeOptions = {}): string {
  const {
    bordered = false,
    fullWidth = false,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'footer accent edge',
      value: accentInput,
      allowed: FOOTER_ACCENT_EDGES,
      fallback: 'top'
    })
    accentEdgeClass = `sp-footer--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'footer accent color',
      value: accentColorInput,
      allowed: FOOTER_ACCENT_COLORS,
      fallback: 'brand'
    })
    accentColorClass = `sp-footer--accent-${accentColor}`
  }

  return cx(
    'sp-footer',
    bordered && 'sp-footer--bordered',
    fullWidth && 'sp-footer--full',
    accentEdgeClass,
    accentColorClass
  )
}

export function getFooterHeadingClasses(): string {
  return cx('sp-footer__heading')
}

export function getFooterTextClasses(): string {
  return cx('sp-footer__text')
}

export function getFooterMutedClasses(): string {
  return cx('sp-footer__muted')
}

export function getFooterLinksClasses(): string {
  return cx('sp-footer__links')
}

export interface FooterLinkRecipeOptions {
  active?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getFooterLinkClasses(opts: FooterLinkRecipeOptions = {}): string {
  const {
    active = false,
    disabled = false,
    hovered = false,
    focused = false,
  } = opts

  return cx(
    'sp-footer__link',
    active && 'sp-footer__link--active',
    disabled && 'sp-footer__link--disabled',
    hovered && 'sp-footer__link--hover is-hover',
    focused && 'sp-footer__link--focus is-focus'
  )
}

export function getFooterDividerClasses(): string {
  return cx('sp-footer__divider')
}

export interface FooterChipRecipeOptions {
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getFooterChipClasses(opts: FooterChipRecipeOptions = {}): string {
  const { disabled = false, hovered = false, focused = false } = opts

  return cx(
    'sp-footer__chip',
    disabled && 'sp-footer__chip--disabled',
    hovered && 'sp-footer__chip--hover is-hover',
    focused && 'sp-footer__chip--focus is-focus'
  )
}
