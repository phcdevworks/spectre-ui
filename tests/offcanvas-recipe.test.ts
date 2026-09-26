import { describe, expect, it } from 'vitest'
import {
  getOffcanvasBackdropClasses,
  getOffcanvasBodyClasses,
  getOffcanvasClasses,
  getOffcanvasFooterClasses,
  getOffcanvasHeaderClasses
} from '@phcdevworks/spectre-ui'
import { expectRecipeClassesStyled } from './support/component-css'

const PLACEMENTS = ['start', 'end', 'top', 'bottom'] as const

describe('getOffcanvasClasses', () => {
  it('defaults to the start placement, closed', () => {
    expect(getOffcanvasClasses()).toBe('sp-offcanvas sp-offcanvas--start')
  })

  it('supports every placement and the open flag', () => {
    for (const placement of PLACEMENTS) {
      expect(getOffcanvasClasses({ placement, open: true })).toBe(
        `sp-offcanvas sp-offcanvas--${placement} sp-offcanvas--open`
      )
    }
  })
})

describe('offcanvas sub-elements', () => {
  it('returns the backdrop and region classes', () => {
    expect(getOffcanvasBackdropClasses()).toBe('sp-offcanvas-backdrop')
    expect(getOffcanvasBackdropClasses({ open: true })).toBe(
      'sp-offcanvas-backdrop sp-offcanvas-backdrop--open'
    )
    expect(getOffcanvasHeaderClasses()).toBe('sp-offcanvas__header')
    expect(getOffcanvasBodyClasses()).toBe('sp-offcanvas__body')
    expect(getOffcanvasFooterClasses()).toBe('sp-offcanvas__footer')
  })
})

describe('offcanvas CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      ...PLACEMENTS.map((placement) =>
        getOffcanvasClasses({ placement, open: true })
      ),
      getOffcanvasBackdropClasses({ open: true }),
      getOffcanvasHeaderClasses(),
      getOffcanvasBodyClasses(),
      getOffcanvasFooterClasses()
    ])
  })
})
