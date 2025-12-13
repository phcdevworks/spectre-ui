import spectreTokens from '@phcdevworks/spectre-tokens';
export { default as spectreTokens } from '@phcdevworks/spectre-tokens';

// src/css-constants.ts
var spectreBaseStylesPath = "@phcdevworks/spectre-ui/base.css";
var spectreComponentsStylesPath = "@phcdevworks/spectre-ui/components.css";
var spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/utilities.css";
var spectreIndexStylesPath = "@phcdevworks/spectre-ui/index.css";
var spectreStyles = {
  index: spectreIndexStylesPath,
  base: spectreBaseStylesPath,
  components: spectreComponentsStylesPath,
  utilities: spectreUtilitiesStylesPath
};

// src/tailwind/theme.ts
var resolveSemanticValue = (value) => {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object" && "value" in value) {
    const resolved = value.value;
    return typeof resolved === "string" ? resolved : void 0;
  }
  return void 0;
};
var removeUndefinedEntries = (entries) => Object.entries(entries).reduce((acc, [key, val]) => {
  if (typeof val === "string") {
    acc[key] = val;
  }
  return acc;
}, {});
var buildFontFamilies = (families) => Object.entries(families ?? {}).reduce(
  (acc, [key, value]) => {
    const stack = value.split(",").map((font) => font.trim()).map((font) => font.replace(/^['"]|['"]$/g, "")).filter(Boolean);
    if (stack.length > 0) {
      acc[key] = stack;
    }
    return acc;
  },
  {}
);
var buildFontSizes = (scale) => Object.entries(scale ?? {}).reduce(
  (acc, [key, value]) => {
    if (!value?.fontSize) {
      return acc;
    }
    const meta = {};
    if (value.lineHeight) {
      meta.lineHeight = value.lineHeight;
    }
    if (typeof value.fontWeight !== "undefined") {
      meta.fontWeight = value.fontWeight;
    }
    if (value.letterSpacing) {
      meta.letterSpacing = value.letterSpacing;
    }
    acc[key] = [value.fontSize, meta];
    return acc;
  },
  {}
);
function createSpectreTailwindTheme(options) {
  const { tokens, overrides } = options;
  const mergedTokens = {
    ...tokens,
    ...overrides ?? {}
  };
  const baseMode = mergedTokens.modes?.default ?? {};
  const surfaceColors = removeUndefinedEntries({
    page: resolveSemanticValue(baseMode.surface?.page ?? mergedTokens.surface?.page),
    card: resolveSemanticValue(baseMode.surface?.card ?? mergedTokens.surface?.card),
    input: resolveSemanticValue(baseMode.surface?.input ?? mergedTokens.surface?.input),
    overlay: resolveSemanticValue(baseMode.surface?.overlay ?? mergedTokens.surface?.overlay)
  });
  const textColors = {
    onPage: removeUndefinedEntries({
      default: resolveSemanticValue(
        baseMode.text?.onPage?.default ?? mergedTokens.text?.onPage?.default
      ),
      muted: resolveSemanticValue(
        baseMode.text?.onPage?.muted ?? mergedTokens.text?.onPage?.muted
      ),
      subtle: resolveSemanticValue(
        baseMode.text?.onPage?.subtle ?? mergedTokens.text?.onPage?.subtle
      ),
      meta: resolveSemanticValue(
        baseMode.text?.onPage?.meta ?? mergedTokens.text?.onPage?.meta
      )
    }),
    onSurface: removeUndefinedEntries({
      default: resolveSemanticValue(
        baseMode.text?.onSurface?.default ?? mergedTokens.text?.onSurface?.default
      ),
      muted: resolveSemanticValue(
        baseMode.text?.onSurface?.muted ?? mergedTokens.text?.onSurface?.muted
      ),
      subtle: resolveSemanticValue(
        baseMode.text?.onSurface?.subtle ?? mergedTokens.text?.onSurface?.subtle
      ),
      meta: resolveSemanticValue(
        baseMode.text?.onSurface?.meta ?? mergedTokens.text?.onSurface?.meta
      )
    })
  };
  const componentBase = mergedTokens.component;
  const componentMode = baseMode.component;
  const componentColors = {
    card: removeUndefinedEntries({
      text: resolveSemanticValue(componentMode?.card?.text ?? componentBase?.card?.text),
      textMuted: resolveSemanticValue(
        componentMode?.card?.textMuted ?? componentBase?.card?.textMuted
      )
    }),
    input: removeUndefinedEntries({
      text: resolveSemanticValue(componentMode?.input?.text ?? componentBase?.input?.text),
      placeholder: resolveSemanticValue(
        componentMode?.input?.placeholder ?? componentBase?.input?.placeholder
      )
    }),
    button: removeUndefinedEntries({
      textDefault: resolveSemanticValue(
        componentMode?.button?.textDefault ?? componentBase?.button?.textDefault
      ),
      textOnPrimary: resolveSemanticValue(
        componentMode?.button?.textOnPrimary ?? componentBase?.button?.textOnPrimary
      )
    }),
    badge: {
      primary: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.primary?.bg ?? componentBase?.badge?.primary?.bg
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.primary?.text ?? componentBase?.badge?.primary?.text
        )
      }),
      success: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.success?.bg ?? componentBase?.badge?.success?.bg
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.success?.text ?? componentBase?.badge?.success?.text
        )
      }),
      warning: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.warning?.bg ?? componentBase?.badge?.warning?.bg
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.warning?.text ?? componentBase?.badge?.warning?.text
        )
      }),
      danger: removeUndefinedEntries({
        bg: resolveSemanticValue(
          componentMode?.badge?.danger?.bg ?? componentBase?.badge?.danger?.bg
        ),
        text: resolveSemanticValue(
          componentMode?.badge?.danger?.text ?? componentBase?.badge?.danger?.text
        )
      })
    }
  };
  const tokenColors = mergedTokens.colors;
  const colors = {
    ...tokenColors ?? {},
    surface: surfaceColors,
    text: textColors,
    component: componentColors
  };
  const spacingTokens = mergedTokens.spacing;
  const spacing = spacingTokens ?? {};
  const radiiTokens = mergedTokens.radii;
  const borderRadius = radiiTokens ?? {};
  const shadowTokens = mergedTokens.shadows;
  const boxShadow = shadowTokens ?? {};
  const fontFamily = buildFontFamilies(mergedTokens.typography?.families);
  const fontSize = buildFontSizes(mergedTokens.typography?.scale ?? {});
  const theme2 = {
    colors,
    spacing,
    borderRadius,
    boxShadow,
    fontFamily,
    fontSize
  };
  return { theme: theme2 };
}

// src/tailwind/preset.ts
var { theme } = createSpectreTailwindTheme({ tokens: spectreTokens });
var spectrePreset = {
  content: [],
  theme
};

// src/recipes/button.ts
function getButtonClasses(opts = {}) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false
  } = opts;
  const classes = ["sp-btn"];
  const variantMap = {
    primary: "sp-btn--primary",
    secondary: "sp-btn--secondary",
    ghost: "sp-btn--ghost",
    danger: "sp-btn--danger",
    success: "sp-btn--success"
  };
  classes.push(variantMap[variant]);
  const sizeMap = {
    sm: "sp-btn--sm",
    md: "sp-btn--md",
    lg: "sp-btn--lg"
  };
  classes.push(sizeMap[size]);
  if (fullWidth) classes.push("sp-btn--full");
  if (loading) classes.push("sp-btn--loading");
  if (disabled) classes.push("sp-btn--disabled");
  if (iconOnly) classes.push("sp-btn--icon");
  return classes.join(" ").trim();
}

// src/recipes/card.ts
function getCardClasses(opts = {}) {
  const {
    variant = "elevated",
    interactive = false,
    padded = false,
    fullHeight = false
  } = opts;
  const classes = ["sp-card"];
  const variantMap = {
    elevated: "sp-card--elevated",
    flat: "sp-card--flat",
    outline: "sp-card--outline",
    ghost: "sp-card--ghost"
  };
  classes.push(variantMap[variant]);
  if (interactive) classes.push("sp-card--interactive");
  if (padded) classes.push("sp-card--padded");
  if (fullHeight) classes.push("sp-card--full");
  return classes.join(" ").trim();
}

// src/recipes/input.ts
function getInputClasses(opts = {}) {
  const { state = "default", size = "md", fullWidth = false } = opts;
  const classes = ["sp-input"];
  const sizeMap = {
    sm: "sp-input--sm",
    md: "sp-input--md",
    lg: "sp-input--lg"
  };
  classes.push(sizeMap[size]);
  if (state === "error") classes.push("sp-input--error");
  if (state === "success") classes.push("sp-input--success");
  if (state === "disabled") classes.push("sp-input--disabled");
  if (fullWidth) classes.push("sp-input--full");
  return classes.join(" ").trim();
}

export { createSpectreTailwindTheme, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreUtilitiesStylesPath };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map