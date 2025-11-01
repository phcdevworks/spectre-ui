import { fileURLToPath } from "node:url";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import type { AstroIntegration } from "astro";

// Re-export types for consumers
export type {
  BaseComponentProps,
  ContainerProps,
  InteractiveProps,
  IconProps,
  TextProps,
  FormFieldProps,
  SpacingSize,
  RoundedSize,
  ShadowSize,
  ColorVariant,
  ComponentSize,
} from "./types/component-props";

export { theme } from "./config/theme";
export type { Theme } from "./config/theme";

// Deprecated: automatic stylesheet injection has been removed.
// The interface is retained so existing user configs do not type-break.
export interface TailwindOptions {
  /** @deprecated No longer used. Manually import `spectre-ui/styles/base.css` instead. */
  entry?: string | false;
}

/**
 * Options for configuring the Spectre UI integration.
 */
export interface SpectreUIOptions {
  /** Prefix for generated import aliases (default: `spectre-ui`). */
  alias?: string;
  /** Enable Tailwind CSS support or pass options. Set to `false` to disable entirely. */
  tailwind?: boolean | TailwindOptions;
}

const packageDir = fileURLToPath(new URL(".", import.meta.url));
const componentsDir = join(packageDir, "components");
const stylesDir = join(packageDir, "styles");

/**
 * Spectre UI Astro integration.
 *
 * Responsibilities:
 *  - Provide stable import aliases (package root, components, styles).
 *  - Optionally configure Tailwind v4 via the official Vite plugin.
 *  - (Removed) Automatic base stylesheet injection. Users must import
 *    `spectre-ui/styles/base.css` themselves (e.g. in a global CSS entry).
 */
export default function spectreUI(options: SpectreUIOptions = {}): AstroIntegration {
  const alias = options.alias ?? "spectre-ui";
  const tailwindOption = options.tailwind ?? true;

  return {
    name: "spectre-ui",
    hooks: {
      "astro:config:setup"({ config, updateConfig }) {
        // Compose alias map (object form is simplest for consumers).
        const aliasEntries: Record<string, string> = {
          [alias]: packageDir,
          [`${alias}/components`]: componentsDir,
          [`${alias}/styles`]: stylesDir,
        };

        const existingAlias = config.vite?.resolve?.alias;
        if (existingAlias) {
          const existingMap: Record<string, unknown> = Array.isArray(existingAlias)
            ? Object.fromEntries(existingAlias.map((e) => [e.find, e.replacement]))
            : (existingAlias as Record<string, unknown>);
          for (const key of Object.keys(aliasEntries)) {
            if (key in existingMap) {
              console.warn(
                `[spectre-ui] Alias '${key}' already exists in user config and will be overridden by Spectre UI.`
              );
            }
          }
        }
        const mergedAlias = Array.isArray(existingAlias)
          ? [
              ...existingAlias,
              ...Object.entries(aliasEntries).map(([find, replacement]) => ({ find, replacement })),
            ]
          : {
              ...(typeof existingAlias === "object" && existingAlias !== null ? existingAlias : {}),
              ...aliasEntries,
            };

        // Normalise plugin list to an array while preserving original objects/functions.
        const rawPlugins = config.vite?.plugins;
        // Broad type retained for maximum compatibility with user-land / plugin-provided shapes.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const plugins: any[] = Array.isArray(rawPlugins)
          ? [...rawPlugins]
          : rawPlugins
            ? [rawPlugins]
            : [];

        if (tailwindOption !== false) {
          // Avoid adding duplicate Tailwind plugin instances.
          if (
            !plugins.some(
              (p) =>
                typeof p === "object" &&
                p &&
                "name" in p &&
                (p as { name?: string }).name === "tailwindcss"
            )
          ) {
            plugins.push(tailwindcss());
          }

          if (typeof tailwindOption === "object" && "entry" in tailwindOption) {
            console.warn(
              "[spectre-ui] 'tailwind.entry' is deprecated. Import 'spectre-ui/styles/base.css' manually."
            );
          }
        }

        updateConfig({
          vite: {
            resolve: { ...(config.vite?.resolve ?? {}), alias: mergedAlias },
            plugins,
          },
        });
      },
    },
  };
}
