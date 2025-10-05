import { fileURLToPath } from "node:url";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import type { AstroIntegration } from "astro";

/**
 * Tailwind CSS related options for the Spectre UI integration.
 * Set `entry` to `false` to disable the automatic base stylesheet import.
 */
export interface TailwindOptions {
  /** CSS module to import automatically (default: `${alias}/styles/base.css`). */
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
 *  - Auto-inject a base stylesheet (can be disabled via `tailwind: { entry: false }`).
 */
export default function spectreUI(options: SpectreUIOptions = {}): AstroIntegration {
  const alias = options.alias ?? "spectre-ui";
  const tailwindOption = options.tailwind ?? true;

  return {
    name: "spectre-ui",
    hooks: {
      "astro:config:setup"({ config, updateConfig, injectScript }) {
        // Compose alias map (object form is simplest for consumers).
        const aliasEntries: Record<string, string> = {
          [alias]: packageDir,
          [`${alias}/components`]: componentsDir,
          [`${alias}/styles`]: stylesDir,
        };

        const existingAlias = config.vite?.resolve?.alias;
        const mergedAlias = Array.isArray(existingAlias)
          ? [
              ...existingAlias,
              ...Object.entries(aliasEntries).map(([find, replacement]) => ({ find, replacement })),
            ]
          : { ...(typeof existingAlias === "object" && existingAlias !== null ? existingAlias : {}), ...aliasEntries };

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
          if (!plugins.some((p) => typeof p === "object" && p && "name" in p && (p as { name?: string }).name === "tailwindcss")) {
            plugins.push(tailwindcss());
          }

          const defaultEntry = `${alias}/styles/base.css` as const;
          const entry = typeof tailwindOption === "object" ? tailwindOption.entry ?? defaultEntry : defaultEntry;

          if (entry) injectScript("page-ssr", `import '${entry}';`);
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

export type { SpectreButtonProps } from "./components/button.types";
