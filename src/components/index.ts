/**
 * Spectre UI Components
 * Export all Astro components and their prop types
 */

// Components
export { default as Card } from "./Card.astro";
export { default as IconBox } from "./IconBox.astro";
export { default as Button } from "./Button.astro";
export { default as Menu } from "./Menu.astro";

// Component prop types
export type { CardProps } from "./Card.types";
export type { IconBoxProps } from "./IconBox.types";
export type { ButtonProps } from "./Button.types";
export type { MenuProps, MenuLink } from "./Menu.types";

// Re-export shared types for convenience
export type {
  BaseComponentProps,
  ContainerProps,
  InteractiveProps,
  IconProps,
  TextProps,
  FormFieldProps,
  SpacingSize,
  RoundedSize,
  ShadowSize,
  ColorVariant,
  ComponentSize,
} from "../types/component-props";
