import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import {
  DURATION_STEPS,
  EASING_STEPS
} from '../internal/utility-scales.generated'

// The published animations; each swaps to its `animations.reducedMotion`
// counterpart under `prefers-reduced-motion`.
const MOTION_ANIMATIONS = {
  fadeIn: 'fade-in',
  fadeOut: 'fade-out',
  slideUp: 'slide-up',
  slideDown: 'slide-down',
  scaleIn: 'scale-in',
  bounce: 'bounce',
  pulse: 'pulse',
  shake: 'shake',
} as const

const MOTION_TRANSITIONS = {
  all: 'sp-transition',
  colors: 'sp-transition-colors',
  opacity: 'sp-transition-opacity',
  transform: 'sp-transition-transform',
  none: 'sp-transition-none',
} as const

const MOTION_DURATIONS = DURATION_STEPS
const MOTION_EASINGS = EASING_STEPS

export type MotionAnimation = keyof typeof MOTION_ANIMATIONS
export type MotionTransition = keyof typeof MOTION_TRANSITIONS
export type MotionDuration = (typeof DURATION_STEPS)[number]
export type MotionEasing = (typeof EASING_STEPS)[number]

export interface MotionRecipeOptions {
  animation?: MotionAnimation
  /** Which properties transition; `all` covers colors, shadow, opacity, transform. */
  transition?: MotionTransition
  /** Overrides the duration from `--sp-duration-*`. */
  duration?: MotionDuration
  /** Overrides the timing function from `--sp-easing-*`. */
  easing?: MotionEasing
}

export function getMotionClasses(opts: MotionRecipeOptions = {}): string {
  const {
    animation: animationInput,
    transition: transitionInput,
    duration: durationInput,
    easing: easingInput,
  } = opts

  const animation =
    animationInput === undefined
      ? undefined
      : resolveOption({
          name: 'motion animation',
          value: animationInput,
          allowed: MOTION_ANIMATIONS,
          fallback: 'fadeIn',
        })

  const transition =
    transitionInput === undefined
      ? undefined
      : resolveOption({
          name: 'motion transition',
          value: transitionInput,
          allowed: MOTION_TRANSITIONS,
          fallback: 'all',
        })

  const duration =
    durationInput === undefined
      ? undefined
      : resolveOption({
          name: 'motion duration',
          value: durationInput,
          allowed: MOTION_DURATIONS,
          fallback: 'base',
        })

  const easing =
    easingInput === undefined
      ? undefined
      : resolveOption({
          name: 'motion easing',
          value: easingInput,
          allowed: MOTION_EASINGS,
          fallback: 'out',
        })

  return cx(
    animation && `sp-animate-${MOTION_ANIMATIONS[animation]}`,
    transition && MOTION_TRANSITIONS[transition],
    duration && `sp-duration-${duration}`,
    easing && `sp-ease-${easing}`
  )
}
