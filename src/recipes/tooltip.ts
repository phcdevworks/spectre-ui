import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TOOLTIP_PLACEMENTS = {
  top: true,
  bottom: true,
  left: true,
  right: true,
} as const

export type TooltipPlacement = keyof typeof TOOLTIP_PLACEMENTS

export interface TooltipRecipeOptions {
  placement?: TooltipPlacement
  visible?: boolean
}

export function getTooltipClasses(opts: TooltipRecipeOptions = {}): string {
  const { placement: placementInput, visible = false } = opts

  const placement = resolveOption({
    name: 'tooltip placement',
    value: placementInput,
    allowed: TOOLTIP_PLACEMENTS,
    fallback: 'top',
  })

  return cx(
    'sp-tooltip',
    `sp-tooltip--${placement}`,
    visible && 'sp-tooltip--visible'
  )
}
