import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const BADGE_VARIANTS = {
  primary: true,
  secondary: true,
  success: true,
  warning: true,
  danger: true,
  neutral: true,
  info: true,
  ghost: true,
  outline: true,
  accent: true,
  cta: true,
  inverse: true,
} as const;

const BADGE_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

const BADGE_ACCENT_RAIL_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true,
} as const;

const BADGE_ACCENT_RAIL_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true,
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;
export type BadgeSize = keyof typeof BADGE_SIZES;
export type BadgeAccentRailEdge = keyof typeof BADGE_ACCENT_RAIL_EDGES;
export type BadgeAccentRailColor = keyof typeof BADGE_ACCENT_RAIL_COLORS;

export interface BadgeRecipeOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.badge.accent.thickness`. Named `accentRail` (not `accent`)
   * because `variant: 'accent'` already names the single-tone brand-accent
   * fill; this is the unrelated, additive multi-role edge-rail contract
   * (`spectre-tokens` 4.9.0). Omission renders no rail. `accentRailColor`
   * defaults to `'brand'` when `accentRail` is set but it is omitted.
   */
  accentRail?: BadgeAccentRailEdge;
  accentRailColor?: BadgeAccentRailColor;
}

export function getBadgeClasses(opts: BadgeRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    disabled = false,
    loading = false,
    fullWidth = false,
    accentRail: accentRailInput,
    accentRailColor: accentRailColorInput,
  } = opts;

  const variant = resolveOption({
    name: "badge variant",
    value: variantInput,
    allowed: BADGE_VARIANTS,
    fallback: "primary",
  });
  const size = resolveOption({
    name: "badge size",
    value: sizeInput,
    allowed: BADGE_SIZES,
    fallback: "md",
  });

  const variantMap: Record<BadgeVariant, string> = {
    primary: "sp-badge--primary",
    secondary: "sp-badge--secondary",
    success: "sp-badge--success",
    warning: "sp-badge--warning",
    danger: "sp-badge--danger",
    neutral: "sp-badge--neutral",
    info: "sp-badge--info",
    ghost: "sp-badge--ghost",
    outline: "sp-badge--outline",
    accent: "sp-badge--accent",
    cta: "sp-badge--cta",
    inverse: "sp-badge--inverse",
  };
  const variantClass = variantMap[variant];

  const sizeMap: Record<BadgeSize, string> = {
    sm: "sp-badge--sm",
    md: "sp-badge--md",
    lg: "sp-badge--lg",
  };
  const sizeClass = sizeMap[size];

  let accentRailEdgeClass: string | false = false;
  let accentRailColorClass: string | false = false;
  if (accentRailInput !== undefined) {
    const accentRailEdge = resolveOption({
      name: "badge accent rail edge",
      value: accentRailInput,
      allowed: BADGE_ACCENT_RAIL_EDGES,
      fallback: "top",
    });
    accentRailEdgeClass = `sp-badge--accent-rail-${accentRailEdge}`;

    const accentRailColor = resolveOption({
      name: "badge accent rail color",
      value: accentRailColorInput,
      allowed: BADGE_ACCENT_RAIL_COLORS,
      fallback: "brand",
    });
    accentRailColorClass = `sp-badge--accent-rail-${accentRailColor}`;
  }

  return cx(
    "sp-badge",
    variantClass,
    sizeClass,
    interactive && "sp-badge--interactive",
    hovered && "sp-badge--hover is-hover",
    focused && "sp-badge--focus is-focus",
    active && "sp-badge--active is-active",
    disabled && "sp-badge--disabled",
    loading && "sp-badge--loading",
    fullWidth && "sp-badge--full",
    accentRailEdgeClass,
    accentRailColorClass
  );
}
