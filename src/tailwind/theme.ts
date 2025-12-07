import type { Config as TailwindConfig } from "tailwindcss";
import type { SpectreTokens } from "../tokens";

export interface SpectreTailwindTheme {
  theme: TailwindConfig["theme"];
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
    ...(tokens as SpectreTokens),
    ...(overrides as Partial<SpectreTokens> | undefined),
  };

  // Minimal, semantic color mapping
  const colors: Record<string, unknown> = {
    page: mergedTokens.surface?.page,
    card: mergedTokens.surface?.card,
    input: mergedTokens.surface?.input,
    text: {
      page: mergedTokens.text?.onPage?.default,
      "page-muted": mergedTokens.text?.onPage?.muted,
      surface: mergedTokens.text?.onSurface?.default,
      "surface-muted": mergedTokens.text?.onSurface?.muted,
    },
    primary:
      (mergedTokens as any).buttons?.primary?.bg ??
      (mergedTokens as any).colors?.primary,
  };

  const spacing: Record<string, unknown> =
    (mergedTokens as any).spacing ?? {};

  const borderRadius: Record<string, unknown> =
    (mergedTokens as any).radii ?? {};

  const boxShadow: Record<string, unknown> =
    (mergedTokens as any).shadows ?? {};

  const fontFamily: Record<string, unknown> =
    (mergedTokens as any).typography?.families ?? {};

  const theme: TailwindConfig["theme"] = {
    colors: colors as any,
    spacing: spacing as any,
    borderRadius: borderRadius as any,
    boxShadow: boxShadow as any,
    fontFamily: fontFamily as any,
  };

  return { theme };
}
