import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const tokensCssPath = path.join(
  projectRoot,
  'node_modules',
  '@phcdevworks',
  'spectre-tokens',
  'dist',
  'index.css',
);
const outputPath = path.join(projectRoot, 'src', 'styles', 'utilities.generated.css');

const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');

const collectVarSteps = (prefix: string): string[] => {
  const regex = new RegExp(`--sp-${prefix}-([a-z0-9]+):`, 'g');
  const steps: string[] = [];
  for (const match of tokensCss.matchAll(regex)) {
    steps.push(match[1]);
  }
  return steps;
};

const collectBreakpoints = (): Record<string, string> => {
  const regex = /--sp-breakpoint-([a-z0-9]+):\s*([0-9]+px)/g;
  const breakpoints: Record<string, string> = {};
  for (const match of tokensCss.matchAll(regex)) {
    breakpoints[match[1]] = match[2];
  }
  return breakpoints;
};

const collectPaletteHues = (): Map<string, string[]> => {
  const regex = /--sp-color-palette-([a-z]+)-([0-9]+):/g;
  const hues = new Map<string, string[]>();
  for (const match of tokensCss.matchAll(regex)) {
    const [, hue, step] = match;
    if (!hues.has(hue)) hues.set(hue, []);
    hues.get(hue)!.push(step);
  }
  return hues;
};

const spaceSteps = collectVarSteps('space');
const radiusSteps = collectVarSteps('radius');
const shadowSteps = collectVarSteps('shadow');
const opacitySteps = collectVarSteps('opacity');
const zIndexSteps = collectVarSteps('z-index');
const paletteHues = collectPaletteHues();
const breakpoints = collectBreakpoints();

// Responsive variants land at md/lg only, matching Grid's existing step-down
// convention (Phase 4c) — sm/xl/2xl are not used by any generated utility
// today. Extend this list if a real downstream need surfaces (Phase 7 P0).
const RESPONSIVE_BREAKPOINT_ORDER = ['md', 'lg'] as const;

interface SpacingAxis {
  className: string;
  properties: string[];
}

// Logical-property pairs (ps/pe/ms/me) are deliberately out of v1 scope per
// Phase 7 P0.
const SPACING_AXES: SpacingAxis[] = [
  { className: 'p', properties: ['padding'] },
  { className: 'px', properties: ['padding-left', 'padding-right'] },
  { className: 'py', properties: ['padding-top', 'padding-bottom'] },
  { className: 'pt', properties: ['padding-top'] },
  { className: 'pr', properties: ['padding-right'] },
  { className: 'pb', properties: ['padding-bottom'] },
  { className: 'pl', properties: ['padding-left'] },
  { className: 'm', properties: ['margin'] },
  { className: 'mx', properties: ['margin-left', 'margin-right'] },
  { className: 'my', properties: ['margin-top', 'margin-bottom'] },
  { className: 'mt', properties: ['margin-top'] },
  { className: 'mr', properties: ['margin-right'] },
  { className: 'mb', properties: ['margin-bottom'] },
  { className: 'ml', properties: ['margin-left'] },
  { className: 'gap', properties: ['gap'] },
  { className: 'gap-x', properties: ['column-gap'] },
  { className: 'gap-y', properties: ['row-gap'] },
];

const rule = (selector: string, declarations: string[]): string =>
  `  ${selector} {\n${declarations.map((d) => `    ${d}`).join('\n')}\n  }`;

const spacingRule = (axis: SpacingAxis, step: string): string =>
  rule(
    `.sp-${axis.className}-${step}`,
    axis.properties.map((prop) => `${prop}: var(--sp-space-${step});`),
  );

const buildBaseSpacingRules = (): string[] =>
  SPACING_AXES.flatMap((axis) => spaceSteps.map((step) => spacingRule(axis, step)));

const buildResponsiveSpacingBlock = (breakpoint: string): string => {
  const value = breakpoints[breakpoint];
  const rules = SPACING_AXES.flatMap((axis) =>
    spaceSteps.map((step) =>
      rule(
        `.sp-${breakpoint}-${axis.className}-${step}`,
        axis.properties.map((prop) => `${prop}: var(--sp-space-${step});`),
      ),
    ),
  );
  return `  @media (min-width: ${value}) {\n${rules.join('\n\n')}\n  }`;
};

const buildPaletteRules = (): string[] => {
  const rules: string[] = [];
  for (const [hue, steps] of paletteHues) {
    for (const step of steps) {
      rules.push(rule(`.sp-text-${hue}-${step}`, [`color: var(--sp-color-palette-${hue}-${step});`]));
      rules.push(
        rule(`.sp-bg-${hue}-${step}`, [`background-color: var(--sp-color-palette-${hue}-${step});`]),
      );
      rules.push(
        rule(`.sp-border-${hue}-${step}`, [`border-color: var(--sp-color-palette-${hue}-${step});`]),
      );
    }
  }
  return rules;
};

const buildRadiusRules = (): string[] =>
  radiusSteps.map((step) => rule(`.sp-rounded-${step}`, [`border-radius: var(--sp-radius-${step});`]));

const buildShadowRules = (): string[] =>
  shadowSteps.map((step) => rule(`.sp-shadow-${step}`, [`box-shadow: var(--sp-shadow-${step});`]));

const buildOpacityRules = (): string[] =>
  opacitySteps.map((step) => rule(`.sp-opacity-${step}`, [`opacity: var(--sp-opacity-${step});`]));

const buildZIndexRules = (): string[] =>
  zIndexSteps.map((step) => rule(`.sp-z-${step}`, [`z-index: var(--sp-z-index-${step});`]));

const sections: string[] = [];

sections.push(buildBaseSpacingRules().join('\n\n'));
sections.push(buildPaletteRules().join('\n\n'));
sections.push(buildRadiusRules().join('\n\n'));
sections.push(buildShadowRules().join('\n\n'));
sections.push(buildOpacityRules().join('\n\n'));
sections.push(buildZIndexRules().join('\n\n'));

for (const breakpoint of RESPONSIVE_BREAKPOINT_ORDER) {
  sections.push(buildResponsiveSpacingBlock(breakpoint));
}

const banner = [
  '/* This file is generated by scripts/build-utilities.ts. Do not hand-edit. */',
  '/* Regenerate with `npm run build:utilities` after a spectre-tokens bump. */',
].join('\n');

const output = `${banner}\n\n@layer utilities {\n${sections.join('\n\n')}\n}\n`;

fs.writeFileSync(outputPath, output, 'utf8');

console.log(
  `Generated ${outputPath.replace(`${projectRoot}/`, '')}: ` +
    `${spaceSteps.length} space steps, ${paletteHues.size} palette hues, ` +
    `${radiusSteps.length} radius steps, ${shadowSteps.length} shadow steps, ` +
    `${opacitySteps.length} opacity roles, ${zIndexSteps.length} z-index roles, ` +
    `${RESPONSIVE_BREAKPOINT_ORDER.length} responsive breakpoints.`,
);
