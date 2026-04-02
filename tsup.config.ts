import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/tailwind/index.ts'],
  target: 'esnext',
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: !options.watch,
  outDir: 'dist',
  treeshake: true,
  watch: options.watch ? ['src', 'src/styles'] : undefined,
}));
