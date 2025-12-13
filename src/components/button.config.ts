export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonState = "default" | "hover" | "active" | "disabled" | "loading";

export interface ButtonClassConfig {
  baseClass: string;
  variants: Record<ButtonVariant, string>;
  sizes: Record<ButtonSize, string>;
  states: Record<ButtonState, string>;
  flags: {
    fullWidth: string;
    iconOnly: string;
  };
}

export const buttonConfig: ButtonClassConfig = {
  baseClass: "sp-btn",
  variants: {
    primary: "sp-btn--primary",
    secondary: "sp-btn--secondary",
    ghost: "sp-btn--ghost",
    danger: "sp-btn--danger",
    success: "sp-btn--success",
  },
  sizes: {
    sm: "sp-btn--sm",
    md: "sp-btn--md",
    lg: "sp-btn--lg",
  },
  states: {
    default: "",
    hover: "sp-btn--hover",
    active: "sp-btn--active",
    disabled: "sp-btn--disabled",
    loading: "sp-btn--loading",
  },
  flags: {
    fullWidth: "sp-btn--full",
    iconOnly: "sp-btn--icon",
  },
};
