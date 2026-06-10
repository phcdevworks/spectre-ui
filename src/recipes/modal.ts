import { cx } from '../internal/cx'

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
}

export function getModalClasses(opts: ModalRecipeOptions = {}): string {
  const { open = false, fullWidth = false } = opts

  return cx(
    'sp-modal',
    open && 'sp-modal--open',
    fullWidth && 'sp-modal--full'
  )
}
