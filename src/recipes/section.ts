import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SECTION_SCALE = {
  sm: true,
  md: true,
  lg: true,
  xl: true,
  '2xl': true,
  '3xl': true,
  '4xl': true
} as const

const SECTION_HERO_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

export type SectionSpacing = keyof typeof SECTION_SCALE
export type SectionGap = keyof typeof SECTION_SCALE
export type SectionHero = keyof typeof SECTION_HERO_SIZES

export interface SectionRecipeOptions {
  /**
   * Block padding step from `layout.section.padding`. Omission keeps the
   * default `md` padding with no modifier class.
   */
  spacing?: SectionSpacing
  /** Stacks direct children with the `layout.section.gap` step between them. */
  gap?: SectionGap
  /**
   * Asymmetric hero padding from `layout.hero.padding.{top,bottom}`
   * (`spectre-tokens` 4.12.0): more space above than below. Replaces the
   * symmetric `spacing` padding when both are set.
   */
  hero?: SectionHero
  /**
   * Marks a band that belongs to the section above (e.g. a logo strip under
   * a hero): it drops its own top padding, so the gap between the two is the
   * upper section's bottom padding alone.
   */
  attached?: boolean
}

export function getSectionClasses(opts: SectionRecipeOptions = {}): string {
  const {
    spacing: spacingInput,
    gap: gapInput,
    hero: heroInput,
    attached = false
  } = opts

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

  const hero =
    heroInput === undefined
      ? undefined
      : resolveOption({
          name: 'section hero',
          value: heroInput,
          allowed: SECTION_HERO_SIZES,
          fallback: 'md'
        })

  return cx(
    'sp-section',
    !hero && spacing && `sp-section--spacing-${spacing}`,
    hero && `sp-section--hero-${hero}`,
    gap && `sp-section--gap-${gap}`,
    attached && 'sp-section--attached'
  )
}
