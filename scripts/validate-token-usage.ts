import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Enforces the companywide "L1 is the only source of design values" rule
// (see CLAUDE.md) inside this package's own authored CSS. Scans source
// stylesheets only — not vendored @phcdevworks/spectre-tokens output, which
// is the one legitimate place raw values are allowed to live.

const projectRoot = path.resolve(import.meta.dirname, '..');
const stylesDir = path.join(projectRoot, 'src', 'styles');

const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{1}|[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?\b/g;
const BARE_LENGTH_PATTERN = /(-?\d+(?:\.\d+)?)(px|rem)\b/g;

interface Violation {
  file: string;
  line: number;
  column: number;
  match: string;
  rule: 'hex-color' | 'bare-length';
}

const stripComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, (comment) => ' '.repeat(comment.length));

const lineAndColumnAt = (text: string, index: number): { line: number; column: number } => {
  const before = text.slice(0, index);
  const line = before.split('\n').length;
  const column = index - before.lastIndexOf('\n');
  return { line, column };
};

const findHexColorViolations = (file: string, css: string): Violation[] => {
  const violations: Violation[] = [];
  for (const match of css.matchAll(HEX_COLOR_PATTERN)) {
    const { line, column } = lineAndColumnAt(css, match.index ?? 0);
    violations.push({ file, line, column, match: match[0], rule: 'hex-color' });
  }
  return violations;
};

const findBareLengthViolations = (file: string, css: string): Violation[] => {
  const violations: Violation[] = [];
  const lines = css.split('\n');

  lines.forEach((lineText, lineIndex) => {
    // The token scale has no way to express a media-query breakpoint (CSS
    // custom properties are not valid in media-feature values), so bare px
    // there is the accepted exception rather than a violation.
    if (/@media/.test(lineText)) return;

    for (const match of lineText.matchAll(BARE_LENGTH_PATTERN)) {
      const precedingText = lineText.slice(0, match.index ?? 0);
      const lastVarOpen = precedingText.lastIndexOf('var(--sp-');
      const lastParenClose = precedingText.lastIndexOf(')');

      // Skip lengths that are arguments inside a var(--sp-*, <fallback>) call.
      if (lastVarOpen !== -1 && lastVarOpen > lastParenClose) continue;

      violations.push({
        file,
        line: lineIndex + 1,
        column: (match.index ?? 0) + 1,
        match: match[0],
        rule: 'bare-length',
      });
    }
  });

  return violations;
};

const sourceCssFiles = fs
  .readdirSync(stylesDir)
  .filter((fileName) => fileName.endsWith('.css'))
  .sort();

const violations: Violation[] = [];

for (const fileName of sourceCssFiles) {
  const filePath = path.join(stylesDir, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  const css = stripComments(raw);
  const relativePath = path.relative(projectRoot, filePath);

  violations.push(...findHexColorViolations(relativePath, css));
  violations.push(...findBareLengthViolations(relativePath, css));
}

if (violations.length > 0) {
  console.error(`Found ${violations.length} raw design-value violation(s) outside var(--sp-*):\n`);
  for (const violation of violations) {
    const reason = violation.rule === 'hex-color' ? 'raw hex color' : 'bare px/rem length';
    console.error(`  ${violation.file}:${violation.line}:${violation.column} — ${reason} "${violation.match}"`);
  }
  console.error(
    '\nAll design values must come from @phcdevworks/spectre-tokens via var(--sp-*). ' +
      'See CLAUDE.md "The One Rule That Overrides Everything".',
  );
  process.exit(1);
}

console.log(`No raw hex/px/rem values found outside var(--sp-*) in ${sourceCssFiles.length} source stylesheet(s).`);
