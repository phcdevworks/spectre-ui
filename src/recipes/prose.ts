import { cx } from '../internal/cx'

export interface ProseRecipeOptions {
  /**
   * Colours list markers with `component.prose.markerAccent` instead of the
   * muted `component.prose.marker` (`spectre-tokens` 4.13.0).
   */
  accentMarkers?: boolean
}

export function getProseClasses(opts: ProseRecipeOptions = {}): string {
  const { accentMarkers = false } = opts

  return cx('sp-prose', accentMarkers && 'sp-prose--accent-markers')
}
