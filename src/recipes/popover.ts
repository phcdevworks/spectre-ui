import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const POPOVER_PLACEMENTS = {
  top: true,
  bottom: true,
  left: true,
  right: true
} as const

export type PopoverPlacement = keyof typeof POPOVER_PLACEMENTS

export interface PopoverRecipeOptions {
  /** Side of the positioned trigger wrapper the popover opens on. */
  placement?: PopoverPlacement
  open?: boolean
}

/**
 * A richer, interactive sibling of the tooltip: titled content that stays
 * open for pointer interaction. Position it inside a `position: relative`
 * trigger wrapper, as with `getTooltipClasses`.
 */
export function getPopoverClasses(opts: PopoverRecipeOptions = {}): string {
  const { placement: placementInput, open = false } = opts

  const placement = resolveOption({
    name: 'popover placement',
    value: placementInput,
    allowed: POPOVER_PLACEMENTS,
    fallback: 'top'
  })

  return cx(
    'sp-popover',
    `sp-popover--${placement}`,
    open && 'sp-popover--open'
  )
}

export function getPopoverHeaderClasses(): string {
  return 'sp-popover__header'
}

export function getPopoverBodyClasses(): string {
  return 'sp-popover__body'
}

/** Pointer arrow; its edge follows the parent popover's placement. */
export function getPopoverArrowClasses(): string {
  return 'sp-popover__arrow'
}
