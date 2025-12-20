export type BadgeVariant = "primary" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeRecipeOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function getBadgeClasses(opts: BadgeRecipeOptions = {}): string {
  const { variant = "primary", size = "md" } = opts;

  const classes: string[] = ["sp-badge"];

  const variantMap: Record<BadgeVariant, string> = {
    primary: "sp-badge--primary",
    success: "sp-badge--success",
    warning: "sp-badge--warning",
    danger: "sp-badge--danger",
  };
  classes.push(variantMap[variant]);

  const sizeMap: Record<BadgeSize, string> = {
    sm: "sp-badge--sm",
    md: "sp-badge--md",
    lg: "sp-badge--lg",
  };
  classes.push(sizeMap[size]);

  return classes.join(" ").trim();
}
