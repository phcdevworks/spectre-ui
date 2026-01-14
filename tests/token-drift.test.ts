import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const tokensCssPath = path.join(
  projectRoot,
  'node_modules',
  '@phcdevworks',
  'spectre-tokens',
  'dist',
  'index.css',
);

const styleFiles = [
  path.join(projectRoot, 'src', 'styles', 'base.css'),
  path.join(projectRoot, 'src', 'styles', 'components.css'),
  path.join(projectRoot, 'src', 'styles', 'utilities.css'),
  path.join(projectRoot, 'src', 'styles', 'index.css'),
];

const tokenVarRegex = /--sp-[a-z0-9-]+/g;
const fallbackVarRegex = /var\(--sp-[a-z0-9-]+\s*,/;
const rawColorRegex = /#[0-9a-fA-F]{3,8}\b|rgba?\(/;

const readFile = (filePath: string): string => fs.readFileSync(filePath, 'utf8');

const tokensCss = readFile(tokensCssPath);
const tokenVars = new Set(tokensCss.match(tokenVarRegex) ?? []);

const styleContents = styleFiles.map((filePath) => ({
  filePath,
  content: readFile(filePath),
}));

const usedVars = new Set(
  styleContents.flatMap(({ content }) => content.match(tokenVarRegex) ?? []),
);

describe('token drift guard', () => {
  it('uses only tokens from spectre-tokens or component-scoped vars', () => {
    const unknown = Array.from(usedVars).filter(
      (name) => !name.startsWith('--sp-component-') && !tokenVars.has(name),
    );

    expect(unknown, `Unknown tokens: ${unknown.join(', ')}`).toHaveLength(0);
  });

  it('does not use fallback values for tokens in source styles', () => {
    const offenders = styleContents
      .filter(({ content }) => fallbackVarRegex.test(content))
      .map(({ filePath }) => filePath);

    expect(offenders, `Fallback token usage found in: ${offenders.join(', ')}`).toHaveLength(0);
  });

  it('does not include raw color literals in source styles', () => {
    const offenders = styleContents
      .filter(({ content }) => rawColorRegex.test(content))
      .map(({ filePath }) => filePath);

    expect(offenders, `Raw color literals found in: ${offenders.join(', ')}`).toHaveLength(0);
  });
});
