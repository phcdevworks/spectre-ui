import type { Config as TailwindConfig } from "tailwindcss";
import { spectreTokens } from "../tokens";
import { createSpectreTailwindTheme } from "./theme";

const { theme } = createSpectreTailwindTheme({ tokens: spectreTokens });

export const spectrePreset: TailwindConfig = {
  content: [],
  theme, // theme is guaranteed non-undefined now
};

export const spectreTailwindPreset: TailwindConfig = spectrePreset;
