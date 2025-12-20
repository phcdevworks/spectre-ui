import type { Config as TailwindConfig } from "tailwindcss";
import { spectreTokens, type SpectreTokens } from "../tokens";
import { createSpectreTailwindTheme } from "./theme";

type TailwindTheme = NonNullable<TailwindConfig["theme"]>;

export interface CreateSpectreTailwindPresetOptions {
  tokens?: SpectreTokens;
  themeOverrides?: TailwindTheme;
  presetOverrides?: TailwindConfig;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const deepMerge = <T extends Record<string, unknown>>(
  base: T,
  overrides?: Record<string, unknown>
): T => {
  if (!overrides) return base;

  const result: Record<string, unknown> = { ...base };

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

const resolveTokens = (tokens?: SpectreTokens): SpectreTokens => tokens ?? spectreTokens;

export const createSpectreTailwindPreset = (
  options: CreateSpectreTailwindPresetOptions = {}
): TailwindConfig => {
  const tokens = resolveTokens(options.tokens);
  const { theme } = createSpectreTailwindTheme({ tokens });
  const mergedTheme = deepMerge(
    theme as Record<string, unknown>,
    options.themeOverrides as Record<string, unknown> | undefined
  );

  const basePreset: TailwindConfig = {
    content: [],
    theme: mergedTheme, // theme is guaranteed non-undefined now
  };

  return deepMerge(
    basePreset as Record<string, unknown>,
    options.presetOverrides as Record<string, unknown> | undefined
  ) as TailwindConfig;
};

export const spectrePreset: TailwindConfig = createSpectreTailwindPreset();

export const spectreTailwindPreset: TailwindConfig = spectrePreset;
