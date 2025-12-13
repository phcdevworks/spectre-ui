export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonRecipeOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
}

export function getButtonClasses(opts: ButtonRecipeOptions = {}): string {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false,
  } = opts;

  const classes: string[] = ["sp-btn"];

  const variantMap: Record<ButtonVariant, string> = {
    primary: "sp-btn--primary",
    secondary: "sp-btn--secondary",
    ghost: "sp-btn--ghost",
    danger: "sp-btn--danger",
    success: "sp-btn--success",
  };
  classes.push(variantMap[variant]);

  const sizeMap: Record<ButtonSize, string> = {
    sm: "sp-btn--sm",
    md: "sp-btn--md",
    lg: "sp-btn--lg",
  };
  classes.push(sizeMap[size]);

  if (fullWidth) classes.push("sp-btn--full");
  if (loading) classes.push("sp-btn--loading");
  if (disabled) classes.push("sp-btn--disabled");
  if (iconOnly) classes.push("sp-btn--icon");

  return classes.join(" ").trim();
}
