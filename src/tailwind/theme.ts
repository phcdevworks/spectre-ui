import type { Config as TailwindConfig } from 'tailwindcss';
import type { SpectreTokens } from '../tokens';

export interface SpectreTailwindTheme {
  theme: TailwindConfig['theme'];
}

export interface CreateSpectreTailwindThemeOptions {
  tokens: SpectreTokens;
  overrides?: Partial<SpectreTokens>;
}

export function createSpectreTailwindTheme(
  _options: CreateSpectreTailwindThemeOptions,
): SpectreTailwindTheme {
  return { theme: {} };
}
