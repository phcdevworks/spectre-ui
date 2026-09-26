import { cx } from '../internal/cx'

export interface AccordionRecipeOptions {
  /** Drops the outer border and radius so items sit edge-to-edge in a parent surface. */
  flush?: boolean
}

export function getAccordionClasses(opts: AccordionRecipeOptions = {}): string {
  const { flush = false } = opts

  return cx('sp-accordion', flush && 'sp-accordion--flush')
}

export interface AccordionItemRecipeOptions {
  expanded?: boolean
  disabled?: boolean
}

export function getAccordionItemClasses(
  opts: AccordionItemRecipeOptions = {}
): string {
  const { expanded = false, disabled = false } = opts

  return cx(
    'sp-accordion__item',
    expanded && 'sp-accordion__item--expanded',
    disabled && 'sp-accordion__item--disabled'
  )
}

export interface AccordionHeaderRecipeOptions {
  expanded?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

export function getAccordionHeaderClasses(
  opts: AccordionHeaderRecipeOptions = {}
): string {
  const {
    expanded = false,
    disabled = false,
    hovered = false,
    focused = false
  } = opts

  return cx(
    'sp-accordion__header',
    expanded && 'sp-accordion__header--expanded',
    disabled && 'sp-accordion__header--disabled',
    hovered && 'sp-accordion__header--hover is-hover',
    focused && 'sp-accordion__header--focus is-focus'
  )
}

export interface AccordionIconRecipeOptions {
  expanded?: boolean
}

export function getAccordionIconClasses(
  opts: AccordionIconRecipeOptions = {}
): string {
  const { expanded = false } = opts

  return cx('sp-accordion__icon', expanded && 'sp-accordion__icon--expanded')
}

export interface AccordionPanelRecipeOptions {
  expanded?: boolean
}

export function getAccordionPanelClasses(
  opts: AccordionPanelRecipeOptions = {}
): string {
  const { expanded = false } = opts

  return cx('sp-accordion__panel', expanded && 'sp-accordion__panel--expanded')
}
