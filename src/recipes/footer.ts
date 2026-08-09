import { cx } from '../internal/cx'

export interface FooterRecipeOptions {
  bordered?: boolean
  fullWidth?: boolean
}

export function getFooterClasses(opts: FooterRecipeOptions = {}): string {
  const { bordered = false, fullWidth = false } = opts

  return cx('sp-footer', bordered && 'sp-footer--bordered', fullWidth && 'sp-footer--full')
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
