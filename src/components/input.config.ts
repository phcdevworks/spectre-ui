export type InputState = 'default' | 'error' | 'success' | 'disabled';

export interface InputClassConfig {
  baseClass: string;
  states: Record<InputState, string>;
}

export const inputConfig: InputClassConfig = {
  baseClass: 'sp-input',
  states: {
    default: '',
    error: 'sp-input--error',
    success: 'sp-input--success',
    disabled: 'sp-input--disabled',
  },
};
