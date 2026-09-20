import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TOOLTIP_PLACEMENTS = {
  top: true,
  bottom: true,
  left: true,
  right: true,
} as const

const TOOLTIP_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true,
} as const

const TOOLTIP_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true,
} as const

export type TooltipPlacement = keyof typeof TOOLTIP_PLACEMENTS
export type TooltipAccentEdge = keyof typeof TOOLTIP_ACCENT_EDGES
export type TooltipAccentColor = keyof typeof TOOLTIP_ACCENT_COLORS

export interface TooltipRecipeOptions {
  placement?: TooltipPlacement
  visible?: boolean
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.tooltip.accent.thickness` (`spectre-tokens` 4.9.0). Distinct
   * from `placement`, which controls which side of the anchor the tooltip
   * itself renders on. Omission renders no rail. `accentColor` defaults to
   * `'brand'` when `accent` is set but `accentColor` is omitted.
   */
  accent?: TooltipAccentEdge
  accentColor?: TooltipAccentColor
}

export function getTooltipClasses(opts: TooltipRecipeOptions = {}): string {
  const {
    placement: placementInput,
    visible = false,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts

  const placement = resolveOption({
    name: 'tooltip placement',
    value: placementInput,
    allowed: TOOLTIP_PLACEMENTS,
    fallback: 'top',
  })

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'tooltip accent edge',
      value: accentInput,
      allowed: TOOLTIP_ACCENT_EDGES,
      fallback: 'top',
    })
    accentEdgeClass = `sp-tooltip--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'tooltip accent color',
      value: accentColorInput,
      allowed: TOOLTIP_ACCENT_COLORS,
      fallback: 'brand',
    })
    accentColorClass = `sp-tooltip--accent-${accentColor}`
  }

  return cx(
    'sp-tooltip',
    `sp-tooltip--${placement}`,
    visible && 'sp-tooltip--visible',
    accentEdgeClass,
    accentColorClass
  )
}
