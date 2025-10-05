import { cpSync, existsSync, rmSync } from "node:fs";
import { build } from "tsup";

const componentsDir = "src/components";
const distComponentsDir = "dist/components";
const stylesDir = "src/styles";
const distStylesDir = "dist/styles";

await build({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "node18",
  external: ["astro", "@tailwindcss/vite"],
  splitting: false,
  treeshake: true,
});

if (existsSync(distComponentsDir)) {
  rmSync(distComponentsDir, { recursive: true, force: true });
}
cpSync(componentsDir, distComponentsDir, { recursive: true });

if (existsSync(stylesDir)) {
  if (existsSync(distStylesDir)) {
    rmSync(distStylesDir, { recursive: true, force: true });
  }
  cpSync(stylesDir, distStylesDir, { recursive: true });
}
