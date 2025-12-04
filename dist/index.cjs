'use strict';

var spectreTokens = require('@phcdevworks/spectre-tokens');

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
  const theme2 = {
    // Safely map core token groups into Tailwind theme fields.
    // Use `as any` where necessary to avoid overfitting types right now.
    colors: mergedTokens.colors ?? {},
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
var spectrePreset = {
  // Required for Tailwind's Config type with exactOptionalPropertyTypes
  content: [],
  theme: theme ?? {},
  plugins: []
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
var getCardClasses = (options = {}) => {
  const {
    variant = "elevated",
    padded = false,
    interactive = false,
    fullHeight = false,
    extraClasses
  } = options;
  const baseClass = "sp-card";
  const variantClasses = {
    elevated: "sp-card--elevated",
    outline: "sp-card--outline",
    ghost: "sp-card--ghost"
  };
  const classes = [baseClass, variantClasses[variant]];
  if (padded) {
    classes.push("sp-card--padded");
  }
  if (interactive) {
    classes.push("sp-card--interactive");
  }
  if (fullHeight) {
    classes.push("sp-card--full");
  }
  if (extraClasses && extraClasses.trim().length > 0) {
    classes.push(extraClasses.trim());
  }
  return classes.filter(Boolean).join(" ");
};

// src/recipes/input.ts
var getInputClasses = (options = {}) => {
  const {
    state = "default",
    fullWidth = false,
    extraClasses
  } = options;
  const baseClass = "sp-input";
  const stateClasses = {
    default: "",
    error: "sp-input--error",
    success: "sp-input--success",
    disabled: "sp-input--disabled"
  };
  const classes = [baseClass, stateClasses[state]];
  if (fullWidth) {
    classes.push("sp-input--full");
  }
  if (extraClasses && extraClasses.trim().length > 0) {
    classes.push(extraClasses.trim());
  }
  return classes.filter(Boolean).join(" ");
};

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