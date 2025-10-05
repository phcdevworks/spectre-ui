/* eslint-env node */
import { cpSync, existsSync, rmSync } from "node:fs";
import { build } from "tsup";

const copyDir = (src, dest) => {
  if (!existsSync(src)) return;
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
};

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

copyDir("src/components", "dist/components");
copyDir("src/styles", "dist/styles");
