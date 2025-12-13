export type InputState = "default" | "error" | "success" | "disabled";
export type InputSize = "sm" | "md" | "lg";

export interface InputClassConfig {
  baseClass: string;
  states: Record<InputState, string>;
  sizes: Record<InputSize, string>;
  flags: {
    fullWidth: string;
  };
}

export const inputConfig: InputClassConfig = {
  baseClass: "sp-input",
  states: {
    default: "",
    error: "sp-input--error",
    success: "sp-input--success",
    disabled: "sp-input--disabled",
  },
  sizes: {
    sm: "sp-input--sm",
    md: "sp-input--md",
    lg: "sp-input--lg",
  },
  flags: {
    fullWidth: "sp-input--full",
  },
};
