import { Config } from 'tailwindcss';
import { SpectreTokens } from '@phcdevworks/spectre-tokens';
export { SpectreTokens, default as spectreTokens } from '@phcdevworks/spectre-tokens';
import * as tailwindcss_types_config from 'tailwindcss/types/config';

declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/utilities.css";
declare const spectreStyles: {
    index: string;
    base: string;
    components: string;
    utilities: string;
};

type TailwindThemeValue = NonNullable<Config["theme"]>;
interface SpectreTailwindTheme {
    theme: TailwindThemeValue;
}
interface CreateSpectreTailwindThemeOptions {
    tokens: SpectreTokens;
    overrides?: Partial<SpectreTokens>;
}
declare function createSpectreTailwindTheme(options: CreateSpectreTailwindThemeOptions): SpectreTailwindTheme;

declare const spectrePreset: {
    content: [];
    theme: Partial<tailwindcss_types_config.CustomThemeConfig & {
        extend: Partial<tailwindcss_types_config.CustomThemeConfig>;
    }>;
};

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
