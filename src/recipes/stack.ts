import { resolveOption } from '../internal/resolve-option'

const STACK_DIRECTIONS = {
  vertical: true,
  horizontal: true,
} as const

export type StackDirection = keyof typeof STACK_DIRECTIONS

export interface StackRecipeOptions {
  direction?: StackDirection
}

export function getStackClasses(opts: StackRecipeOptions = {}): string {
  const { direction: directionInput } = opts

  const direction = resolveOption({
    name: 'stack direction',
    value: directionInput,
    allowed: STACK_DIRECTIONS,
    fallback: 'vertical',
  })

  return direction === 'horizontal' ? 'sp-hstack' : 'sp-stack'
}
