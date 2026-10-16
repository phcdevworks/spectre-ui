import process from 'node:process';

const version = process.versions.node;
const [major, minor] = version.split('.').map(Number) as [number, number, number];

// The build tooling's floor (tsup 9: ^22.18.0 || ^24.11.0 || >=26.0.0).
const supported =
  (major === 22 && minor >= 18) || (major === 24 && minor >= 11) || major >= 26;

if (!supported) {
  console.error(
    [
      `Unsupported Node.js runtime: ${version}`,
      'This repository requires Node.js ^22.18.0, ^24.11.0, or >=26.0.0.',
      'Use the version pinned in .nvmrc locally, and keep CI agents on a matching supported runtime.',
    ].join('\n'),
  );
  process.exit(1);
}

console.log(`Node.js runtime supported: ${version}`);
