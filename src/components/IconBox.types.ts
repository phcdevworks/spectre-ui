import type { ContainerProps, IconProps } from "../types/component-props";

export interface IconBoxProps extends ContainerProps, IconProps {
  /** Icon box title */
  title?: string;
  /** Description text */
  description?: string;
  /** Align content (when icon is on top) */
  align?: "left" | "center" | "right";
}
