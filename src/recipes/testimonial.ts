import { cx } from "../internal/cx";

/**
 * Generate classes for the Testimonial component.
 * @sync v2.x - Synced with latest design tokens.
 */
export interface TestimonialRecipeOptions {
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
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    fullHeight = false,
  } = opts;

  return cx(
    "sp-testimonial",
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
