import { cx } from "../internal/cx";
import { resolveOption } from "../internal/resolve-option";

const TESTIMONIAL_VARIANTS = {
  elevated: true,
  flat: true,
  outline: true,
  ghost: true,
} as const;

export type TestimonialVariant = keyof typeof TESTIMONIAL_VARIANTS;

export interface TestimonialRecipeOptions {
  variant?: TestimonialVariant;
  disabled?: boolean;
  loading?: boolean;
  interactive?: boolean;
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  fullHeight?: boolean;
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
  } = opts;

  const variant = resolveOption({
    name: "testimonial variant",
    value: variantInput,
    allowed: TESTIMONIAL_VARIANTS,
    fallback: "outline",
  });

  const variantMap: Record<TestimonialVariant, string> = {
    elevated: "sp-testimonial--elevated",
    flat: "sp-testimonial--flat",
    outline: "sp-testimonial--outline",
    ghost: "sp-testimonial--ghost",
  };
  const variantClass = variantMap[variant];

  return cx(
    "sp-testimonial",
    variantClass,
    disabled && "sp-testimonial--disabled",
    loading && "sp-testimonial--loading",
    interactive && "sp-testimonial--interactive",
    hovered && "sp-testimonial--hover",
    focused && "sp-testimonial--focus",
    active && "sp-testimonial--active",
    fullHeight && "sp-testimonial--full"
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
