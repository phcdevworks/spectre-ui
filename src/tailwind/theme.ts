import type { Config as TailwindConfig } from "tailwindcss";
import type { SpectreTokens } from "../tokens";

type TailwindTheme = NonNullable<TailwindConfig["theme"]>;

export interface SpectreTailwindTheme {
  theme: TailwindTheme;
}

export interface CreateSpectreTailwindThemeOptions {
  tokens: SpectreTokens;
  overrides?: Partial<SpectreTokens>;
}

/**
 * Minimal, type-safe theme mapper.
 * Important: theme is NEVER undefined (fixes exactOptionalPropertyTypes + DTS).
 */
export function createSpectreTailwindTheme(
  options: CreateSpectreTailwindThemeOptions
): SpectreTailwindTheme {
  const mergedTokens = {
    ...(options.tokens ?? ({} as SpectreTokens)),
    ...(options.overrides ?? {}),
  } as SpectreTokens;

  // We keep mapping shallow + permissive because token shapes will evolve.
  // Tailwind accepts nested objects of strings for colors.
  const t: any = mergedTokens;

  const colors = (t.colors ?? t.color ?? t.palette ?? {}) as Record<string, any>;
  const spacing = (t.spacing ?? t.space ?? {}) as Record<string, any>;
  const borderRadius = (t.radii ?? t.radius ?? {}) as Record<string, any>;
  const boxShadow = (t.shadows ?? t.shadow ?? {}) as Record<string, any>;
  const fontFamily = (t.typography?.families ?? t.fonts ?? {}) as Record<string, any>;
  const fontSize = (t.typography?.scale ?? t.fontSize ?? {}) as Record<string, any>;

  const theme: TailwindTheme = {
    colors: colors as any,
    spacing: spacing as any,
    borderRadius: borderRadius as any,
    boxShadow: boxShadow as any,
    fontFamily: fontFamily as any,
    fontSize: fontSize as any,
  };

  return { theme };
}
