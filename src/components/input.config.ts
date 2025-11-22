export type InputState = 'default' | 'focus' | 'invalid' | 'valid' | 'disabled';

export interface InputClassConfig {
  baseClass: string;
  states: Record<InputState, string>;
}

export const inputConfig: InputClassConfig = {
  baseClass: 'sp-input',
  states: {
    default: '',
    focus: 'sp-input-focus',
    invalid: 'sp-input-error',
    valid: 'sp-input-success',
    disabled: 'sp-input-disabled',
  },
};
