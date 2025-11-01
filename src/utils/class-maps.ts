/**
 * Shared utility functions and class maps for components
 * Single source of truth for converting prop values to Tailwind classes
 */

import type {
  SpacingSize,
  RoundedSize,
  ShadowSize,
  ColorVariant,
  ComponentSize,
} from "../types/component-props";

/**
 * Padding class map
 */
export const paddingMap: Record<SpacingSize, string> = {
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-12",
};

/**
 * Rounded (border-radius) class map
 */
export const roundedMap: Record<RoundedSize, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

/**
 * Shadow class map
 */
export const shadowMap: Record<ShadowSize, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

/**
 * Container background variant classes
 * Used by Card, IconBox, and other container components
 */
export const containerVariantMap: Record<ColorVariant, string> = {
  primary: "bg-primary-50 border-primary-200 text-primary-900",
  secondary: "bg-secondary-50 border-secondary-200 text-secondary-900",
  accent: "bg-accent-50 border-accent-200 text-accent-900",
  success: "bg-success-50 border-success-200 text-success-900",
  warning: "bg-warning-50 border-warning-200 text-warning-900",
  danger: "bg-danger-50 border-danger-200 text-danger-900",
  neutral: "bg-white border-neutral-200 text-neutral-900",
};

/**
 * Icon size class map
 */
export const iconSizeMap: Record<ComponentSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

/**
 * Icon color classes based on variant
 */
export const iconColorMap: Record<ColorVariant, string> = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  accent: "text-accent-600",
  success: "text-success-600",
  warning: "text-warning-600",
  danger: "text-danger-600",
  neutral: "text-neutral-600",
};

/**
 * Button size classes (padding + text size + gap)
 */
export const buttonSizeMap: Record<ComponentSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-base gap-2",
  lg: "px-6 py-3 text-lg gap-2.5",
  xl: "px-8 py-4 text-xl gap-3",
};

/**
 * Button icon size map (smaller than standalone icons)
 */
export const buttonIconSizeMap: Record<ComponentSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

/**
 * Button variant classes (includes outline and ghost variants)
 */
export const buttonVariantMap: Record<
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "outline"
  | "ghost",
  string
> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500 disabled:bg-primary-300",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary-500 disabled:bg-secondary-300",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 focus-visible:ring-accent-500 disabled:bg-accent-300",
  success:
    "bg-success-500 text-white hover:bg-success-600 active:bg-success-700 focus-visible:ring-success-500 disabled:bg-success-300",
  warning:
    "bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700 focus-visible:ring-warning-500 disabled:bg-warning-300",
  danger:
    "bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 focus-visible:ring-danger-500 disabled:bg-danger-300",
  neutral:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:ring-neutral-500 disabled:bg-neutral-50",
  outline:
    "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500 disabled:border-primary-200 disabled:text-primary-300",
  ghost:
    "text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500 disabled:text-primary-300",
};
