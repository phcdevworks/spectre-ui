import { createRequire } from "node:module";
import type { Config as TailwindConfig } from "tailwindcss";
import type { SpectreTokens } from "../tokens";
import { createSpectreTailwindTheme } from "./theme";

type TailwindTheme = NonNullable<TailwindConfig["theme"]>;

export interface CreateSpectreTailwindPresetOptions {
  tokens?: SpectreTokens;
  themeOverrides?: TailwindTheme;
  presetOverrides?: TailwindConfig;
}

const require = createRequire(import.meta.url);

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const mergeDeep = <T extends Record<string, unknown>>(
  base: T,
  overrides?: Record<string, unknown>
): T => {
  if (!overrides) return base;

  const result: Record<string, unknown> = { ...base };

  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = mergeDeep(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
};

const resolveTokens = (tokens?: SpectreTokens): SpectreTokens => {
  if (tokens) return tokens;
  const { spectreTokens } = require("../tokens") as { spectreTokens: SpectreTokens };
  return spectreTokens;
};

export const createSpectreTailwindPreset = (
  options: CreateSpectreTailwindPresetOptions = {}
): TailwindConfig => {
  const tokens = resolveTokens(options.tokens);
  const { theme } = createSpectreTailwindTheme({ tokens });
  const mergedTheme = options.themeOverrides
    ? mergeDeep(theme as Record<string, unknown>, options.themeOverrides as Record<string, unknown>)
    : theme;

  const basePreset: TailwindConfig = {
    content: [],
    theme: mergedTheme, // theme is guaranteed non-undefined now
  };

  if (!options.presetOverrides) return basePreset;

  return {
    ...basePreset,
    ...options.presetOverrides,
    theme: options.presetOverrides.theme ?? basePreset.theme,
  };
};

export const spectrePreset: TailwindConfig = createSpectreTailwindPreset();

export const spectreTailwindPreset: TailwindConfig = spectrePreset;
