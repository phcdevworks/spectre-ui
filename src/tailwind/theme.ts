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
  options: CreateSpectreTailwindThemeOptions,
): SpectreTailwindTheme {
  const { tokens, overrides } = options;

  // Shallow merge overrides into tokens
  const mergedTokens: SpectreTokens = {
    ...tokens,
    ...(overrides ?? {}),
  };

  const theme: TailwindConfig['theme'] = {
    // Safely map core token groups into Tailwind theme fields.
    // Use `as any` where necessary to avoid overfitting types right now.
    colors: (mergedTokens as any).colors ?? {},
    spacing: (mergedTokens as any).spacing ?? {},
    borderRadius: (mergedTokens as any).radii ?? {},
    boxShadow: (mergedTokens as any).shadows ?? {},
    fontFamily: (mergedTokens as any).typography?.families ?? {},
  };

  return { theme };
}
