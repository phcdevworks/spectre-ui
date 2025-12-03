import { Config } from 'tailwindcss';

type SpectreTokenScale = Record<string, string | number>;
type SpectreTransitionTokens = Record<string, string>;
type SpectreTypographyTokens = Record<string, string>;
type SpectreAccessibilityTokens = Record<string, string>;
type SpectreAnimationEntry = Record<string, unknown>;
type SpectreButtonStateTokens = Record<string, string>;
type SpectreFormStateTokens = Record<string, string>;
interface SpectreTokens {
    /**
     * Placeholder token groups. Actual structure will be defined in a future release.
     */
    [group: string]: unknown;
}
interface SpectreCssVariableOptions {
    selector?: string;
    prefix?: string;
}
type SpectreCssVariableMap = Record<string, string>;
declare const spectreTokens: SpectreTokens;
declare const createSpectreCssVariableMap: (_source?: SpectreTokens, _options?: SpectreCssVariableOptions) => SpectreCssVariableMap;
declare const generateSpectreCssVariables: (_source?: SpectreTokens, _options?: SpectreCssVariableOptions) => string;

interface SpectreTailwindTheme {
    theme: Config['theme'];
}
interface CreateSpectreTailwindThemeOptions {
    tokens: SpectreTokens;
    overrides?: Partial<SpectreTokens>;
}
declare function createSpectreTailwindTheme(_options: CreateSpectreTailwindThemeOptions): SpectreTailwindTheme;

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

export { type CreateSpectreTailwindThemeOptions, type GetButtonClassesOptions, type GetCardClassesOptions, type GetInputClassesOptions, type SpectreAccessibilityTokens, type SpectreAnimationEntry, type SpectreButtonSize, type SpectreButtonState, type SpectreButtonStateTokens, type SpectreButtonVariant, type SpectreCardVariant, type SpectreCssVariableMap, type SpectreCssVariableOptions, type SpectreFormStateTokens, type SpectreInputState, type SpectreTailwindTheme, type SpectreTokenScale, type SpectreTokens, type SpectreTransitionTokens, type SpectreTypographyTokens, createSpectreCssVariableMap, createSpectreTailwindTheme, generateSpectreCssVariables, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreTailwindPreset, spectreTokens, spectreUtilitiesStylesPath };
