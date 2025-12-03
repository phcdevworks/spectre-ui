// src/tokens/index.ts
var spectreTokens = {};
var createSpectreCssVariableMap = (_source = spectreTokens, _options) => {
  throw new Error("createSpectreCssVariableMap is not implemented yet.");
};
var generateSpectreCssVariables = (_source = spectreTokens, _options) => {
  throw new Error("generateSpectreCssVariables is not implemented yet.");
};

// src/tailwind/theme.ts
function createSpectreTailwindTheme(_options) {
  return { theme: {} };
}

// src/tailwind/preset.ts
var { theme } = createSpectreTailwindTheme();
var spectrePreset = {
  content: [],
  // <-- required for DTS to satisfy Tailwind's Config type
  theme: theme ?? {},
  plugins: []
};
var spectreTailwindPreset = spectrePreset;

// src/recipes/button.ts
var getButtonClasses = (options = {}) => {
  const {
    variant = "primary",
    size = "md",
    state = "default",
    extraClasses
  } = options;
  const baseClass = "sp-btn";
  const variantClasses = {
    primary: "sp-btn--primary",
    secondary: "sp-btn--secondary",
    ghost: "sp-btn--ghost",
    danger: "sp-btn--danger"
  };
  const sizeClasses = {
    sm: "sp-btn--sm",
    md: "sp-btn--md",
    lg: "sp-btn--lg"
  };
  const stateClasses = {
    default: "",
    hover: "sp-btn--hover",
    disabled: "sp-btn--disabled"
  };
  const classes = [
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses[state]
  ];
  if (extraClasses && extraClasses.trim().length > 0) {
    classes.push(extraClasses.trim());
  }
  return classes.filter(Boolean).join(" ");
};

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

// src/css-constants.ts
var spectreBaseStylesPath = "@phcdevworks/spectre-ui/dist/base.css";
var spectreComponentsStylesPath = "@phcdevworks/spectre-ui/dist/components.css";
var spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/dist/utilities.css";
var spectreStyles = {
  base: spectreBaseStylesPath,
  components: spectreComponentsStylesPath,
  utilities: spectreUtilitiesStylesPath
};

export { createSpectreCssVariableMap, createSpectreTailwindTheme, generateSpectreCssVariables, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreTailwindPreset, spectreTokens, spectreUtilitiesStylesPath };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map