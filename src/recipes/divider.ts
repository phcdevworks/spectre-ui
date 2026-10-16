import { cx } from '../internal/cx'

/**
 * A horizontal rule in `surface.divider` at the component border width, for
 * `<hr>` and section separators.
 */
export function getDividerClasses(): string {
  return cx('sp-divider')
}
