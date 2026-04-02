import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';

const rootDir = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const distDir = path.join(rootDir, 'dist');
const require = createRequire(import.meta.url);

const processor = postcss([
  postcssImport({
    path: [path.join(rootDir, 'node_modules')],
    resolve: (id, basedir) => require.resolve(id, { paths: [basedir] }),
  }),
]);

const entries = {
  'index.css': '@import "./src/styles/index.css";\n',
  'base.css': [
    '@import "@phcdevworks/spectre-tokens/index.css";',
    '@import "./src/styles/base.css";',
    '',
  ].join('\n'),
  'components.css': [
    '@import "@phcdevworks/spectre-tokens/index.css";',
    '@import "./src/styles/components.css";',
    '',
  ].join('\n'),
  'utilities.css': [
    '@import "@phcdevworks/spectre-tokens/index.css";',
    '@import "./src/styles/utilities.css";',
    '',
  ].join('\n'),
};

await mkdir(distDir, { recursive: true });

await Promise.all(
  Object.entries(entries).map(async ([fileName, source]) => {
    const result = await processor.process(source, {
      from: path.join(rootDir, `${fileName}.entry.css`),
      to: path.join(distDir, fileName),
    });

    await writeFile(path.join(distDir, fileName), result.css, 'utf8');
  }),
);
