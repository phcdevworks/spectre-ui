import type { ContainerProps } from "../types/component-props";

export interface CardProps extends ContainerProps {
  /** Card title */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Enable hover effect for interactive cards */
  hoverable?: boolean;
  /** Optional header slot name */
  hasHeader?: boolean;
  /** Optional footer slot name */
  hasFooter?: boolean;
}
