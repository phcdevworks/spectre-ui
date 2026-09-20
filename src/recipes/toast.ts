import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TOAST_VARIANTS = {
  info: true,
  success: true,
  warning: true,
  danger: true,
} as const

const TOAST_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true,
} as const

const TOAST_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true,
} as const

export type ToastVariant = keyof typeof TOAST_VARIANTS
export type ToastAccentEdge = keyof typeof TOAST_ACCENT_EDGES
export type ToastAccentColor = keyof typeof TOAST_ACCENT_COLORS

export interface ToastRecipeOptions {
  variant?: ToastVariant
  dismissed?: boolean
  fullWidth?: boolean
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.toast.accent.thickness` (`spectre-tokens` 4.9.0). Distinct
   * from `variant`, which controls the toast's own info/success/warning/
   * danger fill. Omission renders no rail. `accentColor` defaults to
   * `'brand'` when `accent` is set but `accentColor` is omitted.
   */
  accent?: ToastAccentEdge
  accentColor?: ToastAccentColor
}

export function getToastClasses(opts: ToastRecipeOptions = {}): string {
  const {
    variant: variantInput,
    dismissed = false,
    fullWidth = false,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts

  const variant = resolveOption({
    name: 'toast variant',
    value: variantInput,
    allowed: TOAST_VARIANTS,
    fallback: 'info',
  })

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'toast accent edge',
      value: accentInput,
      allowed: TOAST_ACCENT_EDGES,
      fallback: 'left',
    })
    accentEdgeClass = `sp-toast--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'toast accent color',
      value: accentColorInput,
      allowed: TOAST_ACCENT_COLORS,
      fallback: 'brand',
    })
    accentColorClass = `sp-toast--accent-${accentColor}`
  }

  return cx(
    'sp-toast',
    `sp-toast--${variant}`,
    dismissed && 'sp-toast--dismissed',
    fullWidth && 'sp-toast--full',
    accentEdgeClass,
    accentColorClass
  )
}

export interface ToastIconRecipeOptions {
  variant?: ToastVariant
}

export function getToastIconClasses(
  opts: ToastIconRecipeOptions = {}
): string {
  const { variant: variantInput } = opts

  const variant = resolveOption({
    name: 'toast variant',
    value: variantInput,
    allowed: TOAST_VARIANTS,
    fallback: 'info',
  })

  return cx('sp-toast__icon', `sp-toast__icon--${variant}`)
}
