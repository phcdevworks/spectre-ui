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

  const mergedColors = (mergedTokens as any).colors ?? {};

  const attachSemanticColors = (
    existing: Record<string, any>,
    semantic: Record<string, any> | undefined,
  ) => {
    if (!semantic || Object.keys(semantic).length === 0) {
      return Object.keys(existing).length > 0 ? existing : undefined;
    }

    return {
      ...existing,
      ...semantic,
    };
  };

  const themeColors: Record<string, any> = {
    ...mergedColors,
  };

  const surfaceColors = attachSemanticColors(
    mergedColors.surface ?? {},
    (mergedTokens as any).surface,
  );
  if (surfaceColors) {
    themeColors.surface = surfaceColors;
  }

  const textColors = attachSemanticColors(
    mergedColors.text ?? {},
    (mergedTokens as any).text,
  );
  if (textColors) {
    themeColors.text = textColors;
  }

  const componentColors = attachSemanticColors(
    mergedColors.component ?? {},
    (mergedTokens as any).component,
  );
  if (componentColors) {
    themeColors.component = componentColors;
  }

  const theme: TailwindConfig['theme'] = {
    // Safely map core token groups into Tailwind theme fields.
    // Use `as any` where necessary to avoid overfitting types right now.
    colors: themeColors,
    spacing: (mergedTokens as any).spacing ?? {},
    borderRadius: (mergedTokens as any).radii ?? {},
    boxShadow: (mergedTokens as any).shadows ?? {},
    fontFamily: (mergedTokens as any).typography?.families ?? {},
  };

  return { theme };
}
