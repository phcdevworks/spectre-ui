'use strict';

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

// src/internal/cx.ts
function cx(...parts) {
  const seen = /* @__PURE__ */ new Set();
  const classes = [];
  for (const part of parts) {
    if (!part) continue;
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (!/\s/.test(trimmed)) {
      if (!seen.has(trimmed)) {
        seen.add(trimmed);
        classes.push(trimmed);
      }
      continue;
    }
    for (const token of trimmed.split(/\s+/)) {
      if (!token || seen.has(token)) continue;
      seen.add(token);
      classes.push(token);
    }
  }
  return classes.join(" ");
}

// src/internal/resolve-option.ts
var hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
var isAllowedValue = (value, allowed) => Array.isArray(allowed) ? allowed.includes(value) : hasOwn(allowed, value);
function resolveOption(config) {
  const { name, value, allowed, fallback } = config;
  if (value === void 0) return fallback;
  if (isAllowedValue(value, allowed)) return value;
  if (process.env.NODE_ENV !== "production") {
    throw new Error(`[spectre-ui] Unknown ${name}: ${value}`);
  }
  return fallback;
}

// src/recipes/badge.ts
var BADGE_VARIANTS = {
  primary: true,
  success: true,
  warning: true,
  danger: true
};
var BADGE_SIZES = {
  sm: true,
  md: true,
  lg: true
};
function getBadgeClasses(opts = {}) {
  const { variant: variantInput, size: sizeInput } = opts;
  const variant = resolveOption({
    name: "badge variant",
    value: variantInput,
    allowed: BADGE_VARIANTS,
    fallback: "primary"
  });
  const size = resolveOption({
    name: "badge size",
    value: sizeInput,
    allowed: BADGE_SIZES,
    fallback: "md"
  });
  const variantMap = {
    primary: "sp-badge--primary",
    success: "sp-badge--success",
    warning: "sp-badge--warning",
    danger: "sp-badge--danger"
  };
  const variantClass = variantMap[variant];
  const sizeMap = {
    sm: "sp-badge--sm",
    md: "sp-badge--md",
    lg: "sp-badge--lg"
  };
  const sizeClass = sizeMap[size];
  return cx("sp-badge", variantClass, sizeClass);
}

// src/recipes/button.ts
var BUTTON_VARIANTS = {
  primary: true,
  secondary: true,
  ghost: true,
  danger: true,
  success: true
};
var BUTTON_SIZES = {
  sm: true,
  md: true,
  lg: true
};
function getButtonClasses(opts = {}) {
  const {
    variant: variantInput,
    size: sizeInput,
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false
  } = opts;
  const variant = resolveOption({
    name: "button variant",
    value: variantInput,
    allowed: BUTTON_VARIANTS,
    fallback: "primary"
  });
  const size = resolveOption({
    name: "button size",
    value: sizeInput,
    allowed: BUTTON_SIZES,
    fallback: "md"
  });
  const variantMap = {
    primary: "sp-btn--primary",
    secondary: "sp-btn--secondary",
    ghost: "sp-btn--ghost",
    danger: "sp-btn--danger",
    success: "sp-btn--success"
  };
  const variantClass = variantMap[variant];
  const sizeMap = {
    sm: "sp-btn--sm",
    md: "sp-btn--md",
    lg: "sp-btn--lg"
  };
  const sizeClass = sizeMap[size];
  return cx(
    "sp-btn",
    variantClass,
    sizeClass,
    fullWidth && "sp-btn--full",
    loading && "sp-btn--loading",
    disabled && "sp-btn--disabled",
    iconOnly && "sp-btn--icon"
  );
}

// src/recipes/card.ts
var CARD_VARIANTS = {
  elevated: true,
  flat: true,
  outline: true,
  ghost: true
};
function getCardClasses(opts = {}) {
  const {
    variant: variantInput,
    interactive = false,
    padded = false,
    fullHeight = false
  } = opts;
  const variant = resolveOption({
    name: "card variant",
    value: variantInput,
    allowed: CARD_VARIANTS,
    fallback: "elevated"
  });
  const variantMap = {
    elevated: "sp-card--elevated",
    flat: "sp-card--flat",
    outline: "sp-card--outline",
    ghost: "sp-card--ghost"
  };
  const variantClass = variantMap[variant];
  return cx(
    "sp-card",
    variantClass,
    interactive && "sp-card--interactive",
    padded && "sp-card--padded",
    fullHeight && "sp-card--full"
  );
}

// src/recipes/iconbox.ts
var ICONBOX_VARIANTS = {
  primary: true,
  success: true,
  warning: true,
  danger: true,
  info: true
};
var ICONBOX_SIZES = {
  sm: true,
  md: true,
  lg: true
};
function getIconBoxClasses(opts = {}) {
  const { variant: variantInput, size: sizeInput } = opts;
  const variant = resolveOption({
    name: "icon box variant",
    value: variantInput,
    allowed: ICONBOX_VARIANTS,
    fallback: "primary"
  });
  const size = resolveOption({
    name: "icon box size",
    value: sizeInput,
    allowed: ICONBOX_SIZES,
    fallback: "md"
  });
  const variantMap = {
    primary: "sp-iconbox--primary",
    success: "sp-iconbox--success",
    warning: "sp-iconbox--warning",
    danger: "sp-iconbox--danger",
    info: "sp-iconbox--info"
  };
  const variantClass = variantMap[variant];
  const sizeMap = {
    sm: "sp-iconbox--sm",
    md: "sp-iconbox--md",
    lg: "sp-iconbox--lg"
  };
  const sizeClass = sizeMap[size];
  return cx("sp-iconbox", variantClass, sizeClass);
}

// src/recipes/input.ts
var INPUT_STATES = {
  default: true,
  error: true,
  success: true,
  disabled: true
};
var INPUT_SIZES = {
  sm: true,
  md: true,
  lg: true
};
function getInputClasses(opts = {}) {
  const { state: stateInput, size: sizeInput, fullWidth = false } = opts;
  const state = resolveOption({
    name: "input state",
    value: stateInput,
    allowed: INPUT_STATES,
    fallback: "default"
  });
  const size = resolveOption({
    name: "input size",
    value: sizeInput,
    allowed: INPUT_SIZES,
    fallback: "md"
  });
  const sizeMap = {
    sm: "sp-input--sm",
    md: "sp-input--md",
    lg: "sp-input--lg"
  };
  const sizeClass = sizeMap[size];
  return cx(
    "sp-input",
    sizeClass,
    state === "error" && "sp-input--error",
    state === "success" && "sp-input--success",
    // Visual state only; actual disabled attribute is handled by adapters.
    state === "disabled" && "sp-input--disabled",
    fullWidth && "sp-input--full"
  );
}

exports.getBadgeClasses = getBadgeClasses;
exports.getButtonClasses = getButtonClasses;
exports.getCardClasses = getCardClasses;
exports.getIconBoxClasses = getIconBoxClasses;
exports.getInputClasses = getInputClasses;
exports.spectreBaseStylesPath = spectreBaseStylesPath;
exports.spectreComponentsStylesPath = spectreComponentsStylesPath;
exports.spectreStyles = spectreStyles;
exports.spectreUtilitiesStylesPath = spectreUtilitiesStylesPath;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map