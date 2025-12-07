import type { Config as TailwindConfig } from 'tailwindcss';
import type { SpectreTokens } from '../tokens';

export interface SpectreTailwindTheme {
  theme: TailwindConfig['theme'];
}

export interface CreateSpectreTailwindThemeOptions {
  tokens: SpectreTokens;
  overrides?: Partial<SpectreTokens>;
}

export function createSpectreTailwindTheme(
  options: CreateSpectreTailwindThemeOptions,
): SpectreTailwindTheme {
  const { tokens, overrides } = options;

  const mergedTokens: SpectreTokens = {
    ...tokens,
    ...(overrides ?? {}),
  };

  const tokensAny = mergedTokens as Record<string, any>;

  const ensurePaletteObject = (value: unknown): Record<string, string> | undefined => {
    if (!value) {
      return undefined;
    }

    if (typeof value === 'string') {
      return { DEFAULT: value };
    }

    if (typeof value === 'object') {
      return value as Record<string, string>;
    }

    return undefined;
  };

  const resolveSimpleColor = (...candidates: Array<unknown>): string | undefined => {
    for (const candidate of candidates) {
      if (!candidate) {
        continue;
      }

      if (typeof candidate === 'string') {
        return candidate;
      }

      if (typeof candidate === 'object') {
        if ('DEFAULT' in (candidate as Record<string, unknown>)) {
          const defaultValue = (candidate as Record<string, unknown>).DEFAULT;
          if (typeof defaultValue === 'string') {
            return defaultValue;
          }
        }

        const firstMatch = Object.values(candidate as Record<string, unknown>).find(
          (value) => typeof value === 'string',
        );

        if (typeof firstMatch === 'string') {
          return firstMatch;
        }
      }
    }

    return undefined;
  };

  const colors: Record<string, unknown> = {};

  const surfaceTokens = tokensAny.surface ?? {};
  if (surfaceTokens.page) {
    colors.page = surfaceTokens.page;
  }
  if (surfaceTokens.card) {
    colors.card = surfaceTokens.card;
  }
  if (surfaceTokens.input) {
    colors.input = surfaceTokens.input;
  }

  const textTokens = tokensAny.text ?? {};
  const textPalette: Record<string, string> = {};
  if (textTokens.onPage?.default) {
    textPalette.page = textTokens.onPage.default;
  }
  if (textTokens.onPage?.muted) {
    textPalette['page-muted'] = textTokens.onPage.muted;
  }
  if (textTokens.onSurface?.default) {
    textPalette.surface = textTokens.onSurface.default;
  }
  if (textTokens.onSurface?.muted) {
    textPalette['surface-muted'] = textTokens.onSurface.muted;
  }
  if (Object.keys(textPalette).length > 0) {
    colors.text = textPalette;
  }

  const baseColors = tokensAny.colors ?? {};
  const buttonTokens = tokensAny.buttons ?? {};
  const formTokens = tokensAny.forms ?? {};

  const primaryPalette =
    ensurePaletteObject(baseColors.primary) ?? ensurePaletteObject(buttonTokens.primary?.bg);
  if (primaryPalette) {
    colors.primary = primaryPalette;
  }

  const addStatusColor = (name: 'danger' | 'success' | 'warning') => {
    const resolved = resolveSimpleColor(
      baseColors[name],
      buttonTokens[name]?.bg,
      formTokens[name],
      formTokens[name]?.bg,
      formTokens[name]?.border,
    );

    if (resolved) {
      colors[name] = resolved;
    }
  };

  addStatusColor('danger');
  addStatusColor('success');
  addStatusColor('warning');

  const spacing = tokensAny.spacing ?? {};
  const borderRadius = tokensAny.radii ?? {};
  const boxShadow = tokensAny.shadows ?? {};
  const fontFamily = tokensAny.typography?.families ?? {};

  const theme: TailwindConfig['theme'] = {
    colors,
    spacing,
    borderRadius,
    boxShadow,
    fontFamily,
  };

  return { theme };
}
