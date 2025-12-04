import { Config } from 'tailwindcss';
import { SpectreTokens } from '@phcdevworks/spectre-tokens';
export { SpectreTokens, tokens as spectreTokens } from '@phcdevworks/spectre-tokens';

declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/dist/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/dist/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/dist/utilities.css";
declare const spectreStyles: {
    base: string;
    components: string;
    utilities: string;
};

declare const spectrePreset: Config;

interface SpectreTailwindTheme {
    theme: Config['theme'];
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

type SpectreCardVariant = 'elevated' | 'outline' | 'ghost';
interface GetCardClassesOptions {
    variant?: SpectreCardVariant;
    padded?: boolean;
    interactive?: boolean;
    fullHeight?: boolean;
    /**
     * Space-separated extra classes appended at the end.
     */
    extraClasses?: string;
}
/**
 * Recipe helper for card class generation.
 *
 * Examples:
 * - getCardClasses()
 *   => "sp-card sp-card--elevated"
 *
 * - getCardClasses({ variant: "outline", padded: true })
 *   => "sp-card sp-card--outline sp-card--padded"
 */
declare const getCardClasses: (options?: GetCardClassesOptions) => string;

type SpectreInputState = 'default' | 'error' | 'success' | 'disabled';
interface GetInputClassesOptions {
    state?: SpectreInputState;
    fullWidth?: boolean;
    /**
     * Space-separated extra classes appended at the end.
     */
    extraClasses?: string;
}
/**
 * Recipe helper for input class generation.
 *
 * Examples:
 * - getInputClasses()
 *   => "sp-input"
 *
 * - getInputClasses({ state: "error" })
 *   => "sp-input sp-input--error"
 */
declare const getInputClasses: (options?: GetInputClassesOptions) => string;

export { type ButtonRecipeOptions, type ButtonSize, type ButtonTone, type ButtonVariant, type CreateSpectreTailwindThemeOptions, type GetCardClassesOptions, type GetInputClassesOptions, type SpectreCardVariant, type SpectreInputState, type SpectreTailwindTheme, createSpectreTailwindTheme, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreUtilitiesStylesPath };
