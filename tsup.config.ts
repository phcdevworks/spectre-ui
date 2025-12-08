import { defineConfig } from 'tsup';
import type { Plugin } from 'esbuild';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const stylesDir = path.resolve(rootDir, 'src', 'styles');
const styleFiles = ['base.css', 'components.css', 'utilities.css', 'index.css'];

const copyStylesPlugin = (): Plugin => ({
  name: 'copy-spectre-styles',
  setup(build) {
    build.onEnd(async (result) => {
      if (result.errors.length > 0) {
        return;
      }

      const outDir = build.initialOptions.outdir;
      if (!outDir) {
        return;
      }

      const outputDir = path.resolve(rootDir, outDir);
      await fs.mkdir(outputDir, { recursive: true });

      await Promise.all(
        styleFiles.map(async (file) => {
          const sourcePath = path.join(stylesDir, file);
          const targetPath = path.join(outputDir, file);
          await fs.copyFile(sourcePath, targetPath);
        }),
      );
    });
  },
});

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  target: 'esnext',
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: !options.watch,
  outDir: 'dist',
  treeshake: true,
  esbuildPlugins: [copyStylesPlugin()],
  watch: options.watch ? ['src', 'src/styles'] : undefined,
}));
