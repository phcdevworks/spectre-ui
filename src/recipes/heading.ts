import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const HEADING_LEVELS = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true
} as const

export type HeadingLevel = keyof typeof HEADING_LEVELS

export interface HeadingRecipeOptions {
  /**
   * The `typography.heading` preset to apply. Independent of the element, so
   * an `<h2>` can take the `h4` look when the document outline and the
   * visual scale differ.
   */
  level?: HeadingLevel
}

export function getHeadingClasses(opts: HeadingRecipeOptions = {}): string {
  const level = resolveOption({
    name: 'heading level',
    value: opts.level,
    allowed: HEADING_LEVELS,
    fallback: 'h2'
  })

  return cx('sp-heading', `sp-heading--${level}`)
}
