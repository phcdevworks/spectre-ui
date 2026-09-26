import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const CAROUSEL_CONTROL_DIRECTIONS = {
  prev: true,
  next: true
} as const

export type CarouselControlDirection = keyof typeof CAROUSEL_CONTROL_DIRECTIONS

export interface CarouselRecipeOptions {
  /**
   * Stacks slides and cross-fades to the one marked `active` instead of
   * scroll-snapping between them; the caller toggles `active`.
   */
  fade?: boolean
}

export function getCarouselClasses(opts: CarouselRecipeOptions = {}): string {
  const { fade = false } = opts

  return cx('sp-carousel', fade && 'sp-carousel--fade')
}

/**
 * The scroll-snapping slide track. Slides snap one per view with native
 * scrolling, so the carousel stays usable without script; callers that
 * drive it programmatically scroll this element.
 */
export function getCarouselViewportClasses(): string {
  return 'sp-carousel__viewport'
}

export interface CarouselSlideRecipeOptions {
  active?: boolean
}

export function getCarouselSlideClasses(
  opts: CarouselSlideRecipeOptions = {}
): string {
  const { active = false } = opts

  return cx('sp-carousel__slide', active && 'sp-carousel__slide--active')
}

export interface CarouselControlRecipeOptions {
  direction?: CarouselControlDirection
}

export function getCarouselControlClasses(
  opts: CarouselControlRecipeOptions = {}
): string {
  const direction = resolveOption({
    name: 'carousel control direction',
    value: opts.direction,
    allowed: CAROUSEL_CONTROL_DIRECTIONS,
    fallback: 'next'
  })

  return cx('sp-carousel__control', `sp-carousel__control--${direction}`)
}

export function getCarouselIndicatorsClasses(): string {
  return 'sp-carousel__indicators'
}

export interface CarouselIndicatorRecipeOptions {
  active?: boolean
}

export function getCarouselIndicatorClasses(
  opts: CarouselIndicatorRecipeOptions = {}
): string {
  const { active = false } = opts

  return cx(
    'sp-carousel__indicator',
    active && 'sp-carousel__indicator--active is-active'
  )
}

export function getCarouselCaptionClasses(): string {
  return 'sp-carousel__caption'
}
