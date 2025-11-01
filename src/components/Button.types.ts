import type { InteractiveProps, IconProps } from "../types/component-props";

export interface ButtonProps extends Omit<InteractiveProps, "variant">, IconProps {
  /** Button variant style */
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | "outline"
    | "ghost";
  /** Button size */
  size?: "sm" | "md" | "lg" | "xl";
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Link href (renders as <a> instead of <button>) */
  href?: string;
  /** Target for link buttons */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /** Rel attribute for link buttons */
  rel?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon-only button (no text) */
  iconOnly?: boolean;
}
