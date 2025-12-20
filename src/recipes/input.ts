import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const inputStates = ["default", "error", "success", "disabled"] as const;
const inputSizes = ["sm", "md", "lg"] as const;

export type InputState = (typeof inputStates)[number];
export type InputSize = (typeof inputSizes)[number];

const INPUT_STATES = {
  default: true,
  error: true,
  success: true,
  disabled: true,
} as const;

const INPUT_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const;

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
    allowed: INPUT_STATES,
    fallback: "default",
  });
  const size = resolveOption({
    name: "input size",
    value: sizeInput,
    allowed: INPUT_SIZES,
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
    // Visual state only; actual disabled attribute is handled by adapters.
    state === "disabled" && "sp-input--disabled",
    fullWidth && "sp-input--full",
  );
}
