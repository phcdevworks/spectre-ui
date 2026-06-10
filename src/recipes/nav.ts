import { cx } from '../internal/cx'

export interface NavRecipeOptions {
  bordered?: boolean
  sticky?: boolean
  fullWidth?: boolean
}

export function getNavClasses(opts: NavRecipeOptions = {}): string {
  const { bordered = false, sticky = false, fullWidth = false } = opts

  return cx(
    'sp-nav',
    bordered && 'sp-nav--bordered',
    sticky && 'sp-nav--sticky',
    fullWidth && 'sp-nav--full'
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
