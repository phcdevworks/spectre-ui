import { Tokens, TailwindTheme, AccessibilityTokens, AnimationEntry, ButtonStateTokens, FormStateTokens, TokenScale, TransitionTokens, TypographyTokens } from '@phcdevworks/spectre-tokens';
import { Config } from 'tailwindcss';

declare const spectreTokens: Tokens;
declare const spectreTailwindTheme: TailwindTheme;
declare const spectreTailwindPreset: {
    theme: TailwindTheme;
};
type SpectreTokens = Tokens;
type SpectreTailwindTheme = TailwindTheme;
type SpectreTokenScale = TokenScale;
type SpectreTransitionTokens = TransitionTokens;
type SpectreTypographyTokens = TypographyTokens;
type SpectreAccessibilityTokens = AccessibilityTokens;
type SpectreAnimationEntry = AnimationEntry;
type SpectreButtonStateTokens = ButtonStateTokens;
type SpectreFormStateTokens = FormStateTokens;
interface SpectreCssVariableOptions {
    selector?: string;
    prefix?: string;
}
type SpectreCssVariableMap = Record<string, string>;
declare const createSpectreTailwindTheme: (source?: SpectreTokens) => SpectreTailwindTheme;
declare const createSpectreCssVariableMap: (source?: SpectreTokens, options?: SpectreCssVariableOptions) => SpectreCssVariableMap;
declare const generateSpectreCssVariables: (source?: SpectreTokens, options?: SpectreCssVariableOptions) => string;

declare const spectrePreset: Config;

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonState = 'default' | 'hover' | 'active' | 'disabled';

interface GetButtonClassesOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    state?: ButtonState;
    extraClasses?: string;
}
declare const getButtonClasses: ({ variant, size, state, extraClasses, }?: GetButtonClassesOptions) => string;

type InputState = 'default' | 'focus' | 'invalid' | 'valid' | 'disabled';

interface GetInputClassesOptions {
    state?: InputState;
    extraClasses?: string;
}
declare const getInputClasses: ({ state, extraClasses, }?: GetInputClassesOptions) => string;

type CardVariant = 'base' | 'elevated' | 'flat';

interface GetCardClassesOptions {
    variant?: CardVariant;
    extraClasses?: string;
}
declare const getCardClasses: ({ variant, extraClasses, }?: GetCardClassesOptions) => string;

declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/dist/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/dist/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/dist/utilities.css";
/**
 * Structured helper for consumers that prefer namespaced CSS entry points.
 */
declare const spectreStyles: {
    readonly base: "@phcdevworks/spectre-ui/dist/base.css";
    readonly components: "@phcdevworks/spectre-ui/dist/components.css";
    readonly utilities: "@phcdevworks/spectre-ui/dist/utilities.css";
};

export { type ButtonSize, type ButtonState, type ButtonVariant, type CardVariant, type GetButtonClassesOptions, type GetCardClassesOptions, type GetInputClassesOptions, type InputState, type SpectreAccessibilityTokens, type SpectreAnimationEntry, type SpectreButtonStateTokens, type SpectreFormStateTokens, type SpectreTailwindTheme, type SpectreTokenScale, type SpectreTokens, type SpectreTransitionTokens, type SpectreTypographyTokens, createSpectreCssVariableMap, createSpectreTailwindTheme, generateSpectreCssVariables, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreTailwindPreset, spectreTailwindTheme, spectreTokens, spectreUtilitiesStylesPath };
