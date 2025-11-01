/**
 * Design tokens for Spectre UI
 * These map directly to Tailwind v4 @theme configuration
 * and provide the foundation for all component styling
 */

/**
 * Spacing scale
 * Used for padding, margins, gaps throughout components
 */
export const spacing = {
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
} as const;

/**
 * Border radius scale
 * Consistent rounded corners across all components
 */
export const rounded = {
  none: "0",
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  full: "9999px", // Pill shape
} as const;

/**
 * Shadow scale
 * Elevation and depth for visual hierarchy
 */
export const shadow = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

/**
 * Color palette optimized for CRO and marketing
 * Each variant is designed for maximum conversion impact
 */
export const colors = {
  // Primary - Main CTA color (high contrast, draws attention)
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    500: "#6366f1", // Main brand color
    600: "#4f46e5",
    700: "#4338ca",
    900: "#312e81",
  },

  // Secondary - Supporting actions
  secondary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    900: "#134e4a",
  },

  // Accent - Highlights and urgency
  accent: {
    50: "#fef1f7",
    100: "#fee2ee",
    500: "#f472b6", // Attention-grabbing pink
    600: "#ec4899",
    700: "#db2777",
    900: "#831843",
  },

  // Success - Positive actions, confirmations
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    900: "#14532d",
  },

  // Warning - Caution, scarcity indicators
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    900: "#713f12",
  },

  // Danger - Destructive actions, errors
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    900: "#7f1d1d",
  },

  // Neutral - Default, muted, backgrounds
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
} as const;

/**
 * Typography scale
 * Font sizes optimized for readability and hierarchy
 */
export const fontSize = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
} as const;

/**
 * Font weight scale
 */
export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/**
 * Component size mappings
 * Maps size variants to actual spacing/typography values
 */
export const componentSizes = {
  button: {
    sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
    md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
    lg: { padding: "1rem 2rem", fontSize: "1.125rem" },
    xl: { padding: "1.25rem 2.5rem", fontSize: "1.25rem" },
  },
  icon: {
    sm: "1rem", // 16px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "3rem", // 48px
  },
} as const;

/**
 * Animation/transition timings
 * Consistent motion across all interactive elements
 */
export const transition = {
  fast: "150ms",
  base: "200ms",
  slow: "300ms",
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Export all theme tokens as a single object
 */
export const theme = {
  spacing,
  rounded,
  shadow,
  colors,
  fontSize,
  fontWeight,
  componentSizes,
  transition,
  breakpoints,
} as const;

export type Theme = typeof theme;
