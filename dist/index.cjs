'use strict';

var tokens = require('@phcdevworks/spectre-tokens');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var tokens__default = /*#__PURE__*/_interopDefault(tokens);

// src/tokens.ts
var spectreTokens = tokens__default.default;
var spectreTailwindTheme = tokens.tailwindTheme;
var spectreTailwindPreset = tokens.tailwindPreset;
var createSpectreTailwindTheme = (source = spectreTokens) => tokens.createTailwindTheme(source);
var createSpectreCssVariableMap = (source = spectreTokens, options) => tokens.createCssVariableMap(source, options);
var generateSpectreCssVariables = (source = spectreTokens, options) => tokens.generateCssVariables(source, options);

// src/tailwind/preset.ts
var readScaleValue = (scale, key) => {
  const value = scale[key];
  if (value == null) {
    throw new Error(`Missing Spectre token for key: ${String(key)}`);
  }
  return value;
};
var readColorValue = (scale, shade) => {
  const scaleValue = spectreTokens.colors[scale];
  if (!scaleValue) {
    throw new Error(`Missing Spectre color scale: ${scale}`);
  }
  const value = scaleValue[shade];
  if (!value) {
    throw new Error(`Missing shade ${String(shade)} for ${String(scale)}`);
  }
  return value;
};
var componentRadii = {
  btn: readScaleValue(spectreTokens.radii, "md"),
  input: readScaleValue(spectreTokens.radii, "md"),
  card: readScaleValue(spectreTokens.radii, "lg"),
  pill: readScaleValue(spectreTokens.radii, "pill")
};
var componentShadows = {
  soft: readScaleValue(spectreTokens.shadows, "md"),
  card: readScaleValue(spectreTokens.shadows, "lg")
};
var spacingShortcuts = {
  gutter: readScaleValue(spectreTokens.spacing, "lg"),
  section: readScaleValue(spectreTokens.spacing, "2xl"),
  stack: readScaleValue(spectreTokens.spacing, "md")
};
var componentColors = {
  surface: {
    DEFAULT: readColorValue("neutral", "50"),
    muted: readColorValue("neutral", "100"),
    strong: readColorValue("neutral", "900")
  },
  intent: {
    info: readColorValue("info", "500"),
    success: readColorValue("success", "500"),
    warning: readColorValue("warning", "500"),
    danger: readColorValue("error", "500")
  }
};
var spectrePreset = {
  content: [],
  theme: {
    ...spectreTailwindTheme,
    extend: {
      borderRadius: componentRadii,
      boxShadow: componentShadows,
      spacing: spacingShortcuts,
      colors: componentColors
    }
  }
};

// src/components/button.config.ts
var buttonConfig = {
  baseClass: "sp-btn",
  variants: {
    primary: "sp-btn-primary",
    secondary: "sp-btn-secondary",
    ghost: "sp-btn-ghost",
    success: "sp-btn-success",
    danger: "sp-btn-danger"
  },
  sizes: {
    sm: "sp-btn-sm",
    md: "sp-btn-md",
    lg: "sp-btn-lg"
  },
  states: {
    default: "",
    hover: "sp-btn-hover",
    active: "sp-btn-active",
    disabled: "sp-btn-disabled"
  }
};

// src/recipes/button.ts
var getButtonClasses = ({
  variant = "primary",
  size = "md",
  state = "default",
  extraClasses = ""
} = {}) => {
  const classes = [
    buttonConfig.baseClass,
    buttonConfig.variants[variant],
    buttonConfig.sizes[size],
    buttonConfig.states[state],
    extraClasses
  ].filter(Boolean);
  return classes.join(" ").trim();
};

// src/components/input.config.ts
var inputConfig = {
  baseClass: "sp-input",
  states: {
    default: "",
    focus: "sp-input-focus",
    invalid: "sp-input-error",
    valid: "sp-input-success",
    disabled: "sp-input-disabled"
  }
};

// src/recipes/input.ts
var getInputClasses = ({
  state = "default",
  extraClasses = ""
} = {}) => {
  const classes = [inputConfig.baseClass, inputConfig.states[state], extraClasses].filter(Boolean);
  return classes.join(" ").trim();
};

// src/components/card.config.ts
var cardConfig = {
  baseClass: "sp-card",
  variants: {
    base: "",
    elevated: "sp-card-elevated",
    flat: "sp-card-flat"
  }
};

// src/recipes/card.ts
var getCardClasses = ({
  variant = "base",
  extraClasses = ""
} = {}) => {
  const classes = [cardConfig.baseClass, cardConfig.variants[variant], extraClasses].filter(Boolean);
  return classes.join(" ").trim();
};

// src/index.ts
var spectreBaseStylesPath = "@phcdevworks/spectre-ui/dist/base.css";
var spectreComponentsStylesPath = "@phcdevworks/spectre-ui/dist/components.css";
var spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/dist/utilities.css";
var spectreStyles = {
  base: spectreBaseStylesPath,
  components: spectreComponentsStylesPath,
  utilities: spectreUtilitiesStylesPath
};

exports.createSpectreCssVariableMap = createSpectreCssVariableMap;
exports.createSpectreTailwindTheme = createSpectreTailwindTheme;
exports.generateSpectreCssVariables = generateSpectreCssVariables;
exports.getButtonClasses = getButtonClasses;
exports.getCardClasses = getCardClasses;
exports.getInputClasses = getInputClasses;
exports.spectreBaseStylesPath = spectreBaseStylesPath;
exports.spectreComponentsStylesPath = spectreComponentsStylesPath;
exports.spectrePreset = spectrePreset;
exports.spectreStyles = spectreStyles;
exports.spectreTailwindPreset = spectreTailwindPreset;
exports.spectreTailwindTheme = spectreTailwindTheme;
exports.spectreTokens = spectreTokens;
exports.spectreUtilitiesStylesPath = spectreUtilitiesStylesPath;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map