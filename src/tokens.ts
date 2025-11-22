import tokens, {
  createCssVariableMap as baseCreateCssVariableMap,
  createTailwindTheme as baseCreateTailwindTheme,
  generateCssVariables as baseGenerateCssVariables,
  tailwindPreset,
  tailwindTheme,
  type AccessibilityTokens,
  type AnimationEntry,
  type ButtonStateTokens,
  type FormStateTokens,
  type TailwindTheme,
  type TokenScale,
  type Tokens,
  type TransitionTokens,
  type TypographyTokens,
} from '@phcdevworks/spectre-tokens';

export const spectreTokens = tokens;
export const spectreTailwindTheme = tailwindTheme;
export const spectreTailwindPreset = tailwindPreset;

export type SpectreTokens = Tokens;
export type SpectreTailwindTheme = TailwindTheme;
export type SpectreTokenScale = TokenScale;
export type SpectreTransitionTokens = TransitionTokens;
export type SpectreTypographyTokens = TypographyTokens;
export type SpectreAccessibilityTokens = AccessibilityTokens;
export type SpectreAnimationEntry = AnimationEntry;
export type SpectreButtonStateTokens = ButtonStateTokens;
export type SpectreFormStateTokens = FormStateTokens;

export interface SpectreCssVariableOptions {
  selector?: string;
  prefix?: string;
}

export type SpectreCssVariableMap = Record<string, string>;

export const createSpectreTailwindTheme = (
  source: SpectreTokens = spectreTokens,
): SpectreTailwindTheme => baseCreateTailwindTheme(source);

export const createSpectreCssVariableMap = (
  source: SpectreTokens = spectreTokens,
  options?: SpectreCssVariableOptions,
): SpectreCssVariableMap => baseCreateCssVariableMap(source, options);

export const generateSpectreCssVariables = (
  source: SpectreTokens = spectreTokens,
  options?: SpectreCssVariableOptions,
): string => baseGenerateCssVariables(source, options);
