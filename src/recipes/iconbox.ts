export type IconBoxVariant = "primary" | "success" | "warning" | "danger" | "info";
export type IconBoxSize = "sm" | "md" | "lg";

export interface IconBoxRecipeOptions {
  variant?: IconBoxVariant;
  size?: IconBoxSize;
}

export function getIconBoxClasses(opts: IconBoxRecipeOptions = {}): string {
  const { variant = "primary", size = "md" } = opts;

  const classes: string[] = ["sp-iconbox"];

  const variantMap: Record<IconBoxVariant, string> = {
    primary: "sp-iconbox--primary",
    success: "sp-iconbox--success",
    warning: "sp-iconbox--warning",
    danger: "sp-iconbox--danger",
    info: "sp-iconbox--info",
  };
  classes.push(variantMap[variant]);

  const sizeMap: Record<IconBoxSize, string> = {
    sm: "sp-iconbox--sm",
    md: "sp-iconbox--md",
    lg: "sp-iconbox--lg",
  };
  classes.push(sizeMap[size]);

  return classes.join(" ").trim();
}
