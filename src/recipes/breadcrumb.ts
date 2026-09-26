import { cx } from '../internal/cx'

export interface BreadcrumbRecipeOptions {
  /**
   * Suppresses the built-in `/` separator so callers can render their own
   * `getBreadcrumbSeparatorClasses()` element (e.g. an icon) between items.
   */
  customSeparator?: boolean
}

export function getBreadcrumbClasses(opts: BreadcrumbRecipeOptions = {}): string {
  const { customSeparator = false } = opts

  return cx('sp-breadcrumb', customSeparator && 'sp-breadcrumb--custom-separator')
}

export interface BreadcrumbItemRecipeOptions {
  /** Marks the current page; pair with `aria-current="page"`. */
  current?: boolean
}

export function getBreadcrumbItemClasses(
  opts: BreadcrumbItemRecipeOptions = {}
): string {
  const { current = false } = opts

  return cx('sp-breadcrumb__item', current && 'sp-breadcrumb__item--current')
}

export function getBreadcrumbLinkClasses(): string {
  return 'sp-breadcrumb__link'
}

export function getBreadcrumbSeparatorClasses(): string {
  return 'sp-breadcrumb__separator'
}
