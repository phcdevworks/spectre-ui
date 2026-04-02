import { describe, expect, it } from 'vitest';
import { createSpectreTailwindPreset } from '../src/tailwind/preset';
import { spectreTokens } from '../src/tokens';

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
});
