import {
  DENSITY_MODES,
  THEME_MODES
} from './internal/utility-scales.generated'

/**
 * Every color mode spectre-tokens publishes for
 * `data-spectre-theme="…"` on `<html>` or any element (`light`, `dark`,
 * `high-contrast`, `system`). Generated from the installed tokens.
 */
export const spectreThemeModes = THEME_MODES

/** Every density spectre-tokens publishes for `data-spectre-density="…"`. */
export const spectreDensityModes = DENSITY_MODES

export type SpectreThemeMode = (typeof THEME_MODES)[number]
export type SpectreDensityMode = (typeof DENSITY_MODES)[number]
