import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const CONTAINER_MAX_WIDTHS = {
  none: true,
  prose: true,
  wide: true,
} as const

const CONTAINER_PADDINGS = {
  sm: true,
  md: true,
  lg: true,
} as const

export type ContainerMaxWidth = Exclude<keyof typeof CONTAINER_MAX_WIDTHS, 'none'>
export type ContainerPadding = keyof typeof CONTAINER_PADDINGS

export interface ContainerRecipeOptions {
  maxWidth?: ContainerMaxWidth
  /**
   * Inline padding step from `layout.container.paddingInline`. Omission keeps
   * the default `md` padding with no modifier class.
   */
  padding?: ContainerPadding
}

export function getContainerClasses(opts: ContainerRecipeOptions = {}): string {
  const { maxWidth: maxWidthInput, padding: paddingInput } = opts

  const maxWidth = resolveOption({
    name: 'container maxWidth',
    value: maxWidthInput,
    allowed: CONTAINER_MAX_WIDTHS,
    fallback: 'none',
  })

  const padding =
    paddingInput === undefined
      ? undefined
      : resolveOption({
          name: 'container padding',
          value: paddingInput,
          allowed: CONTAINER_PADDINGS,
          fallback: 'md',
        })

  return cx(
    'sp-container',
    maxWidth !== 'none' && `sp-container--max-width-${maxWidth}`,
    padding && `sp-container--padding-${padding}`
  )
}
