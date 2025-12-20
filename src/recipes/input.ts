import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

export type InputState = "default" | "error" | "success" | "disabled";
export type InputSize = "sm" | "md" | "lg";

const inputStates: InputState[] = ["default", "error", "success", "disabled"];
const inputSizes: InputSize[] = ["sm", "md", "lg"];

export interface InputRecipeOptions {
  state?: InputState;
  size?: InputSize;
  fullWidth?: boolean;
}

export function getInputClasses(opts: InputRecipeOptions = {}): string {
  const { state: stateInput, size: sizeInput, fullWidth = false } = opts;

  const state = resolveOption({
    name: "input state",
    value: stateInput,
    allowed: inputStates,
    fallback: "default",
  });
  const size = resolveOption({
    name: "input size",
    value: sizeInput,
    allowed: inputSizes,
    fallback: "md",
  });

  const sizeMap: Record<InputSize, string> = {
    sm: "sp-input--sm",
    md: "sp-input--md",
    lg: "sp-input--lg",
  };
  const sizeClass = sizeMap[size];

  // State
  return cx(
    "sp-input",
    sizeClass,
    state === "error" && "sp-input--error",
    state === "success" && "sp-input--success",
    state === "disabled" && "sp-input--disabled",
    fullWidth && "sp-input--full",
  );
}
