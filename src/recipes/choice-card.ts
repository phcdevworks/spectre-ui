import { cx } from '../internal/cx'

export interface ChoiceCardRecipeOptions {
  /** Forces the selected state; a wrapped native `:checked` input needs no flag. */
  selected?: boolean
  /** Forces the disabled state; a wrapped native `:disabled` input needs no flag. */
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

/**
 * Whole-card clickable option (e.g. a payment or shipping method picker).
 * Render it as a `<label>` wrapping a radio or checkbox so the entire card is
 * the hit target; selection and focus follow that input automatically.
 */
export function getChoiceCardClasses(opts: ChoiceCardRecipeOptions = {}): string {
  const {
    selected = false,
    disabled = false,
    hovered = false,
    focused = false
  } = opts

  return cx(
    'sp-choice-card',
    selected && 'sp-choice-card--selected',
    disabled && 'sp-choice-card--disabled',
    hovered && 'sp-choice-card--hover is-hover',
    focused && 'sp-choice-card--focus is-focus'
  )
}
