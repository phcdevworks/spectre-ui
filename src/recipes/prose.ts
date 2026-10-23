import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const PROSE_SIZES = {
  md: true,
  lg: true,
  xl: true
} as const

export type ProseSize = keyof typeof PROSE_SIZES

export interface ProseRecipeOptions {
  /**
   * Colours list markers with `component.prose.markerAccent` instead of the
   * muted `component.prose.marker` (`spectre-tokens` 4.13.0).
   */
  accentMarkers?: boolean
  /**
   * Sets the body text size and line height from the `--sp-font-*` preset
   * (`md` 16px, `lg` 18px, `xl` 20px). Omission inherits the surrounding
   * text size.
   */
  size?: ProseSize
}

export function getProseClasses(opts: ProseRecipeOptions = {}): string {
  const { accentMarkers = false, size: sizeInput } = opts

  const size =
    sizeInput === undefined
      ? undefined
      : resolveOption({
          name: 'prose size',
          value: sizeInput,
          allowed: PROSE_SIZES,
          fallback: 'md'
        })

  return cx(
    'sp-prose',
    size && `sp-prose--${size}`,
    accentMarkers && 'sp-prose--accent-markers'
  )
}
