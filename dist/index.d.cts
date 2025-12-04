import { SpectreTokens } from '@phcdevworks/spectre-tokens';
export { SpectreTokens, tokens as spectreTokens } from '@phcdevworks/spectre-tokens';
import { Config } from 'tailwindcss';

interface SpectreTailwindTheme {
    theme: Config['theme'];
}
interface CreateSpectreTailwindThemeOptions {
    tokens: SpectreTokens;
    overrides?: Partial<SpectreTokens>;
}
declare function createSpectreTailwindTheme(options: CreateSpectreTailwindThemeOptions): SpectreTailwindTheme;

declare const spectrePreset: Config;
declare const spectreTailwindPreset: Config;

type SpectreButtonSize = 'sm' | 'md' | 'lg';
type SpectreButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type SpectreButtonState = 'default' | 'hover' | 'disabled';
interface GetButtonClassesOptions {
    variant?: SpectreButtonVariant;
    size?: SpectreButtonSize;
    state?: SpectreButtonState;
    /**
     * Space-separated extra classes appended at the end.
     */
    extraClasses?: string;
}
/**
 * Recipe helper for button class generation.
 *
 * Examples:
 * - getButtonClasses()
 *   => "sp-btn sp-btn--primary sp-btn--md"
 *
 * - getButtonClasses({ variant: "secondary", size: "lg", state: "disabled" })
 *   => "sp-btn sp-btn--secondary sp-btn--lg sp-btn--disabled"
 */
declare const getButtonClasses: (options?: GetButtonClassesOptions) => string;

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

declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/dist/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/dist/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/dist/utilities.css";
declare const spectreStyles: {
    base: string;
    components: string;
    utilities: string;
};

export { type CreateSpectreTailwindThemeOptions, type GetButtonClassesOptions, type GetCardClassesOptions, type GetInputClassesOptions, type SpectreButtonSize, type SpectreButtonState, type SpectreButtonVariant, type SpectreCardVariant, type SpectreInputState, type SpectreTailwindTheme, createSpectreTailwindTheme, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreTailwindPreset, spectreUtilitiesStylesPath };
