import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SWITCH_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

export type SwitchSize = keyof typeof SWITCH_SIZES

export interface SwitchRecipeOptions {
  size?: SwitchSize
  /** Forces the on state; a native `:checked` input needs no flag. */
  checked?: boolean
  /** Forces the disabled state; a native `:disabled` input needs no flag. */
  disabled?: boolean
  focused?: boolean
}

/**
 * Toggle track with a sliding thumb. Apply to
 * `<input type="checkbox" role="switch">` for native state, or to any element
 * driven by the `checked`/`disabled` flags.
 */
export function getSwitchClasses(opts: SwitchRecipeOptions = {}): string {
  const {
    size: sizeInput,
    checked = false,
    disabled = false,
    focused = false
  } = opts

  const size = resolveOption({
    name: 'switch size',
    value: sizeInput,
    allowed: SWITCH_SIZES,
    fallback: 'md'
  })

  return cx(
    'sp-switch',
    `sp-switch--${size}`,
    checked && 'sp-switch--checked',
    disabled && 'sp-switch--disabled',
    focused && 'sp-switch--focus is-focus'
  )
}
