import type { Config } from 'tailwindcss';
import { spectreTailwindTheme, spectreTokens } from '../tokens';

const readScaleValue = <T extends Record<string, string>>(scale: T, key: keyof T): string => {
  const value = scale[key];
  if (value == null) {
    throw new Error(`Missing Spectre token for key: ${String(key)}`);
  }

  return value;
};

const readColorValue = (scale: keyof typeof spectreTokens.colors, shade: keyof Record<string, string>): string => {
  const scaleValue = spectreTokens.colors[scale];
  if (!scaleValue) {
    throw new Error(`Missing Spectre color scale: ${scale as string}`);
  }

  const value = scaleValue[shade as string];
  if (!value) {
    throw new Error(`Missing shade ${String(shade)} for ${String(scale)}`);
  }

  return value;
};

const componentRadii = {
  btn: readScaleValue(spectreTokens.radii, 'md'),
  input: readScaleValue(spectreTokens.radii, 'md'),
  card: readScaleValue(spectreTokens.radii, 'lg'),
  pill: readScaleValue(spectreTokens.radii, 'pill'),
};

const componentShadows = {
  soft: readScaleValue(spectreTokens.shadows, 'md'),
  card: readScaleValue(spectreTokens.shadows, 'lg'),
};

const spacingShortcuts = {
  gutter: readScaleValue(spectreTokens.spacing, 'lg'),
  section: readScaleValue(spectreTokens.spacing, '2xl'),
  stack: readScaleValue(spectreTokens.spacing, 'md'),
};

const componentColors = {
  surface: {
    DEFAULT: readColorValue('neutral', '50'),
    muted: readColorValue('neutral', '100'),
    strong: readColorValue('neutral', '900'),
  },
  intent: {
    info: readColorValue('info', '500'),
    success: readColorValue('success', '500'),
    warning: readColorValue('warning', '500'),
    danger: readColorValue('error', '500'),
  },
};

export const spectrePreset: Config = {
  content: [],
  theme: {
    ...spectreTailwindTheme,
    extend: {
      borderRadius: componentRadii,
      boxShadow: componentShadows,
      spacing: spacingShortcuts,
      colors: componentColors,
    },
  },
};
