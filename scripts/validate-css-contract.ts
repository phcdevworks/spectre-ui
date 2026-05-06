import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

interface UiContractManifest {
  cssEntrypoints?: string[];
  [key: string]: unknown;
}

interface PackageJson {
  exports?: Record<string, string | Record<string, string>>;
  [key: string]: unknown;
}

const projectRoot = path.resolve(import.meta.dirname, '..');
const packageJsonPath = path.join(projectRoot, 'package.json');
const manifestPath = path.join(projectRoot, 'ui-contract.manifest.json');
const distDir = path.join(projectRoot, 'dist');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as PackageJson;
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as UiContractManifest;
const exportEntries = Object.entries(packageJson.exports ?? {});

const cssExportMap = new Map<string, string>(
  exportEntries
    .filter(([exportKey, exportValue]) => exportKey.endsWith('.css') && typeof exportValue === 'string')
    .map(([k, v]) => [k, v as string]),
);

if (cssExportMap.size === 0) {
  console.error('No CSS entry points were found in package.json exports.');
  process.exit(1);
}

const manifestEntrypoints = new Set<string>(manifest.cssEntrypoints ?? []);
const packageEntrypoints = new Set<string>(
  Array.from(cssExportMap.keys()).map((k) => `@phcdevworks/spectre-ui${k.slice(1)}`),
);

const manifestOnly = [...manifestEntrypoints].filter((e) => !packageEntrypoints.has(e));
const packageOnly = [...packageEntrypoints].filter((e) => !manifestEntrypoints.has(e));

if (manifestOnly.length > 0 || packageOnly.length > 0) {
  console.error('CSS entrypoint drift between ui-contract.manifest.json and package.json:');
  if (manifestOnly.length > 0) console.error(`  In manifest only: ${manifestOnly.join(', ')}`);
  if (packageOnly.length > 0) console.error(`  In package.json only: ${packageOnly.join(', ')}`);
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  console.error('dist/ does not exist. Run `npm run build` before validating the CSS contract.');
  process.exit(1);
}

const exportedCssFiles = Array.from(cssExportMap.values())
  .map((filePath) => filePath.replace(/^\.\//, ''))
  .sort((a, b) => a.localeCompare(b));

const emittedCssFiles = fs
  .readdirSync(distDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.css'))
  .map((entry) => path.posix.join('dist', entry.name))
  .sort((a, b) => a.localeCompare(b));

const missingFiles = exportedCssFiles.filter((filePath) => !fs.existsSync(path.join(projectRoot, filePath)));
const undocumentedDistFiles = emittedCssFiles.filter((filePath) => !exportedCssFiles.includes(filePath));
const missingExports = exportedCssFiles.filter((filePath) => !emittedCssFiles.includes(filePath));

if (missingFiles.length > 0 || undocumentedDistFiles.length > 0 || missingExports.length > 0) {
  console.error('CSS entry point contract drift detected.');
  if (missingFiles.length > 0) {
    console.error(`Missing emitted CSS files: ${missingFiles.join(', ')}`);
  }
  if (missingExports.length > 0) {
    console.error(`package.json exports reference non-emitted CSS files: ${missingExports.join(', ')}`);
  }
  if (undocumentedDistFiles.length > 0) {
    console.error(`dist contains CSS files not exported by package.json: ${undocumentedDistFiles.join(', ')}`);
  }
  process.exit(1);
}

console.log(`CSS contract valid for ${exportedCssFiles.length} entry points.`);
