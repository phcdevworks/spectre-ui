import { describe, expect, it } from 'vitest';
import spectreTokens from '@phcdevworks/spectre-tokens';
import { createSpectreTailwindPreset } from '@phcdevworks/spectre-ui/tailwind';

describe('Tailwind Preset Contract', () => {
  const preset = createSpectreTailwindPreset({ tokens: spectreTokens });
  const theme = preset.theme as NonNullable<typeof preset.theme>;

  it('maps core palettes correctly', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.colors.brand).toBeDefined();
    expect(theme.colors.neutral).toBeDefined();
    expect(theme.colors.brand['500']).toBe(spectreTokens.colors.brand['500']);
  });

  it('maps semantic tokens correctly', () => {
    expect(theme.colors.surface).toBeDefined();
    expect(theme.colors.surface.page).toBe(spectreTokens.surface.page);

    expect(theme.colors.text).toBeDefined();
    expect(theme.colors.text.onPage.default).toBe(spectreTokens.text.onPage.default);
  });

  it('maps component-specific tokens correctly', () => {
    expect(theme.colors.buttons).toBeDefined();
    expect(theme.colors.buttons.primary.bg).toBe(spectreTokens.buttons.primary.bg);

    expect(theme.colors.forms).toBeDefined();
    expect(theme.colors.forms.default.bg).toBe(spectreTokens.forms.default.bg);
  });

  it('maps layout and spacing tokens correctly', () => {
    expect(theme.spacing).toBeDefined();
    expect(theme.spacing['16']).toBe(spectreTokens.space['16']);

    expect(theme.borderRadius).toBeDefined();
    expect(theme.borderRadius.md).toBe(spectreTokens.radii.md);
  });

  it('deep merges theme overrides while preserving token-backed values', () => {
    const overriddenPreset = createSpectreTailwindPreset({
      tokens: spectreTokens,
      themeOverrides: {
        colors: {
          brand: {
            '500': '#123456',
          },
        },
        borderRadius: {
          md: '999px',
        },
      },
    });
    const overriddenTheme = overriddenPreset.theme as NonNullable<typeof overriddenPreset.theme>;

    expect(overriddenTheme.colors.brand['500']).toBe('#123456');
    expect(overriddenTheme.borderRadius.md).toBe('999px');
    expect(overriddenTheme.colors.brand['400']).toBe(spectreTokens.colors.brand['400']);
    expect(overriddenTheme.colors.surface.page).toBe(spectreTokens.surface.page);
    expect(overriddenTheme.spacing['16']).toBe(spectreTokens.space['16']);
  });

  it('deep merges preset overrides while preserving the generated theme contract', () => {
    const overriddenPreset = createSpectreTailwindPreset({
      tokens: spectreTokens,
      presetOverrides: {
        content: ['./src/**/*.{ts,tsx}'],
        theme: {
          colors: {
            surface: {
              page: '#fafafa',
            },
          },
        },
      },
    });
    const overriddenTheme = overriddenPreset.theme as NonNullable<typeof overriddenPreset.theme>;

    expect(overriddenPreset.content).toEqual(['./src/**/*.{ts,tsx}']);
    expect(overriddenTheme.colors.surface.page).toBe('#fafafa');
    expect(overriddenTheme.colors.brand['500']).toBe(spectreTokens.colors.brand['500']);
    expect(overriddenTheme.colors.text.onPage.default).toBe(spectreTokens.text.onPage.default);
    expect(overriddenTheme.borderRadius.md).toBe(spectreTokens.radii.md);
  });
});
