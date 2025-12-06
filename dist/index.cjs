'use strict';

var plugin = require('tailwindcss/plugin');
var spectreTokens = require('@phcdevworks/spectre-tokens');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var plugin__default = /*#__PURE__*/_interopDefault(plugin);

// src/css-constants.ts
var spectreBaseStylesPath = "@phcdevworks/spectre-ui/dist/base.css";
var spectreComponentsStylesPath = "@phcdevworks/spectre-ui/dist/components.css";
var spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/dist/utilities.css";
var spectreStyles = {
  base: spectreBaseStylesPath,
  components: spectreComponentsStylesPath,
  utilities: spectreUtilitiesStylesPath
};

// src/tailwind/theme.ts
function createSpectreTailwindTheme(options) {
  const { tokens, overrides } = options;
  const mergedTokens = {
    ...tokens,
    ...overrides ?? {}
  };
  const mergedColors = mergedTokens.colors ?? {};
  const attachSemanticColors = (existing, semantic) => {
    if (!semantic || Object.keys(semantic).length === 0) {
      return Object.keys(existing).length > 0 ? existing : void 0;
    }
    return {
      ...existing,
      ...semantic
    };
  };
  const themeColors = {
    ...mergedColors
  };
  const surfaceColors = attachSemanticColors(
    mergedColors.surface ?? {},
    mergedTokens.surface
  );
  if (surfaceColors) {
    themeColors.surface = surfaceColors;
  }
  const textColors = attachSemanticColors(
    mergedColors.text ?? {},
    mergedTokens.text
  );
  if (textColors) {
    themeColors.text = textColors;
  }
  const componentColors = attachSemanticColors(
    mergedColors.component ?? {},
    mergedTokens.component
  );
  if (componentColors) {
    themeColors.component = componentColors;
  }
  const theme2 = {
    // Safely map core token groups into Tailwind theme fields.
    // Use `as any` where necessary to avoid overfitting types right now.
    colors: themeColors,
    spacing: mergedTokens.spacing ?? {},
    borderRadius: mergedTokens.radii ?? {},
    boxShadow: mergedTokens.shadows ?? {},
    fontFamily: mergedTokens.typography?.families ?? {}
  };
  return { theme: theme2 };
}

// src/tailwind/preset.ts
var { theme } = createSpectreTailwindTheme({
  tokens: spectreTokens.tokens
});
var resolveTokenValue = (value, fallback) => {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object") {
    const maybeDefault = value.default;
    if (typeof maybeDefault === "string") {
      return maybeDefault;
    }
    const firstEntry = Object.values(value).find(
      (entry) => typeof entry === "string"
    );
    if (typeof firstEntry === "string") {
      return firstEntry;
    }
  }
  return fallback;
};
var semanticUtilities = plugin__default.default(({ addUtilities }) => {
  const tokens = spectreTokens.tokens;
  const neutralScale = tokens?.colors?.neutral ?? {};
  const formDefault = tokens?.forms?.default ?? {};
  const surfaceTokens = tokens?.surface ?? {};
  const textTokens = tokens?.text ?? {};
  const surfacePage = resolveTokenValue(
    surfaceTokens.page,
    neutralScale["50"]
  );
  const surfaceCard = resolveTokenValue(
    surfaceTokens.card,
    formDefault.bg ?? surfacePage ?? neutralScale["50"]
  );
  const surfaceInput = resolveTokenValue(
    surfaceTokens.input,
    formDefault.bg ?? surfaceCard ?? surfacePage
  );
  const textOnPage = resolveTokenValue(
    textTokens?.on?.page ?? textTokens?.onPage,
    neutralScale["900"] ?? formDefault.text
  );
  const textOnSurface = resolveTokenValue(
    textTokens?.on?.surface ?? textTokens?.onSurface,
    formDefault.text ?? textOnPage ?? neutralScale["900"]
  );
  const utilities = {};
  if (surfacePage) {
    utilities[".bg-surface-page"] = { backgroundColor: surfacePage };
  }
  if (surfaceCard) {
    utilities[".bg-surface-card"] = { backgroundColor: surfaceCard };
  }
  if (surfaceInput) {
    utilities[".bg-surface-input"] = { backgroundColor: surfaceInput };
  }
  if (textOnPage) {
    utilities[".text-on-page"] = { color: textOnPage };
  }
  if (textOnSurface) {
    utilities[".text-on-surface"] = { color: textOnSurface };
  }
  addUtilities(utilities);
});
var spectrePreset = {
  // Required for Tailwind's Config type with exactOptionalPropertyTypes
  content: [],
  theme: theme ?? {},
  plugins: [semanticUtilities]
};

// src/recipes/button.ts
function getButtonClasses(opts = {}) {
  const {
    variant = "primary",
    size = "md",
    tone = "default",
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false
  } = opts;
  const classes = [];
  classes.push("sp-btn");
  const variantMap = {
    primary: "sp-btn--primary",
    secondary: "sp-btn--secondary",
    ghost: "sp-btn--ghost",
    danger: "sp-btn--danger"
  };
  classes.push(variantMap[variant]);
  const sizeMap = {
    sm: "sp-btn--sm",
    md: "sp-btn--md",
    lg: "sp-btn--lg"
  };
  classes.push(sizeMap[size]);
  if (tone !== "default") {
    const toneMap = {
      success: "sp-btn--tone-success",
      warning: "sp-btn--tone-warning",
      danger: "sp-btn--tone-danger"
    };
    classes.push(toneMap[tone]);
  }
  if (fullWidth) classes.push("sp-btn--full");
  if (loading) classes.push("sp-btn--loading");
  if (disabled) classes.push("sp-btn--disabled");
  if (iconOnly) classes.push("sp-btn--icon");
  return classes.filter(Boolean).join(" ").trim();
}

// src/recipes/card.ts
function getCardClasses(opts = {}) {
  const {
    variant = "elevated",
    interactive = false,
    padded = false,
    fullHeight = false
  } = opts;
  const classes = [];
  classes.push("sp-card");
  const variantMap = {
    elevated: "sp-card--elevated",
    outline: "sp-card--outline",
    ghost: "sp-card--ghost"
  };
  classes.push(variantMap[variant]);
  if (interactive) classes.push("sp-card--interactive");
  if (padded) classes.push("sp-card--padded");
  if (fullHeight) classes.push("sp-card--full");
  return classes.filter(Boolean).join(" ").trim();
}

// src/recipes/input.ts
function getInputClasses(opts = {}) {
  const {
    state = "default",
    size = "md",
    fullWidth = false
  } = opts;
  const classes = [];
  classes.push("sp-input");
  if (state === "error") {
    classes.push("sp-input--error");
  } else if (state === "success") {
    classes.push("sp-input--success");
  }
  const sizeMap = {
    sm: "sp-input--sm",
    md: "sp-input--md",
    lg: "sp-input--lg"
  };
  classes.push(sizeMap[size]);
  if (fullWidth) {
    classes.push("sp-input--full");
  }
  return classes.filter(Boolean).join(" ").trim();
}

Object.defineProperty(exports, "spectreTokens", {
  enumerable: true,
  get: function () { return spectreTokens.tokens; }
});
exports.createSpectreTailwindTheme = createSpectreTailwindTheme;
exports.getButtonClasses = getButtonClasses;
exports.getCardClasses = getCardClasses;
exports.getInputClasses = getInputClasses;
exports.spectreBaseStylesPath = spectreBaseStylesPath;
exports.spectreComponentsStylesPath = spectreComponentsStylesPath;
exports.spectrePreset = spectrePreset;
exports.spectreStyles = spectreStyles;
exports.spectreUtilitiesStylesPath = spectreUtilitiesStylesPath;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map