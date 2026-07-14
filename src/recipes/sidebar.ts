import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

export interface SidebarRecipeOptions {
  bordered?: boolean
}

export function getSidebarClasses(opts: SidebarRecipeOptions = {}): string {
  const { bordered = false } = opts

  return cx('sp-sidebar', bordered && 'sp-sidebar--bordered')
}

const SIDEBAR_LINK_LEVELS = {
  parent: true,
  child: true,
} as const

export type SidebarLinkLevel = keyof typeof SIDEBAR_LINK_LEVELS

export interface SidebarLinkRecipeOptions {
  active?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
  level?: SidebarLinkLevel
}

export function getSidebarLinkClasses(opts: SidebarLinkRecipeOptions = {}): string {
  const {
    active = false,
    disabled = false,
    hovered = false,
    focused = false,
    level: levelInput,
  } = opts

  const level = resolveOption({
    name: 'sidebar link level',
    value: levelInput,
    allowed: SIDEBAR_LINK_LEVELS,
    fallback: 'parent',
  })

  return cx(
    'sp-sidebar__link',
    active && 'sp-sidebar__link--active',
    disabled && 'sp-sidebar__link--disabled',
    hovered && 'sp-sidebar__link--hover is-hover',
    focused && 'sp-sidebar__link--focus is-focus',
    level === 'child' && 'sp-sidebar__link--child'
  )
}

export function getSidebarHeaderClasses(): string {
  return cx('sp-sidebar__header')
}

export function getSidebarGroupClasses(): string {
  return cx('sp-sidebar__group')
}

export function getSidebarGroupSummaryClasses(): string {
  return cx('sp-sidebar__group-summary')
}

export function getSidebarBackdropClasses(): string {
  return cx('sp-sidebar-backdrop')
}

export function getSidebarToggleClasses(): string {
  return cx('sp-sidebar-toggle')
}
