import { describe, expect, it } from 'vitest'
import {
  getCheckboxClasses,
  getFieldsetClasses,
  getFieldsetLegendClasses,
  getLabelClasses,
  getRadioClasses,
  getSelectClasses,
  getTextareaClasses,
} from '@phcdevworks/spectre-ui'

describe('getCheckboxClasses', () => {
  it('returns the default checkbox indicator class', () => {
    expect(getCheckboxClasses()).toBe('sp-checkbox-indicator')
  })

  it('returns the checked modifier class', () => {
    expect(getCheckboxClasses({ checked: true })).toBe(
      'sp-checkbox-indicator sp-checkbox-indicator--checked'
    )
  })

  it('returns the disabled modifier class', () => {
    expect(getCheckboxClasses({ disabled: true })).toBe(
      'sp-checkbox-indicator sp-checkbox-indicator--disabled'
    )
  })

  it('combines checked and disabled', () => {
    expect(getCheckboxClasses({ checked: true, disabled: true })).toBe(
      'sp-checkbox-indicator sp-checkbox-indicator--checked sp-checkbox-indicator--disabled'
    )
  })
})

describe('getRadioClasses', () => {
  it('returns the default radio indicator class', () => {
    expect(getRadioClasses()).toBe('sp-radio-indicator')
  })

  it('returns the checked modifier class', () => {
    expect(getRadioClasses({ checked: true })).toBe(
      'sp-radio-indicator sp-radio-indicator--checked'
    )
  })

  it('returns the disabled modifier class', () => {
    expect(getRadioClasses({ disabled: true })).toBe(
      'sp-radio-indicator sp-radio-indicator--disabled'
    )
  })
})

describe('getSelectClasses', () => {
  it('returns the default select class', () => {
    expect(getSelectClasses()).toBe('sp-select sp-select--md')
  })

  it('returns the size modifier class', () => {
    expect(getSelectClasses({ size: 'lg' })).toBe('sp-select sp-select--lg')
  })

  it('returns the fullWidth modifier class', () => {
    expect(getSelectClasses({ fullWidth: true })).toBe(
      'sp-select sp-select--md sp-select--full'
    )
  })

  it('returns the pill modifier class', () => {
    expect(getSelectClasses({ pill: true })).toBe(
      'sp-select sp-select--md sp-select--pill'
    )
  })

  it('returns the disabled modifier class', () => {
    expect(getSelectClasses({ disabled: true })).toBe(
      'sp-select sp-select--md sp-select--disabled'
    )
  })

  it('returns the focused modifier classes', () => {
    expect(getSelectClasses({ focused: true })).toBe(
      'sp-select sp-select--md sp-select--focus is-focus'
    )
  })
})

describe('getTextareaClasses', () => {
  it('returns the default textarea class', () => {
    expect(getTextareaClasses()).toBe('sp-textarea sp-textarea--md')
  })

  it('returns the size modifier class', () => {
    expect(getTextareaClasses({ size: 'sm' })).toBe(
      'sp-textarea sp-textarea--sm'
    )
  })

  it('returns the fullWidth modifier class', () => {
    expect(getTextareaClasses({ fullWidth: true })).toBe(
      'sp-textarea sp-textarea--md sp-textarea--full'
    )
  })

  it('returns the pill modifier class', () => {
    expect(getTextareaClasses({ pill: true })).toBe(
      'sp-textarea sp-textarea--md sp-textarea--pill'
    )
  })

  it('returns the disabled modifier class', () => {
    expect(getTextareaClasses({ disabled: true })).toBe(
      'sp-textarea sp-textarea--md sp-textarea--disabled'
    )
  })

  it('returns the focused modifier classes', () => {
    expect(getTextareaClasses({ focused: true })).toBe(
      'sp-textarea sp-textarea--md sp-textarea--focus is-focus'
    )
  })
})

describe('getFieldsetClasses', () => {
  it('returns the default fieldset class', () => {
    expect(getFieldsetClasses()).toBe('sp-fieldset')
  })

  it('returns the disabled modifier class', () => {
    expect(getFieldsetClasses({ disabled: true })).toBe(
      'sp-fieldset sp-fieldset--disabled'
    )
  })
})

describe('getFieldsetLegendClasses', () => {
  it('returns the fieldset legend class', () => {
    expect(getFieldsetLegendClasses()).toBe('sp-fieldset__legend')
  })
})

describe('getLabelClasses', () => {
  it('returns the default form label class', () => {
    expect(getLabelClasses()).toBe('sp-form-label')
  })

  it('returns the disabled modifier class', () => {
    expect(getLabelClasses({ disabled: true })).toBe(
      'sp-form-label sp-form-label--disabled'
    )
  })

  it('returns the required modifier class', () => {
    expect(getLabelClasses({ required: true })).toBe(
      'sp-form-label sp-form-label--required'
    )
  })

  it('combines disabled and required', () => {
    expect(getLabelClasses({ disabled: true, required: true })).toBe(
      'sp-form-label sp-form-label--disabled sp-form-label--required'
    )
  })
})
