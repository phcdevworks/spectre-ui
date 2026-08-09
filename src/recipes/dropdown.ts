import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const DROPDOWN_PLACEMENTS = {
  'bottom-start': true,
  'bottom-end': true,
  'top-start': true,
  'top-end': true,
} as const

export type DropdownPlacement = keyof typeof DROPDOWN_PLACEMENTS

export interface DropdownRecipeOptions {
  fullWidth?: boolean
  /**
   * Anchors the menu to the nearest positioned ancestor (e.g. `sp-nav`)
   * instead of this trigger wrapper, for mega-menu panels that span the
   * nav row rather than tracking trigger width.
   */
  mega?: boolean
}

export function getDropdownClasses(opts: DropdownRecipeOptions = {}): string {
  const { fullWidth = false, mega = false } = opts

  return cx(
    'sp-dropdown',
    fullWidth && 'sp-dropdown--full',
    mega && 'sp-dropdown--mega'
  )
}

export interface DropdownMenuRecipeOptions {
  placement?: DropdownPlacement
  open?: boolean
  /** Pairs with `mega` on `getDropdownClasses` — spans the positioned ancestor's full width instead of the trigger's. */
  mega?: boolean
}

export function getDropdownMenuClasses(
  opts: DropdownMenuRecipeOptions = {}
): string {
  const { placement: placementInput, open = false, mega = false } = opts

  const placement = resolveOption({
    name: 'dropdown menu placement',
    value: placementInput,
    allowed: DROPDOWN_PLACEMENTS,
    fallback: 'bottom-start',
  })

  return cx(
    'sp-dropdown__menu',
    `sp-dropdown__menu--${placement}`,
    open && 'sp-dropdown__menu--open',
    mega && 'sp-dropdown__menu--mega'
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
