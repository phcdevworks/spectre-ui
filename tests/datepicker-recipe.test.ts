import { describe, expect, it } from 'vitest'
import {
  getDatepickerClasses,
  getDatepickerGridClasses,
  getDatepickerHeaderClasses,
  getDatepickerWeekdayClasses,
  getDayClasses
} from '@phcdevworks/spectre-ui'
import {
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

describe('datepicker recipes', () => {
  it('returns the panel anatomy classes', () => {
    expect(getDatepickerClasses()).toBe('sp-datepicker')
    expect(getDatepickerHeaderClasses()).toBe('sp-datepicker__header')
    expect(getDatepickerGridClasses()).toBe('sp-datepicker__grid')
    expect(getDatepickerWeekdayClasses()).toBe('sp-datepicker__weekday')
  })
})

describe('getDayClasses', () => {
  it('returns a plain day with no options', () => {
    expect(getDayClasses()).toBe('sp-day')
  })

  it('supports every day state', () => {
    const result = getDayClasses({
      selected: true,
      today: true,
      outsideMonth: true,
      disabled: true,
      hovered: true,
      focused: true
    })
    expect(result).toContain('sp-day--selected')
    expect(result).toContain('sp-day--today')
    expect(result).toContain('sp-day--outside-month')
    expectTokenizedClassString(result)
  })
})

describe('datepicker CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getDatepickerClasses(),
      getDatepickerHeaderClasses(),
      getDatepickerGridClasses(),
      getDatepickerWeekdayClasses(),
      getDayClasses({
        selected: true,
        today: true,
        outsideMonth: true,
        disabled: true,
        hovered: true,
        focused: true
      })
    ])
  })
})
