import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SECTION_HEAD_LAYOUTS = {
  stacked: true,
  split: true
} as const

const SECTION_HEAD_ALIGNS = {
  start: true,
  center: true
} as const

export type SectionHeadLayout = keyof typeof SECTION_HEAD_LAYOUTS
export type SectionHeadAlign = keyof typeof SECTION_HEAD_ALIGNS

export interface SectionHeadRecipeOptions {
  /**
   * `stacked` puts the title block above the lead. `split` puts the title
   * block left and the lead right on a twelve-column grid from the `lg`
   * breakpoint, stacking below it.
   */
  layout?: SectionHeadLayout
  /** Stacked layout only; `center` centres the head at prose width. */
  align?: SectionHeadAlign
}

/**
 * The heading block at the top of a section: an optional eyebrow and the
 * title (in the title part), then the lead and any actions (in the lead
 * part). Typography comes from the heading, text, and lead recipes.
 */
export function getSectionHeadClasses(
  opts: SectionHeadRecipeOptions = {}
): string {
  const layout = resolveOption({
    name: 'section head layout',
    value: opts.layout,
    allowed: SECTION_HEAD_LAYOUTS,
    fallback: 'stacked'
  })

  const align = resolveOption({
    name: 'section head align',
    value: opts.align,
    allowed: SECTION_HEAD_ALIGNS,
    fallback: 'start'
  })

  return cx(
    'sp-section-head',
    `sp-section-head--${layout}`,
    layout === 'stacked' && align === 'center' && 'sp-section-head--center'
  )
}

/** Wraps the eyebrow and the heading. */
export function getSectionHeadTitleClasses(): string {
  return 'sp-section-head__title'
}

/** Wraps the lead paragraph and any actions. */
export function getSectionHeadLeadClasses(): string {
  return 'sp-section-head__lead'
}
