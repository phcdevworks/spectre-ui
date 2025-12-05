import { tokens } from '@phcdevworks/spectre-tokens';
export { tokens as spectreTokens } from '@phcdevworks/spectre-tokens';

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
  tokens: tokens
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

export { createSpectreTailwindTheme, getButtonClasses, getCardClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectrePreset, spectreStyles, spectreUtilitiesStylesPath };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map