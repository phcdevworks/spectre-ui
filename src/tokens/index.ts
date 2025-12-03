export type SpectreTokenScale = Record<string, string | number>;
export type SpectreTransitionTokens = Record<string, string>;
export type SpectreTypographyTokens = Record<string, string>;
export type SpectreAccessibilityTokens = Record<string, string>;
export type SpectreAnimationEntry = Record<string, unknown>;
export type SpectreButtonStateTokens = Record<string, string>;
export type SpectreFormStateTokens = Record<string, string>;

export interface SpectreTokens {
  /**
   * Placeholder token groups. Actual structure will be defined in a future release.
   */
  [group: string]: unknown;
}

export type SpectreTailwindTheme = Record<string, unknown>;

export interface SpectreCssVariableOptions {
  selector?: string;
  prefix?: string;
}

export type SpectreCssVariableMap = Record<string, string>;

export const spectreTokens: SpectreTokens = {};

export const createSpectreTailwindTheme = (
  _source: SpectreTokens = spectreTokens,
): SpectreTailwindTheme => {
  throw new Error('createSpectreTailwindTheme is not implemented yet.');
};

export const createSpectreCssVariableMap = (
  _source: SpectreTokens = spectreTokens,
  _options?: SpectreCssVariableOptions,
): SpectreCssVariableMap => {
  throw new Error('createSpectreCssVariableMap is not implemented yet.');
};

export const generateSpectreCssVariables = (
  _source: SpectreTokens = spectreTokens,
  _options?: SpectreCssVariableOptions,
): string => {
  throw new Error('generateSpectreCssVariables is not implemented yet.');
};
