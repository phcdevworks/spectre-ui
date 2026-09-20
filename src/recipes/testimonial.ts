import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const TESTIMONIAL_VARIANTS = {
  elevated: true,
  flat: true,
  outline: true,
  ghost: true,
} as const;

const TESTIMONIAL_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true,
} as const;

const TESTIMONIAL_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true,
} as const;

export type TestimonialVariant = keyof typeof TESTIMONIAL_VARIANTS;
export type TestimonialAccentEdge = keyof typeof TESTIMONIAL_ACCENT_EDGES;
export type TestimonialAccentColor = keyof typeof TESTIMONIAL_ACCENT_COLORS;

export interface TestimonialRecipeOptions {
  /**
   * Defaults to `'elevated'`, matching `<sp-testimonial>`'s own default in
   * `spectre-components` — a bare `getTestimonialClasses()` call and a bare
   * `<sp-testimonial>` now render the same way.
   */
  variant?: TestimonialVariant;
  disabled?: boolean;
  loading?: boolean;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  fullHeight?: boolean;
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.testimonial.accent.thickness` (`spectre-tokens` 4.9.0).
   * Omission renders no rail. `accentColor` defaults to `'brand'` when
   * `accent` is set but `accentColor` is omitted.
   */
  accent?: TestimonialAccentEdge;
  accentColor?: TestimonialAccentColor;
}

export function getTestimonialClasses(opts: TestimonialRecipeOptions = {}): string {
  const {
    variant: variantInput,
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    fullHeight = false,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts;

  const variant = resolveOption({
    name: "testimonial variant",
    value: variantInput,
    allowed: TESTIMONIAL_VARIANTS,
    fallback: "elevated",
  });

  const variantMap: Record<TestimonialVariant, string> = {
    elevated: "sp-testimonial--elevated",
    flat: "sp-testimonial--flat",
    outline: "sp-testimonial--outline",
    ghost: "sp-testimonial--ghost",
  };
  const variantClass = variantMap[variant];

  let accentEdgeClass: string | false = false;
  let accentColorClass: string | false = false;
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: "testimonial accent edge",
      value: accentInput,
      allowed: TESTIMONIAL_ACCENT_EDGES,
      fallback: "top",
    });
    accentEdgeClass = `sp-testimonial--accent-${accentEdge}`;

    const accentColor = resolveOption({
      name: "testimonial accent color",
      value: accentColorInput,
      allowed: TESTIMONIAL_ACCENT_COLORS,
      fallback: "brand",
    });
    accentColorClass = `sp-testimonial--accent-${accentColor}`;
  }

  return cx(
    "sp-testimonial",
    variantClass,
    disabled && "sp-testimonial--disabled",
    loading && "sp-testimonial--loading",
    interactive && "sp-testimonial--interactive",
    hovered && "sp-testimonial--hover is-hover",
    focused && "sp-testimonial--focus is-focus",
    active && "sp-testimonial--active is-active",
    fullHeight && "sp-testimonial--full",
    accentEdgeClass,
    accentColorClass
  );
}

export function getTestimonialQuoteClasses(): string {
  return cx("sp-testimonial-quote");
}

export function getTestimonialAuthorClasses(): string {
  return cx("sp-testimonial-author");
}

export function getTestimonialAuthorInfoClasses(): string {
  return cx("sp-testimonial-author-info");
}

export function getTestimonialAuthorNameClasses(): string {
  return cx("sp-testimonial-author-name");
}

export function getTestimonialAuthorTitleClasses(): string {
  return cx("sp-testimonial-author-title");
}
