'use strict';

var spectreTokens = require('@phcdevworks/spectre-tokens');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var spectreTokens__default = /*#__PURE__*/_interopDefault(spectreTokens);

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
var { theme } = createSpectreTailwindTheme({ tokens: spectreTokens__default.default });
var spectrePreset = {
  content: [],
  theme
  // theme is guaranteed non-undefined now
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

// src/recipes/badge.ts
function getBadgeClasses(opts = {}) {
  const { variant = "primary", size = "md" } = opts;
  const classes = ["sp-badge"];
  const variantMap = {
    primary: "sp-badge--primary",
    success: "sp-badge--success",
    warning: "sp-badge--warning",
    danger: "sp-badge--danger"
  };
  classes.push(variantMap[variant]);
  const sizeMap = {
    sm: "sp-badge--sm",
    md: "sp-badge--md",
    lg: "sp-badge--lg"
  };
  classes.push(sizeMap[size]);
  return classes.join(" ").trim();
}

// src/recipes/iconbox.ts
function getIconBoxClasses(opts = {}) {
  const { variant = "primary", size = "md" } = opts;
  const classes = ["sp-iconbox"];
  const variantMap = {
    primary: "sp-iconbox--primary",
    success: "sp-iconbox--success",
    warning: "sp-iconbox--warning",
    danger: "sp-iconbox--danger",
    info: "sp-iconbox--info"
  };
  classes.push(variantMap[variant]);
  const sizeMap = {
    sm: "sp-iconbox--sm",
    md: "sp-iconbox--md",
    lg: "sp-iconbox--lg"
  };
  classes.push(sizeMap[size]);
  return classes.join(" ").trim();
}

Object.defineProperty(exports, "spectreTokens", {
  enumerable: true,
  get: function () { return spectreTokens__default.default; }
});
exports.createSpectreTailwindTheme = createSpectreTailwindTheme;
exports.getBadgeClasses = getBadgeClasses;
exports.getButtonClasses = getButtonClasses;
exports.getCardClasses = getCardClasses;
exports.getIconBoxClasses = getIconBoxClasses;
exports.getInputClasses = getInputClasses;
exports.spectreBaseStylesPath = spectreBaseStylesPath;
exports.spectreComponentsStylesPath = spectreComponentsStylesPath;
exports.spectrePreset = spectrePreset;
exports.spectreStyles = spectreStyles;
exports.spectreUtilitiesStylesPath = spectreUtilitiesStylesPath;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map