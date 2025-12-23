export { SpectreTokens, default as spectreTokens } from '@phcdevworks/spectre-tokens';

declare const spectreBaseStylesPath = "@phcdevworks/spectre-ui/base.css";
declare const spectreComponentsStylesPath = "@phcdevworks/spectre-ui/components.css";
declare const spectreUtilitiesStylesPath = "@phcdevworks/spectre-ui/utilities.css";
declare const spectreStyles: {
    index: string;
    base: string;
    components: string;
    utilities: string;
};

declare const buttonVariants: readonly ["primary", "secondary", "ghost", "danger", "success"];
declare const buttonSizes: readonly ["sm", "md", "lg"];
type ButtonVariant = (typeof buttonVariants)[number];
type ButtonSize = (typeof buttonSizes)[number];
interface ButtonRecipeOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    iconOnly?: boolean;
}
declare function getButtonClasses(opts?: ButtonRecipeOptions): string;

declare const cardVariants: readonly ["elevated", "flat", "outline", "ghost"];
type CardVariant = (typeof cardVariants)[number];
interface CardRecipeOptions {
    variant?: CardVariant;
    interactive?: boolean;
    padded?: boolean;
    fullHeight?: boolean;
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
}
declare function getInputClasses(opts?: InputRecipeOptions): string;

declare const badgeVariants: readonly ["primary", "success", "warning", "danger"];
declare const badgeSizes: readonly ["sm", "md", "lg"];
type BadgeVariant = (typeof badgeVariants)[number];
type BadgeSize = (typeof badgeSizes)[number];
interface BadgeRecipeOptions {
    variant?: BadgeVariant;
    size?: BadgeSize;
}
declare function getBadgeClasses(opts?: BadgeRecipeOptions): string;

declare const iconBoxVariants: readonly ["primary", "success", "warning", "danger", "info"];
declare const iconBoxSizes: readonly ["sm", "md", "lg"];
type IconBoxVariant = (typeof iconBoxVariants)[number];
type IconBoxSize = (typeof iconBoxSizes)[number];
interface IconBoxRecipeOptions {
    variant?: IconBoxVariant;
    size?: IconBoxSize;
}
declare function getIconBoxClasses(opts?: IconBoxRecipeOptions): string;

export { type BadgeRecipeOptions, type BadgeSize, type BadgeVariant, type ButtonRecipeOptions, type ButtonSize, type ButtonVariant, type CardRecipeOptions, type CardVariant, type IconBoxRecipeOptions, type IconBoxSize, type IconBoxVariant, type InputRecipeOptions, type InputSize, type InputState, getBadgeClasses, getButtonClasses, getCardClasses, getIconBoxClasses, getInputClasses, spectreBaseStylesPath, spectreComponentsStylesPath, spectreStyles, spectreUtilitiesStylesPath };
