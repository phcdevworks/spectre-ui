export {
  spectreTokens,
  spectreTailwindPreset,
  spectreTailwindTheme,
  createSpectreCssVariableMap,
  createSpectreTailwindTheme,
  generateSpectreCssVariables,
} from './tokens';

export type {
  SpectreAccessibilityTokens,
  SpectreAnimationEntry,
  SpectreButtonStateTokens,
  SpectreFormStateTokens,
  SpectreTailwindTheme,
  SpectreTokenScale,
  SpectreTokens,
  SpectreTransitionTokens,
  SpectreTypographyTokens,
} from './tokens';

export { spectrePreset } from './tailwind';

export {
  getButtonClasses,
  type GetButtonClassesOptions,
} from './recipes/button';
export { getInputClasses, type GetInputClassesOptions } from './recipes/input';
export { getCardClasses, type GetCardClassesOptions } from './recipes/card';

export type {
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from './components/button.config';
export type { InputState } from './components/input.config';
export type { CardVariant } from './components/card.config';

export const spectreBaseStylesPath = '@phcdevworks/spectre-ui/dist/base.css';
export const spectreComponentsStylesPath = '@phcdevworks/spectre-ui/dist/components.css';
export const spectreUtilitiesStylesPath = '@phcdevworks/spectre-ui/dist/utilities.css';

/**
 * Structured helper for consumers that prefer namespaced CSS entry points.
 */
export const spectreStyles = {
  base: spectreBaseStylesPath,
  components: spectreComponentsStylesPath,
  utilities: spectreUtilitiesStylesPath,
} as const;
