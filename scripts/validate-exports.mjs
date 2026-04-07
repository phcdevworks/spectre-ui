import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = path.resolve(import.meta.dirname, '..');
const entryFile = path.join(projectRoot, 'src', 'index.ts');
const snapshotFile = path.join(projectRoot, 'scripts', 'export-snapshot.json');
const shouldUpdate = process.argv.includes('--update');

const exportBlockRegex = /export\s*\{([\s\S]*?)\}\s*from\s*['"](.+?)['"];?/g;
const exportAllRegex = /export\s+\*\s+from\s+['"](.+?)['"];?/g;

const visitedFiles = new Set();

const resolveImportPath = (fromFile, specifier) => {
  if (!specifier.startsWith('.')) {
    throw new Error(`Unsupported non-relative export in ${fromFile}: ${specifier}`);
  }

  const candidateBase = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    `${candidateBase}.ts`,
    `${candidateBase}.mts`,
    `${candidateBase}.tsx`,
    path.join(candidateBase, 'index.ts'),
    candidateBase,
  ];

  const resolved = candidates.find((candidate) => fs.existsSync(candidate));
  if (!resolved) {
    throw new Error(`Unable to resolve export target "${specifier}" from ${fromFile}`);
  }

  return resolved;
};

const parseExportSpecifiers = (block) =>
  block
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/^type\s+/, ''))
    .map((part) => part.split(/\s+as\s+/).at(-1)?.trim() ?? '')
    .filter(Boolean);

const collectExports = (filePath) => {
  if (visitedFiles.has(filePath)) {
    return new Set();
  }

  visitedFiles.add(filePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const names = new Set();

  for (const match of source.matchAll(exportBlockRegex)) {
    const [, block, specifier] = match;
    if (specifier) {
      parseExportSpecifiers(block).forEach((name) => names.add(name));
    }
  }

  for (const match of source.matchAll(exportAllRegex)) {
    const [, specifier] = match;
    const nestedPath = resolveImportPath(filePath, specifier);
    collectExports(nestedPath).forEach((name) => names.add(name));
  }

  return names;
};

const actualExports = Array.from(collectExports(entryFile)).sort((a, b) => a.localeCompare(b));
const serialized = `${JSON.stringify(actualExports, null, 2)}\n`;

if (shouldUpdate) {
  fs.writeFileSync(snapshotFile, serialized);
  console.log(`Updated export snapshot: ${path.relative(projectRoot, snapshotFile)}`);
  process.exit(0);
}

const expectedExports = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
const expectedSerialized = `${JSON.stringify(expectedExports, null, 2)}\n`;

if (serialized !== expectedSerialized) {
  const expectedSet = new Set(expectedExports);
  const actualSet = new Set(actualExports);
  const added = actualExports.filter((name) => !expectedSet.has(name));
  const removed = expectedExports.filter((name) => !actualSet.has(name));

  console.error('Root export contract drift detected.');
  if (added.length > 0) {
    console.error(`Added exports: ${added.join(', ')}`);
  }
  if (removed.length > 0) {
    console.error(`Removed exports: ${removed.join(', ')}`);
  }
  console.error('If the export change is intentional, run `npm run validate:exports:update` and commit the snapshot.');
  process.exit(1);
}

console.log(`Root export contract matches snapshot (${actualExports.length} exports).`);
