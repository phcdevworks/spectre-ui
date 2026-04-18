import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

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
const rawMeasurementRegex = /\b([0-9]*\.[0-9]+|[1-9][0-9]*)(px|rem)\b/g;
const rawTypographyValueRegex = /\b(?:[0-9]*\.?[0-9]+)(?:px|rem|em)\b|^\d*\.?\d+$/;

const readFile = (filePath: string): string => fs.readFileSync(filePath, 'utf8');

const tokensCss = readFile(tokensCssPath);
const tokenVars = new Set(tokensCss.match(tokenVarRegex) ?? []);

const styleContents = styleFiles.map((filePath) => ({
  filePath,
  content: readFile(filePath),
  root: postcss.parse(readFile(filePath), { from: filePath }),
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

  it('does not include literal px or rem measurements (outside base.css)', () => {
    const offenders: string[] = [];
    // Regex to strip custom-property definitions (--sp-*: <value>;)
    // These are token/role declarations, not raw usage in properties.
    const customPropDefRegex = /--sp-[a-z0-9-]+\s*:[^;]+;/g;

    styleContents
      .filter(({ filePath }) => !filePath.endsWith('base.css'))
      .forEach(({ filePath, content }) => {
        const stripped = content.replace(customPropDefRegex, '');
        const matches = stripped.match(rawMeasurementRegex);
        if (matches) {
          offenders.push(`${path.basename(filePath)}: ${matches.join(', ')}`);
        }
      });

    expect(offenders, `Literal measurements found:\n- ${offenders.join('\n- ')}`).toHaveLength(0);
  });

  it('does not include raw typography values in source styles', () => {
    const offenders: string[] = [];

    styleContents.forEach(({ filePath, root }) => {
      root.walkDecls((decl) => {
        if (decl.variable) return;
        if (decl.prop !== 'font-size' && decl.prop !== 'line-height') return;

        const value = decl.value.trim();
        if (!rawTypographyValueRegex.test(value)) return;

        const selector =
          decl.parent?.type === 'rule'
            ? decl.parent.selector
            : decl.parent?.type === 'atrule'
              ? `@${decl.parent.name} ${decl.parent.params}`.trim()
              : '<unknown>';

        offenders.push(
          `${path.basename(filePath)}: ${selector} -> ${decl.prop}: ${value}`
        );
      });
    });

    expect(
      offenders,
      `Raw typography values found:\n- ${offenders.join('\n- ')}`
    ).toHaveLength(0);
  });
});
