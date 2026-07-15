import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const ALIGN_MAP = { start: true, center: true, end: true } as const

export type NavAlign = keyof typeof ALIGN_MAP

export interface NavRecipeOptions {
  bordered?: boolean
  sticky?: boolean
  fullWidth?: boolean
  align?: NavAlign
}

export function getNavClasses(opts: NavRecipeOptions = {}): string {
  const {
    bordered = false,
    sticky = false,
    fullWidth = false,
    align: alignInput,
  } = opts

  const align = alignInput
    ? resolveOption({
        name: 'nav align',
        value: alignInput,
        allowed: ALIGN_MAP,
        fallback: 'start'
      })
    : undefined

  return cx(
    'sp-nav',
    bordered && 'sp-nav--bordered',
    sticky && 'sp-nav--sticky',
    fullWidth && 'sp-nav--full',
    align && `sp-nav--align-${align}`
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
