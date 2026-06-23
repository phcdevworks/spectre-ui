import { cx } from '../internal/cx'

export interface SidebarRecipeOptions {
  bordered?: boolean
}

export function getSidebarClasses(opts: SidebarRecipeOptions = {}): string {
  const { bordered = false } = opts

  return cx('sp-sidebar', bordered && 'sp-sidebar--bordered')
}

export interface SidebarLinkRecipeOptions {
  active?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getSidebarLinkClasses(opts: SidebarLinkRecipeOptions = {}): string {
  const {
    active = false,
    disabled = false,
    hovered = false,
    focused = false,
  } = opts

  return cx(
    'sp-sidebar__link',
    active && 'sp-sidebar__link--active',
    disabled && 'sp-sidebar__link--disabled',
    hovered && 'sp-sidebar__link--hover is-hover',
    focused && 'sp-sidebar__link--focus is-focus'
  )
}

export function getSidebarBackdropClasses(): string {
  return cx('sp-sidebar-backdrop')
}

export function getSidebarToggleClasses(): string {
  return cx('sp-sidebar-toggle')
}
