// Generates the icon entry points under src/icons/ from their pinned npm
// packages and guards each set's public icon-name contract.
//
//   node --experimental-strip-types ./scripts/build-icons.ts           write
//   node --experimental-strip-types ./scripts/build-icons.ts --check   verify
//   node --experimental-strip-types ./scripts/build-icons.ts --update  write + snapshots
//
// Each entry re-exports the package's own icon values by name, so a bundler
// keeps only the icons a project imports. Icon packages keep a renamed
// icon's old name as an alias, so names are only added between releases. A
// name that disappears from scripts/icon-snapshots/ is a breaking change;
// --check fails on it until the snapshot is updated deliberately alongside a
// major release.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = path.resolve(import.meta.dirname, '..');
const snapshotDir = path.join(projectRoot, 'scripts', 'icon-snapshots');
const mode = process.argv.includes('--check')
  ? 'check'
  : process.argv.includes('--update')
    ? 'update'
    : 'write';

// Some packages (simple-icons) do not export ./package.json, so resolve the
// installed folder directly.
const packageRoot = (name: string): string => {
  const root = path.join(projectRoot, 'node_modules', ...name.split('/'));
  if (!fs.existsSync(path.join(root, 'package.json'))) {
    throw new Error(`${name} is not installed`);
  }
  return root;
};
const packageInfo = (name: string): { version: string; license: string } =>
  JSON.parse(fs.readFileSync(path.join(packageRoot(name), 'package.json'), 'utf8')) as {
    version: string;
    license: string;
  };

interface IconSet {
  /** Subpath: `@phcdevworks/spectre-ui/icons` for lucide, else `/icons/<id>`. */
  id: string;
  packageName: string;
  title: string;
  homepage: string;
  output: string;
  names: () => Promise<string[]>;
  /** Extra generated source after the re-export list. */
  extra?: () => Promise<string>;
}

const exportedNames = async (
  packageName: string,
  keep: (name: string, value: unknown) => boolean,
): Promise<string[]> => {
  const mod = (await import(packageName)) as Record<string, unknown>;
  return Object.keys(mod).filter((name) => keep(name, mod[name]));
};

// Lucide: names and aliases come from the ESM entry, where every icon is
// `export { default as Name, default as Alias } from './icons/name.mjs'`.
// Its DOM helpers (createIcons, createElement, the `icons` map) are left out.
const lucideRoot = packageRoot('lucide');
const lucideAliases: Record<string, string> = {};
const lucideNames = async (): Promise<string[]> => {
  const entrySource = fs.readFileSync(path.join(lucideRoot, 'dist', 'esm', 'lucide.mjs'), 'utf8');
  const names: string[] = [];
  for (const match of entrySource.matchAll(
    /export \{ ([^}]+) \} from '\.\/icons\/([a-z0-9-]+)\.mjs';/g,
  )) {
    const exported = Array.from(match[1].matchAll(/default as ([A-Za-z0-9]+)/g), (m) => m[1]);
    const canonical = match[2]
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    const primary = exported.includes(canonical) ? canonical : exported[0];
    for (const name of exported) {
      names.push(name);
      if (name !== primary) lucideAliases[name] = primary;
    }
  }
  return names;
};
const lucideExtra = async (): Promise<string> => {
  const { default: defaultAttributes } = (await import(
    pathToFileURL(path.join(lucideRoot, 'dist', 'esm', 'defaultAttributes.mjs')).href
  )) as { default: Record<string, string | number> };
  const quote = (value: string | number): string =>
    typeof value === 'number' ? String(value) : `'${value}'`;
  const attributeLines = Object.entries(defaultAttributes)
    .map(([key, value]) => `  ${/^[a-z]+$/i.test(key) ? key : `'${key}'`}: ${quote(value)}`)
    .join(',\n');
  const aliasLines = Object.keys(lucideAliases)
    .sort()
    .map((alias) => `  ${alias}: '${lucideAliases[alias]}'`)
    .join(',\n');
  return `
/** The Lucide release these icons come from. */
export const lucideVersion = '${packageInfo('lucide').version}'

/** Lucide's default root \`<svg>\` attributes; every icon is drawn for them. */
export const iconAttributes = {
${attributeLines}
} as const

/** Older and alternate names, each mapped to the icon it points to. */
export const iconAliases = {
${aliasLines}
} as const
`;
};

// Simple Icons is CC0 overall, but some logos carry their own licence. Ship
// only logos that put no copyleft, share-alike, non-commercial,
// no-derivatives, or custom terms on a consuming project.
const BRAND_LICENSES_ALLOWED = new Set([
  'CC0-1.0',
  'MIT',
  'Apache-2.0',
  'BSD-3-Clause',
  'Unlicense',
  'CC-BY-2.5',
  'CC-BY-3.0',
  'CC-BY-4.0',
]);
const brandNames = async (): Promise<string[]> => {
  const data = JSON.parse(
    fs.readFileSync(path.join(packageRoot('simple-icons'), 'data', 'simple-icons.json'), 'utf8'),
  ) as { slug: string; license?: { type: string } }[] | { icons: { slug: string; license?: { type: string } }[] };
  const entries = Array.isArray(data) ? data : data.icons;
  const excluded = new Set(
    entries
      .filter((entry) => entry.license && !BRAND_LICENSES_ALLOWED.has(entry.license.type))
      .map((entry) => entry.slug),
  );
  return exportedNames(
    'simple-icons',
    (name, value) =>
      name.startsWith('si') &&
      typeof value === 'object' &&
      value !== null &&
      !excluded.has((value as { slug: string }).slug),
  );
};

const fontAwesome = (style: 'solid' | 'regular' | 'brands'): IconSet => ({
  id: `fa-${style}`,
  packageName: `@fortawesome/free-${style}-svg-icons`,
  title: `Font Awesome Free (${style})`,
  homepage: 'https://fontawesome.com/icons',
  output: `fa-${style}.generated.ts`,
  names: () =>
    exportedNames(
      `@fortawesome/free-${style}-svg-icons`,
      (name, value) =>
        name.startsWith('fa') &&
        typeof value === 'object' &&
        value !== null &&
        Array.isArray((value as { icon?: unknown }).icon),
    ),
});

const SETS: IconSet[] = [
  {
    id: 'lucide',
    packageName: 'lucide',
    title: 'Lucide',
    homepage: 'https://lucide.dev',
    output: 'icons.generated.ts',
    names: lucideNames,
    extra: lucideExtra,
  },
  {
    id: 'mdi',
    packageName: '@mdi/js',
    title: 'Material Design Icons',
    homepage: 'https://pictogrammers.com/library/mdi/',
    output: 'mdi.generated.ts',
    names: () =>
      exportedNames('@mdi/js', (name, value) => name.startsWith('mdi') && typeof value === 'string'),
  },
  {
    id: 'brands',
    packageName: 'simple-icons',
    title: 'Simple Icons',
    homepage: 'https://simpleicons.org',
    output: 'brands.generated.ts',
    names: brandNames,
  },
  fontAwesome('solid'),
  fontAwesome('regular'),
  fontAwesome('brands'),
];

const render = async (set: IconSet, names: string[]): Promise<string> => {
  const { version, license } = packageInfo(set.packageName);
  const meta = {
    id: set.id,
    title: set.title,
    package: set.packageName,
    version,
    license,
    homepage: set.homepage,
    count: names.length,
  };
  return `// This file is generated by scripts/build-icons.ts. Do not hand-edit.
// Regenerate with \`npm run build:icons\` after an icon package bump.
// Icons: ${set.title} ${version} (${license}), ${set.homepage}

export {
${names.map((name) => `  ${name}`).join(',\n')}
} from '${set.packageName}'

/** Which package and release this entry re-exports. */
export const iconSet = ${JSON.stringify(meta, null, 2).replace(/"([a-z]+)":/g, '$1:').replace(/"/g, "'")} as const
${set.extra ? await set.extra() : ''}`;
};

const errors: string[] = [];
let total = 0;
for (const set of SETS) {
  const names = (await set.names()).sort();
  if (names.length === 0) {
    errors.push(`${set.id}: no icons found in ${set.packageName}; its export format changed.`);
    continue;
  }
  total += names.length;
  const output = await render(set, names);
  const outputPath = path.join(projectRoot, 'src', 'icons', set.output);
  const snapshotPath = path.join(snapshotDir, `${set.id}.json`);
  const snapshot = fs.existsSync(snapshotPath)
    ? (JSON.parse(fs.readFileSync(snapshotPath, 'utf8')) as { names: string[] }).names
    : [];
  const current = new Set(names);
  const removed = snapshot.filter((name) => !current.has(name));
  const added = names.filter((name) => !snapshot.includes(name)).length;

  if (mode === 'check') {
    const generated = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    if (generated !== output) {
      errors.push(`src/icons/${set.output} is stale. Run \`npm run build:icons\`.`);
    }
    if (removed.length > 0) {
      errors.push(`${set.id}: names removed since the snapshot (breaking): ${removed.join(', ')}`);
    }
    if (added > 0) {
      errors.push(`${set.id}: ${added} names added since the snapshot. Run \`npm run build:icons -- --update\`.`);
    }
    continue;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, 'utf8');
  if (mode === 'update') {
    fs.mkdirSync(snapshotDir, { recursive: true });
    const { version } = packageInfo(set.packageName);
    fs.writeFileSync(
      snapshotPath,
      `${JSON.stringify({ package: set.packageName, version, names }, null, 2)}\n`,
      'utf8',
    );
  }
}

if (errors.length > 0) {
  console.error(`Icon contract check failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(
  `${mode === 'check' ? 'Icon contract valid' : 'Wrote icon entries'}: ${total} icons in ${SETS.length} sets.`,
);
