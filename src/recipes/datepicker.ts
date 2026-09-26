import { cx } from '../internal/cx'

/** Calendar panel surface. */
export function getDatepickerClasses(): string {
  return 'sp-datepicker'
}

/** Month/year title row, typically flanked by previous/next buttons. */
export function getDatepickerHeaderClasses(): string {
  return 'sp-datepicker__header'
}

/** Seven-column grid holding the weekday labels and day cells. */
export function getDatepickerGridClasses(): string {
  return 'sp-datepicker__grid'
}

export function getDatepickerWeekdayClasses(): string {
  return 'sp-datepicker__weekday'
}

export interface DayRecipeOptions {
  selected?: boolean
  today?: boolean
  /** A leading/trailing day from the adjacent month. */
  outsideMonth?: boolean
  disabled?: boolean
  hovered?: boolean
  focused?: boolean
}

/**
 * A single calendar day cell. Kept separate from the datepicker so other
 * calendar-like surfaces can reuse the `component.day` color states.
 */
export function getDayClasses(opts: DayRecipeOptions = {}): string {
  const {
    selected = false,
    today = false,
    outsideMonth = false,
    disabled = false,
    hovered = false,
    focused = false
  } = opts

  return cx(
    'sp-day',
    selected && 'sp-day--selected',
    today && 'sp-day--today',
    outsideMonth && 'sp-day--outside-month',
    disabled && 'sp-day--disabled',
    hovered && 'sp-day--hover is-hover',
    focused && 'sp-day--focus is-focus'
  )
}
