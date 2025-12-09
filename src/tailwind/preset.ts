import type { Config as TailwindConfig } from "tailwindcss";
import { spectreTokens } from "../tokens";
import { createSpectreTailwindTheme } from "./theme";

const { theme } = createSpectreTailwindTheme({ tokens: spectreTokens });

export const spectrePreset = {
  content: [],
  theme,
} satisfies TailwindConfig;

export default spectrePreset;
