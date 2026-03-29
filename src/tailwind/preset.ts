import type { Config as TailwindConfig } from "tailwindcss";
import type { SpectreTokens } from "../tokens";
import { createSpectreTailwindTheme } from "./theme";

type TailwindTheme = NonNullable<TailwindConfig["theme"]>;

export interface CreateSpectreTailwindPresetOptions {
  tokens: SpectreTokens;
  themeOverrides?: TailwindTheme;
  presetOverrides?: TailwindConfig;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// Deep-merge plain objects only; arrays and primitives replace by override.
const deepMerge = <T extends object>(
  base: T,
  overrides?: Partial<T>
): T => {
  if (!overrides) return base;

  const result: Record<string, unknown> = {
    ...(base as Record<string, unknown>),
  };

  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
};

export const createSpectreTailwindPreset = (
  options: CreateSpectreTailwindPresetOptions
): TailwindConfig => {
  if (!options.tokens) {
    throw new Error(
      "[spectre-ui] createSpectreTailwindPreset requires tokens; pass { tokens } explicitly."
    );
  }
  const { tokens } = options;
  const { theme } = createSpectreTailwindTheme({ tokens });
  const mergedTheme = deepMerge(theme, options.themeOverrides);

  const basePreset: TailwindConfig = {
    content: [],
    theme: mergedTheme,
  };

  return deepMerge(basePreset, options.presetOverrides);
};
