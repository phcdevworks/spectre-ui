import type { Config as TailwindConfig } from 'tailwindcss';
import { spectreTokens } from '../tokens';
import { createSpectreTailwindTheme } from './theme';

const { theme } = createSpectreTailwindTheme({
  tokens: spectreTokens,
});

export const spectrePreset: TailwindConfig = {
  content: [],
  theme,
};

export const spectreTailwindPreset: TailwindConfig = spectrePreset;
