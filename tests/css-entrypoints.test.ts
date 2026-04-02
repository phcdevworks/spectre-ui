import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const readDistCss = (fileName: string): string =>
  fs.readFileSync(path.join(distDir, fileName), 'utf8');

describe('dist CSS entrypoints', () => {
  it('ships standalone base/components/utilities bundles with token variables inlined', () => {
    const entrypoints = ['base.css', 'components.css', 'utilities.css'];

    entrypoints.forEach((fileName) => {
      const css = readDistCss(fileName);
      expect(css).toContain('--sp-surface-page:');
    });
  });
});
