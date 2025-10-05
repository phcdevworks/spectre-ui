import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { SpectreButtonProps } from "./button.types";

declare const SpectreButton: AstroComponentFactory<SpectreButtonProps>;
export default SpectreButton;
