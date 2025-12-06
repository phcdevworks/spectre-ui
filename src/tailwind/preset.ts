import type { Config as TailwindConfig } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { spectreTokens } from '../tokens';
import { createSpectreTailwindTheme } from './theme';

const { theme } = createSpectreTailwindTheme({
  tokens: spectreTokens,
});

const resolveTokenValue = (value: unknown, fallback?: string): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object') {
    const maybeDefault = (value as Record<string, unknown>).default;
    if (typeof maybeDefault === 'string') {
      return maybeDefault;
    }

    const firstEntry = Object.values(value as Record<string, unknown>).find(
      (entry) => typeof entry === 'string',
    );
    if (typeof firstEntry === 'string') {
      return firstEntry;
    }
  }

  return fallback;
};

const semanticUtilities = plugin(({ addUtilities }) => {
  const tokens = spectreTokens as any;
  const neutralScale = tokens?.colors?.neutral ?? {};
  const formDefault = tokens?.forms?.default ?? {};

  const surfaceTokens = tokens?.surface ?? {};
  const textTokens = tokens?.text ?? {};

  const surfacePage = resolveTokenValue(
    surfaceTokens.page,
    neutralScale['50'],
  );
  const surfaceCard = resolveTokenValue(
    surfaceTokens.card,
    formDefault.bg ?? surfacePage ?? neutralScale['50'],
  );
  const surfaceInput = resolveTokenValue(
    surfaceTokens.input,
    formDefault.bg ?? surfaceCard ?? surfacePage,
  );

  const textOnPage = resolveTokenValue(
    textTokens?.on?.page ?? textTokens?.onPage,
    neutralScale['900'] ?? formDefault.text,
  );
  const textOnSurface = resolveTokenValue(
    textTokens?.on?.surface ?? textTokens?.onSurface,
    formDefault.text ?? textOnPage ?? neutralScale['900'],
  );

  const utilities: Record<string, Record<string, string>> = {};

  if (surfacePage) {
    utilities['.bg-surface-page'] = { backgroundColor: surfacePage };
  }

  if (surfaceCard) {
    utilities['.bg-surface-card'] = { backgroundColor: surfaceCard };
  }

  if (surfaceInput) {
    utilities['.bg-surface-input'] = { backgroundColor: surfaceInput };
  }

  if (textOnPage) {
    utilities['.text-on-page'] = { color: textOnPage };
  }

  if (textOnSurface) {
    utilities['.text-on-surface'] = { color: textOnSurface };
  }

  addUtilities(utilities);
});

export const spectrePreset: TailwindConfig = {
  // Required for Tailwind's Config type with exactOptionalPropertyTypes
  content: [],
  theme: theme ?? {},
  plugins: [semanticUtilities],
};

export const spectreTailwindPreset: TailwindConfig = spectrePreset;
