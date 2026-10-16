import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import { ELEVATION_LEVELS } from '../internal/utility-scales.generated'

/**
 * An elevation role from `--sp-elevation-{level}-*`. Each level sets
 * surface, shadow, and z-index together.
 */
export type ElevationLevel = (typeof ELEVATION_LEVELS)[number]

export interface ElevationRecipeOptions {
  level?: ElevationLevel
}

export function getElevationClasses(opts: ElevationRecipeOptions = {}): string {
  const level = resolveOption({
    name: 'elevation level',
    value: opts.level,
    allowed: ELEVATION_LEVELS,
    fallback: ELEVATION_LEVELS[0]
  })

  return cx(`sp-elevation-${level}`)
}
