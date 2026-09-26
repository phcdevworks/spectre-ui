import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const DISPLAY_LEVELS = {
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  '6': true
} as const

export type DisplayLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface DisplayRecipeOptions {
  /**
   * The `typography.display` preset: a marketing/hero heading one scale step
   * larger than the matching `typography.heading` level.
   */
  level?: DisplayLevel
}

export function getDisplayClasses(opts: DisplayRecipeOptions = {}): string {
  const level = resolveOption({
    name: 'display level',
    value: opts.level === undefined ? undefined : String(opts.level),
    allowed: DISPLAY_LEVELS,
    fallback: '1'
  })

  return cx('sp-display', `sp-display--${level}`)
}

/** Introductory paragraph set in the `typography.lead` preset. */
export function getLeadClasses(): string {
  return 'sp-lead'
}
