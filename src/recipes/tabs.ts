import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TABS_VARIANTS = {
  line: true,
  pill: true
} as const

export type TabsVariant = keyof typeof TABS_VARIANTS

export interface TabsRecipeOptions {
  variant?: TabsVariant
  /** Stacks the tab list beside the panels instead of above them. */
  vertical?: boolean
  /** Stretches each tab item to share the list's full width equally. */
  fullWidth?: boolean
}

export function getTabsClasses(opts: TabsRecipeOptions = {}): string {
  const { variant: variantInput, vertical = false, fullWidth = false } = opts

  const variant = resolveOption({
    name: 'tabs variant',
    value: variantInput,
    allowed: TABS_VARIANTS,
    fallback: 'line'
  })

  return cx(
    'sp-tabs',
    `sp-tabs--${variant}`,
    vertical && 'sp-tabs--vertical',
    fullWidth && 'sp-tabs--full'
  )
}

export function getTabsListClasses(): string {
  return 'sp-tabs__list'
}

export interface TabsItemRecipeOptions {
  active?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getTabsItemClasses(opts: TabsItemRecipeOptions = {}): string {
  const {
    active = false,
    disabled = false,
    hovered = false,
    focused = false
  } = opts

  return cx(
    'sp-tabs__item',
    active && 'sp-tabs__item--active is-active',
    disabled && 'sp-tabs__item--disabled',
    hovered && 'sp-tabs__item--hover is-hover',
    focused && 'sp-tabs__item--focus is-focus'
  )
}

export function getTabsPanelClasses(): string {
  return 'sp-tabs__panel'
}
