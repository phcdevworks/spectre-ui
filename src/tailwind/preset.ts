import type { Config as TailwindConfig } from "tailwindcss";
import type { SpectreTokens } from "../tokens";
import { createSpectreTailwindTheme } from "./theme";

type TailwindTheme = NonNullable<TailwindConfig["theme"]>;

export interface CreateSpectreTailwindPresetOptions {
  tokens?: SpectreTokens;
  themeOverrides?: TailwindTheme;
  presetOverrides?: TailwindConfig;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// Deep-merge plain objects only; arrays and primitives replace by override.
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

let cachedTokens: SpectreTokens | null = null;

const getRequire = (): ((id: string) => unknown) | null => {
  try {
    // eslint-disable-next-line no-new-func
    return Function("return typeof require !== 'undefined' ? require : null")() as
      | ((id: string) => unknown)
      | null;
  } catch {
    return null;
  }
};

const resolveTokens = (tokens?: SpectreTokens): SpectreTokens => {
  if (tokens) return tokens;
  if (cachedTokens) return cachedTokens;

  const req = getRequire();
  if (!req) {
    throw new Error(
      "[spectre-ui] Unable to load spectre tokens; pass tokens to createSpectreTailwindPreset."
    );
  }

  const mod = req("../tokens") as { spectreTokens: SpectreTokens };
  cachedTokens = mod.spectreTokens;
  return cachedTokens;
};

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
