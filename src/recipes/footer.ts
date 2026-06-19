import { cx } from '../internal/cx'

export interface FooterRecipeOptions {
  bordered?: boolean
  fullWidth?: boolean
}

export function getFooterClasses(opts: FooterRecipeOptions = {}): string {
  const { bordered = false, fullWidth = false } = opts

  return cx('sp-footer', bordered && 'sp-footer--bordered', fullWidth && 'sp-footer--full')
}
