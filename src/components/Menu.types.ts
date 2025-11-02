import type { BaseComponentProps } from "../types/component-props";

/**
 * Menu link item
 */
export interface MenuLink {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
  badge?: string;
  icon?: string;
}

/**
 * Props for the Menu component
 */
export interface MenuProps extends BaseComponentProps {
  /**
   * Array of navigation links
   */
  links?: MenuLink[];

  /**
   * Logo image source or HTML
   */
  logo?: string;

  /**
   * Logo alt text
   */
  logoAlt?: string;

  /**
   * Logo link href
   */
  logoHref?: string;

  /**
   * Menu variant style
   * @default "default"
   */
  variant?: "default" | "minimal" | "bordered";

  /**
   * Make menu sticky at top
   * @default false
   */
  sticky?: boolean;

  /**
   * Show mobile hamburger menu
   * @default true
   */
  responsive?: boolean;

  /**
   * Position of logo
   * @default "left"
   */
  logoPosition?: "left" | "center";

  /**
   * Alignment of navigation links
   * @default "right"
   */
  navAlign?: "left" | "center" | "right";
}
