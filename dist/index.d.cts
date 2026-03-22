declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/utilities.css";
declare const spectreStyles: {
    index: string;
    base: string;
    components: string;
    utilities: string;
};

declare const buttonVariants: readonly ["primary", "secondary", "ghost", "danger", "success", "cta", "accent"];
declare const buttonSizes: readonly ["sm", "md", "lg"];
type ButtonVariant = (typeof buttonVariants)[number];
type ButtonSize = (typeof buttonSizes)[number];
/**
 * Generate classes for the Button component.
 * @sync v2.x - Synced with latest design tokens, including CTA variants.
 */
interface ButtonRecipeOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    iconOnly?: boolean;
    pill?: boolean;
}
declare function getButtonClasses(opts?: ButtonRecipeOptions): string;

declare const cardVariants: readonly ["elevated", "flat", "outline", "ghost"];
type CardVariant = (typeof cardVariants)[number];
interface CardRecipeOptions {
    variant?: CardVariant;
    interactive?: boolean;
    padded?: boolean;
    fullHeight?: boolean;
    disabled?: boolean;
}
declare function getCardClasses(opts?: CardRecipeOptions): string;

declare const inputStates: readonly ["default", "error", "success", "disabled"];
declare const inputSizes: readonly ["sm", "md", "lg"];
type InputState = (typeof inputStates)[number];
type InputSize = (typeof inputSizes)[number];
interface InputRecipeOptions {
    state?: InputState;
    size?: InputSize;
    fullWidth?: boolean;
    pill?: boolean;
}
declare function getInputClasses(opts?: InputRecipeOptions): string;

declare const badgeVariants: readonly ["primary", "secondary", "success", "warning", "danger", "neutral", "info"];
declare const badgeSizes: readonly ["sm", "md", "lg"];
type BadgeVariant = (typeof badgeVariants)[number];
type BadgeSize = (typeof badgeSizes)[number];
/**
 * Generate classes for the Badge component.
 * @sync v2.x - Synced with latest design tokens, including hover states.
 */
interface BadgeRecipeOptions {
    variant?: BadgeVariant;
    size?: BadgeSize;
    interactive?: boolean;
    disabled?: boolean;
}
declare function getBadgeClasses(opts?: BadgeRecipeOptions): string;

declare const iconBoxVariants: readonly ["primary", "success", "warning", "danger", "info"];
declare const iconBoxSizes: readonly ["sm", "md", "lg"];
type IconBoxVariant = (typeof iconBoxVariants)[number];
type IconBoxSize = (typeof iconBoxSizes)[number];
interface IconBoxRecipeOptions {
    variant?: IconBoxVariant;
    size?: IconBoxSize;
    disabled?: boolean;
}
declare function getIconBoxClasses(opts?: IconBoxRecipeOptions): string;

/**
 * Generate classes for the Testimonial component.
 * @sync v2.x - Synced with latest design tokens.
 */
interface TestimonialRecipeOptions {
}
declare function getTestimonialClasses(_opts?: TestimonialRecipeOptions): string;
declare function getTestimonialQuoteClasses(): string;
declare function getTestimonialAuthorClasses(): string;
declare function getTestimonialAuthorInfoClasses(): string;
declare function getTestimonialAuthorNameClasses(): string;
declare function getTestimonialAuthorTitleClasses(): string;

/**
 * Generate classes for the PricingCard component.
 * @sync v2.x - Synced with latest design tokens.
 */
interface PricingCardRecipeOptions {
    featured?: boolean;
    disabled?: boolean;
}
declare function getPricingCardClasses(opts?: PricingCardRecipeOptions): string;
declare function getPricingCardBadgeClasses(): string;
declare function getPricingCardPriceContainerClasses(): string;
declare function getPricingCardPriceClasses(): string;
declare function getPricingCardDescriptionClasses(): string;

/**
 * Generate classes for the Rating component.
 * @sync v2.x - Synced with latest design tokens.
 */
interface RatingRecipeOptions {
}
declare function getRatingClasses(_opts?: RatingRecipeOptions): string;
declare function getRatingStarsClasses(): string;
declare function getRatingStarClasses(isFilled?: boolean): string;
declare function getRatingTextClasses(): string;

export { type BadgeRecipeOptions, type BadgeSize, type BadgeVariant, type ButtonRecipeOptions, type ButtonSize, type ButtonVariant, type CardRecipeOptions, type CardVariant, type IconBoxRecipeOptions, type IconBoxSize, type IconBoxVariant, type InputRecipeOptions, type InputSize, type InputState, type PricingCardRecipeOptions, type RatingRecipeOptions, type TestimonialRecipeOptions, getBadgeClasses, getButtonClasses, getCardClasses, getIconBoxClasses, getInputClasses, getPricingCardBadgeClasses, getPricingCardClasses, getPricingCardDescriptionClasses, getPricingCardPriceClasses, getPricingCardPriceContainerClasses, getRatingClasses, getRatingStarClasses, getRatingStarsClasses, getRatingTextClasses, getTestimonialAuthorClasses, getTestimonialAuthorInfoClasses, getTestimonialAuthorNameClasses, getTestimonialAuthorTitleClasses, getTestimonialClasses, getTestimonialQuoteClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectreStyles, spectreUtilitiesStylesPath };
