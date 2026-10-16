import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = path.resolve(import.meta.dirname, '..');

// Both outputs of scripts/build-utilities.ts: the utility CSS and the recipe
// option maps derived from the same token scales.
const generatedPaths = [
  path.join(projectRoot, 'src', 'styles', 'utilities.generated.css'),
  path.join(projectRoot, 'src', 'internal', 'utility-scales.generated.ts'),
];

const relative = (filePath: string): string => path.relative(projectRoot, filePath);

for (const generatedPath of generatedPaths) {
  if (!fs.existsSync(generatedPath)) {
    console.error(`${relative(generatedPath)} does not exist. Run \`npm run build:utilities\`.`);
    process.exit(1);
  }
}

const before = generatedPaths.map((generatedPath) => fs.readFileSync(generatedPath, 'utf8'));

execFileSync('node', ['--experimental-strip-types', './scripts/build-utilities.ts'], {
  cwd: projectRoot,
  stdio: 'pipe',
});

const stale = generatedPaths.filter(
  (generatedPath, index) => fs.readFileSync(generatedPath, 'utf8') !== before[index],
);

if (stale.length > 0) {
  generatedPaths.forEach((generatedPath, index) => {
    fs.writeFileSync(generatedPath, before[index], 'utf8');
  });
  for (const generatedPath of stale) {
    console.error(
      `${relative(generatedPath)} is stale relative to the installed ` +
        '@phcdevworks/spectre-tokens package. Run `npm run build:utilities` and commit the result.',
    );
  }
  process.exit(1);
}

for (const generatedPath of generatedPaths) {
  console.log(`${relative(generatedPath)} is up to date.`);
}
