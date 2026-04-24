import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const distPath = (...parts: string[]) => path.join(distDir, ...parts);
const fileUrl = (...parts: string[]) => pathToFileURL(distPath(...parts)).href;

describe('dist artifact presence', () => {
  const requiredFiles = [
    'index.js',
    'index.cjs',
    'index.d.ts',
    'index.css',
    'base.css',
    'components.css',
    'utilities.css',
    'tailwind/index.js',
    'tailwind/index.cjs',
    'tailwind/index.d.ts',
  ];

  for (const file of requiredFiles) {
    it(`emits ${file}`, () => {
      const fullPath = distPath(file);
      expect(fs.existsSync(fullPath), `missing: dist/${file}`).toBe(true);
      const { size } = fs.statSync(fullPath);
      expect(size, `dist/${file} is empty`).toBeGreaterThan(0);
    });
  }
});

describe('dist/index.js — root export smoke', () => {
  it('exports all recipe functions', async () => {
    const mod = await import(fileUrl('index.js'));

    const recipeFunctions = [
      'getButtonClasses',
      'getCardClasses',
      'getInputClasses',
      'getBadgeClasses',
      'getIconBoxClasses',
      'getTestimonialClasses',
      'getTestimonialAuthorClasses',
      'getTestimonialAuthorInfoClasses',
      'getTestimonialAuthorNameClasses',
      'getTestimonialAuthorTitleClasses',
      'getTestimonialQuoteClasses',
      'getPricingCardClasses',
      'getPricingCardBadgeClasses',
      'getPricingCardDescriptionClasses',
      'getPricingCardPriceClasses',
      'getPricingCardPriceContainerClasses',
      'getRatingClasses',
      'getRatingStarClasses',
      'getRatingStarsClasses',
      'getRatingTextClasses',
    ];

    for (const fn of recipeFunctions) {
      expect(typeof mod[fn], `${fn} should be a function`).toBe('function');
    }
  });

  it('exports all CSS path constants', async () => {
    const mod = await import(fileUrl('index.js'));

    expect(mod.spectreIndexStylesPath).toBe('@phcdevworks/spectre-ui/index.css');
    expect(mod.spectreBaseStylesPath).toBe('@phcdevworks/spectre-ui/base.css');
    expect(mod.spectreComponentsStylesPath).toBe('@phcdevworks/spectre-ui/components.css');
    expect(mod.spectreUtilitiesStylesPath).toBe('@phcdevworks/spectre-ui/utilities.css');
  });

  it('spectreStyles object has all four entries', async () => {
    const { spectreStyles } = await import(fileUrl('index.js'));

    expect(spectreStyles.index).toBe('@phcdevworks/spectre-ui/index.css');
    expect(spectreStyles.base).toBe('@phcdevworks/spectre-ui/base.css');
    expect(spectreStyles.components).toBe('@phcdevworks/spectre-ui/components.css');
    expect(spectreStyles.utilities).toBe('@phcdevworks/spectre-ui/utilities.css');
  });

  it('recipe functions return non-empty strings', async () => {
    const { getButtonClasses, getBadgeClasses, getCardClasses, getInputClasses } =
      await import(fileUrl('index.js'));

    expect(typeof getButtonClasses()).toBe('string');
    expect(getButtonClasses().length).toBeGreaterThan(0);
    expect(typeof getBadgeClasses()).toBe('string');
    expect(typeof getCardClasses()).toBe('string');
    expect(typeof getInputClasses()).toBe('string');
  });
});

describe('dist/tailwind/index.js — tailwind subpath smoke', () => {
  it('exports createSpectreTailwindTheme and createSpectreTailwindPreset', async () => {
    const mod = await import(fileUrl('tailwind', 'index.js'));

    expect(typeof mod.createSpectreTailwindTheme, 'createSpectreTailwindTheme should be a function').toBe('function');
    expect(typeof mod.createSpectreTailwindPreset, 'createSpectreTailwindPreset should be a function').toBe('function');
  });

  it('createSpectreTailwindPreset returns a usable preset object', async () => {
    const { createSpectreTailwindPreset } = await import(fileUrl('tailwind', 'index.js'));
    const spectreTokens = (await import('@phcdevworks/spectre-tokens')).default;

    const preset = createSpectreTailwindPreset({ tokens: spectreTokens });

    expect(preset).toBeDefined();
    expect(typeof preset).toBe('object');
    expect(preset.theme).toBeDefined();
  });
});
