import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    index: 'src/index.ts',
    icons: 'src/icons/index.ts',
    'icons/mdi': 'src/icons/mdi.generated.ts',
    'icons/brands': 'src/icons/brands.generated.ts',
    'icons/fa-solid': 'src/icons/fa-solid.generated.ts',
    'icons/fa-regular': 'src/icons/fa-regular.generated.ts',
    'icons/fa-brands': 'src/icons/fa-brands.generated.ts',
  },
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
