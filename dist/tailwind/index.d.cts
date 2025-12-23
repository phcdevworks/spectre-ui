import { Config } from 'tailwindcss';
import { SpectreTokens } from '@phcdevworks/spectre-tokens';

type TailwindTheme$1 = NonNullable<Config["theme"]>;
interface SpectreTailwindTheme {
    theme: TailwindTheme$1;
}
interface CreateSpectreTailwindThemeOptions {
    tokens: SpectreTokens;
    overrides?: Partial<SpectreTokens>;
}
/**
 * Minimal, type-safe theme mapper.
 * Important: theme is NEVER undefined (fixes exactOptionalPropertyTypes + DTS).
 */
declare function createSpectreTailwindTheme(options: CreateSpectreTailwindThemeOptions): SpectreTailwindTheme;

type TailwindTheme = NonNullable<Config["theme"]>;
interface CreateSpectreTailwindPresetOptions {
    tokens?: SpectreTokens;
    themeOverrides?: TailwindTheme;
    presetOverrides?: Config;
}
declare const createSpectreTailwindPreset: (options?: CreateSpectreTailwindPresetOptions) => Config;

export { type CreateSpectreTailwindThemeOptions, type SpectreTailwindTheme, createSpectreTailwindPreset, createSpectreTailwindTheme };
