import process from 'node:process';

const version = process.versions.node;
const [major, minor] = version.split('.').map(Number);

const supported =
  (major === 22 && minor >= 12) ||
  major >= 24;

if (!supported) {
  console.error(
    [
      `Unsupported Node.js runtime: ${version}`,
      'This repository requires Node.js ^22.12.0 or >=24.0.0.',
      'Use the version pinned in .nvmrc locally, and keep CI agents on a matching supported runtime.',
    ].join('\n'),
  );
  process.exit(1);
}

console.log(`Node.js runtime supported: ${version}`);
