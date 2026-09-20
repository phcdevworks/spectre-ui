import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const MODAL_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true
} as const

const MODAL_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true
} as const

export type ModalAccentEdge = keyof typeof MODAL_ACCENT_EDGES
export type ModalAccentColor = keyof typeof MODAL_ACCENT_COLORS

export interface ModalOverlayRecipeOptions {
  open?: boolean
}

export function getModalOverlayClasses(
  opts: ModalOverlayRecipeOptions = {}
): string {
  const { open = false } = opts

  return cx('sp-modal-overlay', open && 'sp-modal-overlay--open')
}

export interface ModalRecipeOptions {
  open?: boolean
  fullWidth?: boolean
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.modal.accent.thickness` (`spectre-tokens` 4.9.0). Omission
   * renders no rail. `accentColor` defaults to `'brand'` when `accent` is
   * set but `accentColor` is omitted.
   */
  accent?: ModalAccentEdge
  accentColor?: ModalAccentColor
}

export function getModalClasses(opts: ModalRecipeOptions = {}): string {
  const {
    open = false,
    fullWidth = false,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'modal accent edge',
      value: accentInput,
      allowed: MODAL_ACCENT_EDGES,
      fallback: 'top'
    })
    accentEdgeClass = `sp-modal--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'modal accent color',
      value: accentColorInput,
      allowed: MODAL_ACCENT_COLORS,
      fallback: 'brand'
    })
    accentColorClass = `sp-modal--accent-${accentColor}`
  }

  return cx(
    'sp-modal',
    open && 'sp-modal--open',
    fullWidth && 'sp-modal--full',
    accentEdgeClass,
    accentColorClass
  )
}
