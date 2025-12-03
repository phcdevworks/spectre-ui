import type { Config as TailwindConfig } from 'tailwindcss';
import { spectreTokens } from '../tokens';
import { createSpectreTailwindTheme } from './theme';

const { theme } = createSpectreTailwindTheme({
  tokens: spectreTokens,
});

export const spectrePreset: TailwindConfig = {
  content: [], // <-- required for DTS to satisfy Tailwind's Config type
  theme: theme ?? {},
  plugins: [],
};

export const spectreTailwindPreset: TailwindConfig = spectrePreset;
