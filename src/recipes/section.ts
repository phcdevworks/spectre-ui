import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SECTION_SCALE = {
  sm: true,
  md: true,
  lg: true
} as const

export type SectionSpacing = keyof typeof SECTION_SCALE
export type SectionGap = keyof typeof SECTION_SCALE

export interface SectionRecipeOptions {
  /**
   * Block padding step from `layout.section.padding`. Omission keeps the
   * default `md` padding with no modifier class.
   */
  spacing?: SectionSpacing
  /** Stacks direct children with the `layout.section.gap` step between them. */
  gap?: SectionGap
}

export function getSectionClasses(opts: SectionRecipeOptions = {}): string {
  const { spacing: spacingInput, gap: gapInput } = opts

  const spacing =
    spacingInput === undefined
      ? undefined
      : resolveOption({
          name: 'section spacing',
          value: spacingInput,
          allowed: SECTION_SCALE,
          fallback: 'md'
        })

  const gap =
    gapInput === undefined
      ? undefined
      : resolveOption({
          name: 'section gap',
          value: gapInput,
          allowed: SECTION_SCALE,
          fallback: 'md'
        })

  return cx(
    'sp-section',
    spacing && `sp-section--spacing-${spacing}`,
    gap && `sp-section--gap-${gap}`
  )
}
