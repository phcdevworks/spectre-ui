import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = path.resolve(import.meta.dirname, '..');
const generatedPath = path.join(projectRoot, 'src', 'styles', 'utilities.generated.css');

if (!fs.existsSync(generatedPath)) {
  console.error('src/styles/utilities.generated.css does not exist. Run `npm run build:utilities`.');
  process.exit(1);
}

const before = fs.readFileSync(generatedPath, 'utf8');

execFileSync('node', ['--experimental-strip-types', './scripts/build-utilities.ts'], {
  cwd: projectRoot,
  stdio: 'pipe',
});

const after = fs.readFileSync(generatedPath, 'utf8');

if (before !== after) {
  fs.writeFileSync(generatedPath, before, 'utf8');
  console.error(
    'src/styles/utilities.generated.css is stale relative to the installed ' +
      '@phcdevworks/spectre-tokens package. Run `npm run build:utilities` and commit the result.',
  );
  process.exit(1);
}

console.log('src/styles/utilities.generated.css is up to date.');
