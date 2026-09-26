import { describe, expect, it } from 'vitest'
import {
  getCarouselCaptionClasses,
  getCarouselClasses,
  getCarouselControlClasses,
  getCarouselIndicatorClasses,
  getCarouselIndicatorsClasses,
  getCarouselSlideClasses,
  getCarouselViewportClasses
} from '@phcdevworks/spectre-ui'
import { expectRecipeClassesStyled } from './support/component-css'

describe('carousel recipes', () => {
  it('returns the structural classes', () => {
    expect(getCarouselClasses()).toBe('sp-carousel')
    expect(getCarouselClasses({ fade: true })).toBe(
      'sp-carousel sp-carousel--fade'
    )
    expect(getCarouselViewportClasses()).toBe('sp-carousel__viewport')
    expect(getCarouselIndicatorsClasses()).toBe('sp-carousel__indicators')
    expect(getCarouselCaptionClasses()).toBe('sp-carousel__caption')
  })

  it('marks active slides and indicators only when requested', () => {
    expect(getCarouselSlideClasses()).toBe('sp-carousel__slide')
    expect(getCarouselSlideClasses({ active: true })).toBe(
      'sp-carousel__slide sp-carousel__slide--active'
    )
    expect(getCarouselIndicatorClasses({ active: true })).toContain(
      'sp-carousel__indicator--active'
    )
  })

  it('defaults the control direction to next', () => {
    expect(getCarouselControlClasses()).toBe(
      'sp-carousel__control sp-carousel__control--next'
    )
    expect(getCarouselControlClasses({ direction: 'prev' })).toBe(
      'sp-carousel__control sp-carousel__control--prev'
    )
  })
})

describe('carousel CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getCarouselClasses({ fade: true }),
      getCarouselViewportClasses(),
      getCarouselSlideClasses({ active: true }),
      getCarouselControlClasses({ direction: 'prev' }),
      getCarouselControlClasses({ direction: 'next' }),
      getCarouselIndicatorsClasses(),
      getCarouselIndicatorClasses({ active: true }),
      getCarouselCaptionClasses()
    ])
  })
})
