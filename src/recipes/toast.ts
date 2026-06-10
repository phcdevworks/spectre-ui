import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const TOAST_VARIANTS = {
  info: true,
  success: true,
  warning: true,
  danger: true,
} as const

export type ToastVariant = keyof typeof TOAST_VARIANTS

export interface ToastRecipeOptions {
  variant?: ToastVariant
  dismissed?: boolean
  fullWidth?: boolean
}

export function getToastClasses(opts: ToastRecipeOptions = {}): string {
  const { variant: variantInput, dismissed = false, fullWidth = false } = opts

  const variant = resolveOption({
    name: 'toast variant',
    value: variantInput,
    allowed: TOAST_VARIANTS,
    fallback: 'info',
  })

  return cx(
    'sp-toast',
    `sp-toast--${variant}`,
    dismissed && 'sp-toast--dismissed',
    fullWidth && 'sp-toast--full'
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
