import type { Config as TailwindConfig } from "tailwindcss";
import type { SpectreTokens } from "../tokens";

type TailwindThemeValue = NonNullable<TailwindConfig["theme"]>;

export interface SpectreTailwindTheme {
  theme: TailwindThemeValue;
}

export interface CreateSpectreTailwindThemeOptions {
  tokens: SpectreTokens;
  overrides?: Partial<SpectreTokens>;
}
type TailwindColors = TailwindThemeValue extends { colors?: infer C }
  ? C
  : Record<string, unknown>;
type TailwindSpacing = TailwindThemeValue extends { spacing?: infer S }
  ? S
  : Record<string, string>;
type TailwindBorderRadius = TailwindThemeValue extends {
  borderRadius?: infer R;
}
  ? R
  : Record<string, string>;
type TailwindBoxShadow = TailwindThemeValue extends { boxShadow?: infer B }
  ? B
  : Record<string, string>;
type TailwindFontFamily = TailwindThemeValue extends { fontFamily?: infer F }
  ? F
  : Record<string, unknown>;
type TailwindFontSize = TailwindThemeValue extends { fontSize?: infer F }
  ? F
  : Record<string, unknown>;

type SemanticValue = string | { value: string };

const resolveSemanticValue = (value?: SemanticValue | null): string | undefined => {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object" && "value" in value) {
    const resolved = (value as { value?: string }).value;
    return typeof resolved === "string" ? resolved : undefined;
  }
  return undefined;
};

const removeUndefinedEntries = (
  entries: Record<string, string | undefined>,
): Record<string, string> =>
  Object.entries(entries).reduce<Record<string, string>>((acc, [key, val]) => {
    if (typeof val === "string") {
      acc[key] = val;
    }
    return acc;
  }, {});

const buildFontFamilies = (
  families: Record<string, string> | undefined,
): Record<string, string[]> =>
  Object.entries(families ?? {}).reduce<Record<string, string[]>>(
    (acc, [key, value]) => {
      const stack = value
        .split(",")
        .map((font) => font.trim())
        .map((font) => font.replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
      if (stack.length > 0) {
        acc[key] = stack;
      }
      return acc;
    },
    {},
  );

const buildFontSizes = (
  scale: SpectreTokens["typography"] extends { scale: infer S } ? S : never,
): TailwindFontSize =>
  Object.entries(scale ?? {}).reduce<Record<string, [string, Record<string, string | number>]>>(
    (acc, [key, value]) => {
      if (!value?.fontSize) {
        return acc;
      }
      const meta: Record<string, string | number> = {};
      if (value.lineHeight) {
        meta.lineHeight = value.lineHeight;
      }
      if (typeof value.fontWeight !== "undefined") {
        meta.fontWeight = value.fontWeight;
      }
      if (value.letterSpacing) {
        meta.letterSpacing = value.letterSpacing;
      }
      acc[key] = [value.fontSize, meta];
      return acc;
    },
    {},
  );

export function createSpectreTailwindTheme(
  options: CreateSpectreTailwindThemeOptions,
): SpectreTailwindTheme {
  const { tokens, overrides } = options;

  const mergedTokens: SpectreTokens = {
    ...tokens,
    ...(overrides ?? {}),
  };

  const baseMode = mergedTokens.modes?.default ?? {};
  const surfaceColors = removeUndefinedEntries({
    page: resolveSemanticValue(baseMode.surface?.page ?? mergedTokens.surface?.page),
    card: resolveSemanticValue(baseMode.surface?.card ?? mergedTokens.surface?.card),
    input: resolveSemanticValue(baseMode.surface?.input ?? mergedTokens.surface?.input),
    overlay: resolveSemanticValue(baseMode.surface?.overlay ?? mergedTokens.surface?.overlay),
  });

  const textColors = {
    onPage: removeUndefinedEntries({
      default: resolveSemanticValue(
        baseMode.text?.onPage?.default ?? mergedTokens.text?.onPage?.default,
      ),
      muted: resolveSemanticValue(
        baseMode.text?.onPage?.muted ?? mergedTokens.text?.onPage?.muted,
      ),
      subtle: resolveSemanticValue(
        baseMode.text?.onPage?.subtle ?? mergedTokens.text?.onPage?.subtle,
      ),
      meta: resolveSemanticValue(
        baseMode.text?.onPage?.meta ?? mergedTokens.text?.onPage?.meta,
      ),
    }),
    onSurface: removeUndefinedEntries({
      default: resolveSemanticValue(
        baseMode.text?.onSurface?.default ?? mergedTokens.text?.onSurface?.default,
      ),
      muted: resolveSemanticValue(
        baseMode.text?.onSurface?.muted ?? mergedTokens.text?.onSurface?.muted,
      ),
      subtle: resolveSemanticValue(
        baseMode.text?.onSurface?.subtle ?? mergedTokens.text?.onSurface?.subtle,
      ),
      meta: resolveSemanticValue(
        baseMode.text?.onSurface?.meta ?? mergedTokens.text?.onSurface?.meta,
      ),
    }),
  };

  const componentBase = mergedTokens.component;
  const componentMode = baseMode.component;
  const componentColors = {
    card: removeUndefinedEntries({
      text: resolveSemanticValue(componentMode?.card?.text ?? componentBase?.card?.text),
      textMuted: resolveSemanticValue(
        componentMode?.card?.textMuted ?? componentBase?.card?.textMuted,
      ),
    }),
    input: removeUndefinedEntries({
      text: resolveSemanticValue(componentMode?.input?.text ?? componentBase?.input?.text),
      placeholder: resolveSemanticValue(
        componentMode?.input?.placeholder ?? componentBase?.input?.placeholder,
      ),
    }),
    button: removeUndefinedEntries({
      textDefault: resolveSemanticValue(
        componentMode?.button?.textDefault ?? componentBase?.button?.textDefault,
      ),
      textOnPrimary: resolveSemanticValue(
        componentMode?.button?.textOnPrimary ?? componentBase?.button?.textOnPrimary,
      ),
    }),
    badge: {
      primary: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.primary?.bg ?? componentBase?.badge?.primary?.bg,
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.primary?.text ?? componentBase?.badge?.primary?.text,
        ),
      }),
      success: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.success?.bg ?? componentBase?.badge?.success?.bg,
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.success?.text ?? componentBase?.badge?.success?.text,
        ),
      }),
      warning: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.warning?.bg ?? componentBase?.badge?.warning?.bg,
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.warning?.text ?? componentBase?.badge?.warning?.text,
        ),
      }),
      danger: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.danger?.bg ?? componentBase?.badge?.danger?.bg,
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.danger?.text ?? componentBase?.badge?.danger?.text,
        ),
      }),
    },
  };

  const colors = {
    ...(mergedTokens.colors ?? {}),
    surface: surfaceColors,
    text: textColors,
    component: componentColors,
  } satisfies TailwindColors;

  const spacing = (mergedTokens.spacing ?? {}) as TailwindSpacing;
  const borderRadius = (mergedTokens.radii ?? {}) as TailwindBorderRadius;
  const boxShadow = (mergedTokens.shadows ?? {}) as TailwindBoxShadow;
  const fontFamily = buildFontFamilies(mergedTokens.typography?.families) as TailwindFontFamily;
  const fontSize = buildFontSizes(mergedTokens.typography?.scale ?? {}) as TailwindFontSize;

  const theme: TailwindThemeValue = {
    colors,
    spacing,
    borderRadius,
    boxShadow,
    fontFamily,
    fontSize,
  };

  return { theme };
}
