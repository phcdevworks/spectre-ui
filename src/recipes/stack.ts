import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const STACK_DIRECTIONS = {
  vertical: true,
  horizontal: true,
} as const

const STACK_BASES = {
  none: true,
  sidebar: true,
} as const

const STACK_ALIGNS = {
  center: true,
  stretch: true,
} as const

export type StackDirection = keyof typeof STACK_DIRECTIONS
export type StackBasis = Exclude<keyof typeof STACK_BASES, 'none'>
export type StackAlign = keyof typeof STACK_ALIGNS

export interface StackRecipeOptions {
  direction?: StackDirection
  basis?: StackBasis
  align?: StackAlign
}

export function getStackClasses(opts: StackRecipeOptions = {}): string {
  const { direction: directionInput, basis: basisInput, align: alignInput } = opts

  const direction = resolveOption({
    name: 'stack direction',
    value: directionInput,
    allowed: STACK_DIRECTIONS,
    fallback: 'vertical',
  })

  const basis = resolveOption({
    name: 'stack basis',
    value: basisInput,
    allowed: STACK_BASES,
    fallback: 'none',
  })

  const align = resolveOption({
    name: 'stack align',
    value: alignInput,
    allowed: STACK_ALIGNS,
    fallback: 'center',
  })

  return cx(
    direction === 'horizontal' ? 'sp-hstack' : 'sp-stack',
    basis !== 'none' && `sp-stack--basis-${basis}`,
    align !== 'center' && `sp-stack--align-${align}`
  )
}
