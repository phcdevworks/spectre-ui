import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const STEPPER_ORIENTATIONS = {
  horizontal: true,
  vertical: true
} as const

const STEPPER_STEP_STATES = {
  pending: true,
  active: true,
  done: true
} as const

export type StepperOrientation = keyof typeof STEPPER_ORIENTATIONS
export type StepperStepState = keyof typeof STEPPER_STEP_STATES

export interface StepperRecipeOptions {
  orientation?: StepperOrientation
}

export function getStepperClasses(opts: StepperRecipeOptions = {}): string {
  const orientation = resolveOption({
    name: 'stepper orientation',
    value: opts.orientation,
    allowed: STEPPER_ORIENTATIONS,
    fallback: 'horizontal'
  })

  return cx('sp-stepper', `sp-stepper--${orientation}`)
}

export interface StepperStepRecipeOptions {
  state?: StepperStepState
}

/**
 * One step. A connector to the next step is drawn automatically after every
 * step except the last.
 */
export function getStepperStepClasses(
  opts: StepperStepRecipeOptions = {}
): string {
  const state = resolveOption({
    name: 'stepper step state',
    value: opts.state,
    allowed: STEPPER_STEP_STATES,
    fallback: 'pending'
  })

  return cx('sp-stepper__step', `sp-stepper__step--${state}`)
}

/** The numbered or iconic marker; colored by the parent step's state. */
export function getStepperIndicatorClasses(): string {
  return 'sp-stepper__indicator'
}

export function getStepperLabelClasses(): string {
  return 'sp-stepper__label'
}
