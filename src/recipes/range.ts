import { cx } from '../internal/cx'

export interface RangeRecipeOptions {
  /** Forces the disabled state; a native `:disabled` input needs no flag. */
  disabled?: boolean
  focused?: boolean
}

/**
 * Slider for `<input type="range">`. Firefox paints the filled track
 * natively; for WebKit/Blink the caller mirrors the value as a percentage in
 * the `--sp-component-range-value` custom property (e.g. `40%`) on the input.
 */
export function getRangeClasses(opts: RangeRecipeOptions = {}): string {
  const { disabled = false, focused = false } = opts

  return cx(
    'sp-range',
    disabled && 'sp-range--disabled',
    focused && 'sp-range--focus is-focus'
  )
}
