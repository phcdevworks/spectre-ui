import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import type { TextDecoration, TextUnderlineOffset } from './text'

const LINK_TONES = {
  default: true,
  /** For a link on a `surface.inverse`-backed background (`link.onInverse`). */
  onInverse: true,
} as const

const LINK_DECORATIONS = {
  thin: true,
  base: true,
  thick: true,
} as const

const LINK_UNDERLINE_OFFSETS = {
  sm: true,
  md: true,
  lg: true,
} as const

export type LinkTone = keyof typeof LINK_TONES

export interface LinkRecipeOptions {
  tone?: LinkTone
  /**
   * Overrides the default thin underline with a step from
   * `--sp-text-decoration-thickness-*`.
   */
  decoration?: TextDecoration
  /**
   * Overrides the default `md` underline offset with a step from
   * `--sp-text-decoration-offset-*`.
   */
  underlineOffset?: TextUnderlineOffset
}

export function getLinkClasses(opts: LinkRecipeOptions = {}): string {
  const {
    tone: toneInput,
    decoration: decorationInput,
    underlineOffset: underlineOffsetInput,
  } = opts

  const tone = resolveOption({
    name: 'link tone',
    value: toneInput,
    allowed: LINK_TONES,
    fallback: 'default',
  })

  const decoration =
    decorationInput === undefined
      ? undefined
      : resolveOption({
          name: 'link decoration',
          value: decorationInput,
          allowed: LINK_DECORATIONS,
          fallback: 'thin',
        })

  const underlineOffset =
    underlineOffsetInput === undefined
      ? undefined
      : resolveOption({
          name: 'link underline offset',
          value: underlineOffsetInput,
          allowed: LINK_UNDERLINE_OFFSETS,
          fallback: 'md',
        })

  return cx(
    'sp-link',
    tone === 'onInverse' && 'sp-link--on-inverse',
    decoration && `sp-decoration-${decoration}`,
    underlineOffset && `sp-underline-offset-${underlineOffset}`
  )
}
