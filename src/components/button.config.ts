export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled';

export interface ButtonClassConfig {
  baseClass: string;
  variants: Record<ButtonVariant, string>;
  sizes: Record<ButtonSize, string>;
  states: Record<ButtonState, string>;
}

export const buttonConfig: ButtonClassConfig = {
  baseClass: 'sp-btn',
  variants: {
    primary: 'sp-btn-primary',
    secondary: 'sp-btn-secondary',
    ghost: 'sp-btn-ghost',
    success: 'sp-btn-success',
    danger: 'sp-btn-danger',
  },
  sizes: {
    sm: 'sp-btn-sm',
    md: 'sp-btn-md',
    lg: 'sp-btn-lg',
  },
  states: {
    default: '',
    hover: 'sp-btn-hover',
    active: 'sp-btn-active',
    disabled: 'sp-btn-disabled',
  },
};
