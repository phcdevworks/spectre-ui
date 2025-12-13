import { Config } from 'tailwindcss';
import { SpectreTokens } from '@phcdevworks/spectre-tokens';
export { SpectreTokens, default as spectreTokens } from '@phcdevworks/spectre-tokens';

declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/utilities.css";
declare const spectreStyles: {
    index: string;
    base: string;
    components: string;
    utilities: string;
};

type TailwindTheme = NonNullable<Config["theme"]>;
interface SpectreTailwindTheme {
    theme: TailwindTheme;
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

declare const spectrePreset: Config;

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonRecipeOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    iconOnly?: boolean;
}
declare function getButtonClasses(opts?: ButtonRecipeOptions): string;

type CardVariant = "elevated" | "flat" | "outline" | "ghost";
interface CardRecipeOptions {
    variant?: CardVariant;
    interactive?: boolean;
    padded?: boolean;
    fullHeight?: boolean;
}
declare function getCardClasses(opts?: CardRecipeOptions): string;

type InputState = "default" | "error" | "success" | "disabled";
type InputSize = "sm" | "md" | "lg";
interface InputRecipeOptions {
    state?: InputState;
    size?: InputSize;
    fullWidth?: boolean;
}
declare function getInputClasses(opts?: InputRecipeOptions): string;

export { type ButtonRecipeOptions, type ButtonSize, type ButtonVariant, type CardRecipeOptions, type CardVariant, type CreateSpectreTailwindThemeOptions, type InputRecipeOptions, type InputSize, type InputState, type SpectreTailwindTheme, createSpectreTailwindTheme, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreUtilitiesStylesPath };
