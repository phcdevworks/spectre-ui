import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import { CHART_ROLES } from '../internal/utility-scales.generated'

/** A data-visualisation role from `--sp-chart-*` (`series-1`, `axis`, …). */
export type ChartColor = (typeof CHART_ROLES)[number]

/**
 * Each property takes a chart color role and emits the matching generated
 * `sp-{property}-chart-{role}` utility, e.g. `{ fill: 'series-1' }` for an
 * SVG bar and `{ stroke: 'axis' }` for its axis line.
 */
export interface ChartColorRecipeOptions {
  fill?: ChartColor
  stroke?: ChartColor
  bg?: ChartColor
  text?: ChartColor
  border?: ChartColor
}

const CHART_PROPERTIES = ['fill', 'stroke', 'bg', 'text', 'border'] as const

export function getChartColorClasses(
  opts: ChartColorRecipeOptions = {}
): string {
  return cx(
    ...CHART_PROPERTIES.map((property) => {
      const value = opts[property]
      if (value === undefined) return undefined
      const color = resolveOption({
        name: `chart ${property} color`,
        value,
        allowed: CHART_ROLES,
        fallback: CHART_ROLES[0]
      })
      return `sp-${property}-chart-${color}`
    })
  )
}
