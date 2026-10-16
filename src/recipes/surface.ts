import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import { SURFACE_ROLES } from '../internal/utility-scales.generated'

// Every background role spectre-tokens publishes as --sp-surface-*. Most
// emit the generated `sp-bg-surface-{role}` utility; `input`, `inverse`, and
// `hero` emit their documented `sp-surface--{role}` classes (same tokens).
const SURFACE_CLASS_OVERRIDES: Partial<Record<string, string>> = {
  input: 'sp-surface--input',
  inverse: 'sp-surface--inverse',
  hero: 'sp-surface--hero'
}

export type SurfaceBackground = (typeof SURFACE_ROLES)[number]

export interface SurfaceRecipeOptions {
  surface?: SurfaceBackground
  /** Paints `surface.hover` on `:hover` (or with an `is-hover` class). */
  hover?: boolean
  /** Paints `surface.selected`, e.g. a selected list or menu item. */
  selected?: boolean
  /** Paints `surface.active` on `:active` (or with an `is-active` class). */
  active?: boolean
}

export function getSurfaceClasses(opts: SurfaceRecipeOptions = {}): string {
  const {
    surface: surfaceInput,
    hover = false,
    selected = false,
    active = false
  } = opts

  const surface =
    surfaceInput === undefined
      ? undefined
      : resolveOption({
          name: 'surface',
          value: surfaceInput,
          allowed: SURFACE_ROLES,
          fallback: 'page'
        })

  return cx(
    surface &&
      (SURFACE_CLASS_OVERRIDES[surface] ?? `sp-bg-surface-${surface}`),
    hover && 'sp-surface--hover',
    selected && 'sp-surface--selected',
    active && 'sp-surface--active'
  )
}
