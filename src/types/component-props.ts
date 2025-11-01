/**
 * Shared component properties and design tokens for Spectre UI
 * All components inherit from these base types for consistency
 */

/** Spacing scale - consistent across all components */
export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Border radius options */
export type RoundedSize = "none" | "sm" | "md" | "lg" | "full";

/** Shadow depth */
export type ShadowSize = "none" | "sm" | "md" | "lg" | "xl";

/**
 * Color variants optimized for CRO and marketing
 * Each variant has semantic meaning for conversion optimization
 */
export type ColorVariant =
  | "primary" // Main CTA color - highest contrast, draws attention
  | "secondary" // Secondary actions - less prominent
  | "accent" // Highlights, urgency indicators
  | "success" // Positive actions, confirmations
  | "warning" // Caution, scarcity indicators
  | "danger" // Destructive actions, errors
  | "neutral"; // Default/muted, background elements

/** Component sizes for consistent scaling */
export type ComponentSize = "sm" | "md" | "lg" | "xl";

/**
 * Base props shared by ALL components
 * Includes accessibility and analytics tracking
 */
export interface BaseComponentProps {
  /** Custom CSS classes */
  class?: string;
  /** Component ID for targeting */
  id?: string;
  /** Data attribute for analytics/tracking */
  "data-track"?: string;
}

/**
 * Props for visual container components (Card, IconBox, Panel, etc)
 * Extends base props with common container styling options
 */
export interface ContainerProps extends BaseComponentProps {
  /** Padding size using spacing scale */
  padding?: SpacingSize;
  /** Border radius */
  rounded?: RoundedSize;
  /** Shadow depth */
  shadow?: ShadowSize;
  /** Background color variant */
  variant?: ColorVariant;
  /** Enable border */
  border?: boolean;
}

/**
 * Props for interactive components (Buttons, CTAs, Links, etc)
 * Includes states for conversion optimization
 */
export interface InteractiveProps extends BaseComponentProps {
  /** Size variant */
  size?: ComponentSize;
  /** Color variant */
  variant?: ColorVariant;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state (for async CTAs) */
  loading?: boolean;
  /** Event tracking identifier */
  "data-event"?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
}

/**
 * Props for components that display icons
 * Supports both icon identifiers and inline SVG
 */
export interface IconProps {
  /** Icon name/identifier or inline SVG string */
  icon?: string;
  /** Icon position relative to content */
  iconPosition?: "left" | "right" | "top" | "bottom";
  /** Icon size */
  iconSize?: ComponentSize;
}

/**
 * Props for text-based components (Heading, Text, etc)
 */
export interface TextProps extends BaseComponentProps {
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Text color variant */
  color?: ColorVariant;
  /** Font weight */
  weight?: "normal" | "medium" | "semibold" | "bold";
}

/**
 * Props for form components (Input, Select, Textarea, etc)
 */
export interface FormFieldProps extends BaseComponentProps {
  /** Field name for form submission */
  name?: string;
  /** Field label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size variant */
  size?: ComponentSize;
}
