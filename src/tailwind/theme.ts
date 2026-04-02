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

type TokenTree = Record<string, unknown>;

const asTokenTree = (value: unknown): TokenTree =>
  value && typeof value === "object" ? (value as TokenTree) : {};

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
  const t = asTokenTree(mergedTokens);
  const typography = asTokenTree(t.typography);

  const colors = {
    ...asTokenTree(t.colors ?? t.color ?? t.palette),
    surface: asTokenTree(t.surface),
    text: asTokenTree(t.text),
    buttons: asTokenTree(t.buttons),
    forms: asTokenTree(t.forms),
    component: asTokenTree(t.component),
  };
  const spacing = asTokenTree(t.spacing ?? t.space);
  const borderRadius = asTokenTree(t.radii ?? t.radius);
  const boxShadow = asTokenTree(t.shadows ?? t.shadow);
  const fontFamily = asTokenTree(typography.families ?? t.fonts);
  const fontSize = asTokenTree(typography.scale ?? t.fontSize);

  const theme: TailwindTheme = {
    colors: colors as TailwindTheme["colors"],
    spacing: spacing as TailwindTheme["spacing"],
    borderRadius: borderRadius as TailwindTheme["borderRadius"],
    boxShadow: boxShadow as TailwindTheme["boxShadow"],
    fontFamily: fontFamily as TailwindTheme["fontFamily"],
    fontSize: fontSize as TailwindTheme["fontSize"],
  };

  return { theme };
}
