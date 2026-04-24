import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = path.resolve(import.meta.dirname, '..');
const manifestPath = path.join(projectRoot, 'ui-contract.manifest.json');
const readmePath = path.join(projectRoot, 'README.md');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const readme = fs.readFileSync(readmePath, 'utf8');

const failures = [];

// CSS entrypoints
for (const entry of manifest.cssEntrypoints) {
  if (!readme.includes(entry)) {
    failures.push(`CSS entrypoint not documented in README: ${entry}`);
  }
}

// Tailwind exports (runtime symbols only, not types)
for (const name of manifest.tailwindExports) {
  if (!readme.includes(name)) {
    failures.push(`Tailwind export not documented in README: ${name}`);
  }
}

// Root constants
for (const name of manifest.rootExports.constants) {
  if (!readme.includes(name)) {
    failures.push(`Root constant not documented in README: ${name}`);
  }
}

// Primary recipe functions only (getXxxClasses, not helpers)
const primaryRecipeFns = Object.values(manifest.recipeFamilies).map((f) => f.fn);
for (const name of primaryRecipeFns) {
  if (!readme.includes(name)) {
    failures.push(`Primary recipe function not documented in README: ${name}`);
  }
}

if (failures.length > 0) {
  console.error('README contract parity drift detected:');
  for (const f of failures) console.error(` - ${f}`);
  console.error(
    'Update README.md so all manifest-declared surfaces are documented, or update the manifest if the surface changed.',
  );
  process.exit(1);
}

console.log('README contract parity valid.');
