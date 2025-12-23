// src/tailwind/theme.ts
function createSpectreTailwindTheme(options) {
  const mergedTokens = {
    ...options.tokens ?? {},
    ...options.overrides ?? {}
  };
  const t = mergedTokens;
  const colors = t.colors ?? t.color ?? t.palette ?? {};
  const spacing = t.spacing ?? t.space ?? {};
  const borderRadius = t.radii ?? t.radius ?? {};
  const boxShadow = t.shadows ?? t.shadow ?? {};
  const fontFamily = t.typography?.families ?? t.fonts ?? {};
  const fontSize = t.typography?.scale ?? t.fontSize ?? {};
  const theme = {
    colors,
    spacing,
    borderRadius,
    boxShadow,
    fontFamily,
    fontSize
  };
  return { theme };
}

// src/tailwind/preset.ts
var isPlainObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var deepMerge = (base, overrides) => {
  if (!overrides) return base;
  const result = { ...base };
  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }
  return result;
};
var createSpectreTailwindPreset = (options) => {
  if (!options.tokens) {
    throw new Error(
      "[spectre-ui] createSpectreTailwindPreset requires tokens; pass { tokens } explicitly."
    );
  }
  const { tokens } = options;
  const { theme } = createSpectreTailwindTheme({ tokens });
  const mergedTheme = deepMerge(
    theme,
    options.themeOverrides
  );
  const basePreset = {
    content: [],
    theme: mergedTheme
    // theme is guaranteed non-undefined now
  };
  return deepMerge(
    basePreset,
    options.presetOverrides
  );
};

export { createSpectreTailwindPreset, createSpectreTailwindTheme };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map