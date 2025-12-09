import * as tailwindcss_types_config from 'tailwindcss/types/config';
import { Config } from 'tailwindcss';
import { SpectreTokens } from '@phcdevworks/spectre-tokens';
export { SpectreTokens, default as spectreTokens } from '@phcdevworks/spectre-tokens';

declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/dist/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/dist/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/dist/utilities.css";
declare const spectreStyles: {
    base: string;
    components: string;
    utilities: string;
};

declare const spectrePreset: {
    content: never[];
    theme: Partial<tailwindcss_types_config.CustomThemeConfig & {
        extend: Partial<tailwindcss_types_config.CustomThemeConfig>;
    }>;
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

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonTone = 'default' | 'success' | 'warning' | 'danger';
interface ButtonRecipeOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    tone?: ButtonTone;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    iconOnly?: boolean;
}
/**
 * Generate Spectre button classes.
 *
 * Rules:
 * - Base: "sp-btn"
 * - Variant: "sp-btn--primary" / "sp-btn--secondary" / "sp-btn--ghost" / "sp-btn--danger"
 *   - default variant is "primary"
 * - Size: "sp-btn--sm" / "sp-btn--md" / "sp-btn--lg"
 *   - default size is "md"
 * - Tone: "sp-btn--tone-success" / "sp-btn--tone-warning" / "sp-btn--tone-danger"
 *   - default tone is "default" (no tone class)
 * - fullWidth: add "sp-btn--full"
 * - loading: add "sp-btn--loading"
 * - disabled: add "sp-btn--disabled"
 * - iconOnly: add "sp-btn--icon"
 *
 * Must return a single space-joined, trimmed class string.
 */
declare function getButtonClasses(opts?: ButtonRecipeOptions): string;

type CardVariant = 'elevated' | 'outline' | 'ghost';
interface CardRecipeOptions {
    variant?: CardVariant;
    interactive?: boolean;
    padded?: boolean;
    fullHeight?: boolean;
}
/**
 * Generate Spectre card classes.
 *
 * Rules:
 * - Base class: "sp-card"
 * - Variant (default: elevated):
 *   - "sp-card--elevated"
 *   - "sp-card--outline"
 *   - "sp-card--ghost"
 * - interactive: add "sp-card--interactive"
 * - padded: add "sp-card--padded"
 * - fullHeight: add "sp-card--full"
 */
declare function getCardClasses(opts?: CardRecipeOptions): string;

type InputState = 'default' | 'error' | 'success';
type InputSize = 'sm' | 'md' | 'lg';
interface InputRecipeOptions {
    state?: InputState;
    size?: InputSize;
    fullWidth?: boolean;
}
/**
 * Generate Spectre input classes.
 *
 * Rules:
 * - Base class: "sp-input"
 * - State:
 *   - "default" => no state modifier
 *   - "error"   => "sp-input--error"
 *   - "success" => "sp-input--success"
 * - Size (default: md):
 *   - "sp-input--sm"
 *   - "sp-input--md"
 *   - "sp-input--lg"
 * - fullWidth: add "sp-input--full"
 */
declare function getInputClasses(opts?: InputRecipeOptions): string;

export { type ButtonRecipeOptions, type ButtonSize, type ButtonTone, type ButtonVariant, type CardRecipeOptions, type CardVariant, type CreateSpectreTailwindThemeOptions, type InputRecipeOptions, type InputSize, type InputState, type SpectreTailwindTheme, createSpectreTailwindTheme, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreUtilitiesStylesPath };
