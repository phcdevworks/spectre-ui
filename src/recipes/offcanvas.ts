import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const OFFCANVAS_PLACEMENTS = {
  start: true,
  end: true,
  top: true,
  bottom: true
} as const

export type OffcanvasPlacement = keyof typeof OFFCANVAS_PLACEMENTS

export interface OffcanvasRecipeOptions {
  /** The viewport edge the panel slides in from. */
  placement?: OffcanvasPlacement
  open?: boolean
}

export function getOffcanvasClasses(opts: OffcanvasRecipeOptions = {}): string {
  const { placement: placementInput, open = false } = opts

  const placement = resolveOption({
    name: 'offcanvas placement',
    value: placementInput,
    allowed: OFFCANVAS_PLACEMENTS,
    fallback: 'start'
  })

  return cx(
    'sp-offcanvas',
    `sp-offcanvas--${placement}`,
    open && 'sp-offcanvas--open'
  )
}

export interface OffcanvasBackdropRecipeOptions {
  open?: boolean
}

export function getOffcanvasBackdropClasses(
  opts: OffcanvasBackdropRecipeOptions = {}
): string {
  const { open = false } = opts

  return cx('sp-offcanvas-backdrop', open && 'sp-offcanvas-backdrop--open')
}

export function getOffcanvasHeaderClasses(): string {
  return 'sp-offcanvas__header'
}

export function getOffcanvasBodyClasses(): string {
  return 'sp-offcanvas__body'
}

export function getOffcanvasFooterClasses(): string {
  return 'sp-offcanvas__footer'
}
