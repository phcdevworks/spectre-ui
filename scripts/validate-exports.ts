import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { collectExports } from './collect-exports.ts';

const projectRoot = path.resolve(import.meta.dirname, '..');
const entryFile = path.join(projectRoot, 'src', 'index.ts');
const snapshotFile = path.join(projectRoot, 'scripts', 'export-snapshot.json');
const shouldUpdate = process.argv.includes('--update');

const actualExports = collectExports(entryFile);
const serialized = `${JSON.stringify(actualExports, null, 2)}\n`;

if (shouldUpdate) {
  fs.writeFileSync(snapshotFile, serialized);
  console.log(`Updated export snapshot: ${path.relative(projectRoot, snapshotFile)}`);
  process.exit(0);
}

const expectedExports = JSON.parse(fs.readFileSync(snapshotFile, 'utf8')) as string[];
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
