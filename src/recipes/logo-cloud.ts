import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const LOGO_CLOUD_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const

const LOGO_CLOUD_FILLS = {
  subtle: true,
  card: true,
  none: true,
} as const

export type LogoCloudSize = keyof typeof LOGO_CLOUD_SIZES
export type LogoCloudFill = keyof typeof LOGO_CLOUD_FILLS

export interface LogoCloudRecipeOptions {
  /** Square tile size: `sm` 64px, `md` 96px, `lg` 128px (`--sp-space-*`). */
  size?: LogoCloudSize
  /** Tile background: `surface.subtle` (default), `surface.card`, or none. */
  fill?: LogoCloudFill
  /**
   * Shows marks desaturated at rest and in full color on hover or focus.
   * Marks stay in full color under `prefers-contrast: more` and forced
   * colors, and the change is instant under `prefers-reduced-motion`.
   */
  muted?: boolean
}

export function getLogoCloudClasses(opts: LogoCloudRecipeOptions = {}): string {
  const { size: sizeInput, fill: fillInput, muted = false } = opts

  const size = resolveOption({
    name: 'logo cloud size',
    value: sizeInput,
    allowed: LOGO_CLOUD_SIZES,
    fallback: 'md',
  })

  const fill = resolveOption({
    name: 'logo cloud fill',
    value: fillInput,
    allowed: LOGO_CLOUD_FILLS,
    fallback: 'subtle',
  })

  return cx(
    'sp-logo-cloud',
    `sp-logo-cloud--${size}`,
    `sp-logo-cloud--fill-${fill}`,
    muted && 'sp-logo-cloud--muted'
  )
}

export function getLogoCloudItemClasses(): string {
  return cx('sp-logo-cloud__item')
}
