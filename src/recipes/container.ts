import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const CONTAINER_MAX_WIDTHS = {
  none: true,
  prose: true,
} as const

export type ContainerMaxWidth = Exclude<keyof typeof CONTAINER_MAX_WIDTHS, 'none'>

export interface ContainerRecipeOptions {
  maxWidth?: ContainerMaxWidth
}

export function getContainerClasses(opts: ContainerRecipeOptions = {}): string {
  const { maxWidth: maxWidthInput } = opts

  const maxWidth = resolveOption({
    name: 'container maxWidth',
    value: maxWidthInput,
    allowed: CONTAINER_MAX_WIDTHS,
    fallback: 'none',
  })

  return cx('sp-container', maxWidth !== 'none' && `sp-container--max-width-${maxWidth}`)
}
