import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const projectRoot = path.resolve(import.meta.dirname, '..');
const lockfilePath = path.join(projectRoot, 'package-lock.json');
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageName = '@phcdevworks/spectre-tokens';

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const lockfile = readJson(lockfilePath);
const packageJson = readJson(packageJsonPath);

const lockedVersion = lockfile.packages?.[`node_modules/${packageName}`]?.version;
const declaredRange = packageJson.dependencies?.[packageName];

if (!lockedVersion || !declaredRange) {
  console.error(`Unable to find ${packageName} in package.json and package-lock.json.`);
  process.exit(1);
}

const parseSemver = (value) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(value);
  if (!match) {
    throw new Error(`Unsupported semver value: ${value}`);
  }

  return match.slice(1).map((part) => Number(part));
};

const compareSemver = (left, right) => {
  const [leftMajor, leftMinor, leftPatch] = parseSemver(left);
  const [rightMajor, rightMinor, rightPatch] = parseSemver(right);

  if (leftMajor !== rightMajor) {
    return leftMajor - rightMajor;
  }
  if (leftMinor !== rightMinor) {
    return leftMinor - rightMinor;
  }

  return leftPatch - rightPatch;
};

const fallbackTmpRoot = path.join(projectRoot, '.tmp');
const writableTmpRoot = fs.existsSync('/tmp') ? '/tmp' : fallbackTmpRoot;

fs.mkdirSync(writableTmpRoot, { recursive: true });

const tempDir = fs.mkdtempSync(path.join(writableTmpRoot, 'spectre-ui-token-check-'));

try {
  fs.writeFileSync(
    path.join(tempDir, 'package.json'),
    JSON.stringify({ name: 'spectre-ui-token-check', private: true }, null, 2),
  );

  const install = spawnSync(
    'npm',
    ['install', '--ignore-scripts', '--package-lock=false', '--no-save', `${packageName}@latest`],
    {
      cwd: tempDir,
      encoding: 'utf8',
      env: {
        ...process.env,
        npm_config_cache: path.join(tempDir, '.npm-cache'),
        TMPDIR: writableTmpRoot,
        TMP: writableTmpRoot,
        TEMP: writableTmpRoot,
      },
      timeout: 10000,
    },
  );

  if (install.status !== 0) {
    console.warn(
      [
        `Warning: unable to validate latest published ${packageName}.`,
        'Skipping failure so CI does not block on registry or network instability.',
        install.stderr?.trim() || install.stdout?.trim() || 'npm install failed.',
      ].join('\n'),
    );
    process.exit(0);
  }

  const latestPackageJson = readJson(
    path.join(tempDir, 'node_modules', '@phcdevworks', 'spectre-tokens', 'package.json'),
  );
  const latestVersion = latestPackageJson.version;

  if (compareSemver(lockedVersion, latestVersion) < 0) {
    console.error(
      [
        `${packageName} is behind the latest published package.`,
        `Declared range: ${declaredRange}`,
        `Locked version: ${lockedVersion}`,
        `Latest published version: ${latestVersion}`,
      ].join('\n'),
    );
    process.exit(1);
  }

  console.log(
    [
      `${packageName} is current.`,
      `Declared range: ${declaredRange}`,
      `Locked version: ${lockedVersion}`,
      `Latest published version: ${latestVersion}`,
    ].join('\n'),
  );
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
