import { cx } from "../internal/cx";

/**
 * Generate classes for the Testimonial component.
 * @sync v2.x - Synced with latest design tokens.
 */
export interface TestimonialRecipeOptions {
  disabled?: boolean;
  loading?: boolean;
}

export function getTestimonialClasses(opts: TestimonialRecipeOptions = {}): string {
  const { disabled = false, loading = false } = opts;
  return cx(
    "sp-testimonial",
    disabled && "sp-testimonial--disabled",
    loading && "sp-testimonial--loading"
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
