import fs from 'node:fs';
import path from 'node:path';
import {
  AUTO_MARGIN_UTILITIES,
  LAYOUT_UTILITIES,
  type UtilityDefinition,
} from './layout-utilities.ts';

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

// Mode-aware families are re-declared in every color-mode block, so their
// role names are deduped (first-seen order).
const collectModeRoles = (prefix: string): string[] => {
  const regex = new RegExp(`--sp-${prefix}-([a-z0-9-]+):`, 'g');
  const roles = new Set<string>();
  for (const match of tokensCss.matchAll(regex)) {
    roles.add(match[1]);
  }
  return [...roles];
};

const collectElevationLevels = (): string[] =>
  [...new Set(collectModeRoles('elevation').map((role) => role.split('-')[0]))];

const collectBreakpoints = (): Record<string, string> => {
  const regex = /--sp-breakpoint-([a-z0-9]+):\s*([0-9]+px)/g;
  const breakpoints: Record<string, string> = {};
  for (const match of tokensCss.matchAll(regex)) {
    breakpoints[match[1]] = match[2];
  }
  return breakpoints;
};

// Hue names may be multi-segment (e.g. `integration-gunmetal`,
// `phcdevworks-paper`), so everything before the final numeric step is the hue.
const collectPaletteHues = (): Map<string, string[]> => {
  const regex = /--sp-color-palette-([a-z]+(?:-[a-z]+)*)-([0-9]+):/g;
  const hues = new Map<string, string[]>();
  for (const match of tokensCss.matchAll(regex)) {
    const [, hue, step] = match;
    if (!hues.has(hue)) hues.set(hue, []);
    hues.get(hue)!.push(step);
  }
  return hues;
};

// Standalone font-weight utilities, independent of the getTextClasses `size`
// preset. There is no dedicated --sp-font-weight-* scale published yet, so
// this derives the distinct weight values already published across the
// per-size (--sp-font-{step}-weight) and per-heading (--sp-heading-h{n}-weight)
// token groups, rather than inventing new weight values locally.
const collectFontWeights = (): string[] => {
  const regex = /--sp-(?:font-[a-z0-9]+|heading-h[1-6])-weight:\s*([0-9]+);/g;
  const weights = new Set<string>();
  for (const match of tokensCss.matchAll(regex)) {
    weights.add(match[1]);
  }
  return [...weights].sort((a, b) => Number(a) - Number(b));
};

// Raw semantic color scales as opt-in fixed-color utilities (TOKEN_CONTRACT
// "Semantic Tokens Vs Raw Palette Tokens"). Named `sp-{axis}-color-{scale}-{step}`
// after the token itself, because palette hues already own
// `sp-{axis}-neutral-*`, `-indigo-*`, and `-violet-*` with different values.
const SEMANTIC_COLOR_SCALES = [
  'brand',
  'accent',
  'neutral',
  'success',
  'warning',
  'error',
  'info',
  'indigo',
  'violet',
] as const;
const SINGLE_VALUE_COLORS = ['black', 'white'] as const;

const spaceSteps = collectVarSteps('space');
const aspectRatioSteps = collectVarSteps('aspect-ratio');
const trackingSteps = collectVarSteps('tracking');
const radiusSteps = collectVarSteps('radius');
const shadowSteps = collectVarSteps('shadow');
const shadowInsetSteps = collectVarSteps('shadow-inset');
const opacitySteps = collectVarSteps('opacity');
const zIndexSteps = collectVarSteps('z-index');
const durationSteps = collectVarSteps('duration');
const easingSteps = collectVarSteps('easing');
const borderStyleSteps = collectVarSteps('border-style');
const borderWidthSteps = collectVarSteps('border-width');
const iconSteps = collectVarSteps('icon');
const semanticColorSteps = new Map(
  SEMANTIC_COLOR_SCALES.map((scale) => [scale, collectVarSteps(`color-${scale}`)]),
);
const paletteHues = collectPaletteHues();
const breakpoints = collectBreakpoints();
const fontWeights = collectFontWeights();
const chartRoles = collectModeRoles('chart');
const surfaceRoles = collectModeRoles('surface');
const elevationLevels = collectElevationLevels();

// Full published breakpoint scale. Extended from md/lg-only (Phase 7 P0) once
// a downstream consumer's flex/spacing layouts needed sm/xl/2xl step-downs
// that md/lg alone couldn't express (TODO.md, decided 2026-08-18). This is
// the generated utility engine's own responsive scope — Grid's hand-authored
// column-count utilities (src/styles/utilities.css) keep their separate
// md/lg-only convention (Phase 4c) and are unaffected by this list.
const RESPONSIVE_BREAKPOINT_ORDER = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

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
  { className: 'basis', properties: ['flex-basis'] },
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

const utilityRule = (utility: UtilityDefinition, prefix = ''): string =>
  rule(`.sp-${prefix}${utility.className}`, utility.declarations);

const buildResponsiveLayoutBlock = (breakpoint: string): string => {
  const value = breakpoints[breakpoint];
  const rules = [...LAYOUT_UTILITIES, ...AUTO_MARGIN_UTILITIES].map((utility) =>
    utilityRule(utility, `${breakpoint}-`),
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

const colorAxisRules = (name: string, variable: string): string[] => [
  rule(`.sp-text-${name}`, [`color: var(${variable});`]),
  rule(`.sp-bg-${name}`, [`background-color: var(${variable});`]),
  rule(`.sp-border-${name}`, [`border-color: var(${variable});`]),
];

const buildSemanticColorRules = (): string[] => [
  ...[...semanticColorSteps].flatMap(([scale, steps]) =>
    steps.flatMap((step) =>
      colorAxisRules(`color-${scale}-${step}`, `--sp-color-${scale}-${step}`),
    ),
  ),
  ...SINGLE_VALUE_COLORS.flatMap((color) => colorAxisRules(color, `--sp-color-${color}`)),
];

const buildDurationRules = (): string[] =>
  durationSteps.map((step) =>
    rule(`.sp-duration-${step}`, [`transition-duration: var(--sp-duration-${step});`]),
  );

const buildEasingRules = (): string[] =>
  easingSteps.map((step) =>
    rule(`.sp-ease-${step}`, [`transition-timing-function: var(--sp-easing-${step});`]),
  );

// Named border-style-*/border-width-* so they never collide with the
// existing `.sp-border-none` (border: none) layout utility.
const buildBorderStyleRules = (): string[] =>
  borderStyleSteps.map((step) =>
    rule(`.sp-border-style-${step}`, [`border-style: var(--sp-border-style-${step});`]),
  );

const buildBorderWidthRules = (): string[] =>
  borderWidthSteps.map((step) =>
    rule(`.sp-border-width-${step}`, [`border-width: var(--sp-border-width-${step});`]),
  );

const buildIconSizeRules = (): string[] =>
  iconSteps.map((step) =>
    rule(`.sp-icon-${step}`, [`width: var(--sp-icon-${step});`, `height: var(--sp-icon-${step});`]),
  );

const buildAspectRatioRules = (): string[] =>
  aspectRatioSteps.map((step) =>
    rule(`.sp-aspect-${step}`, [`aspect-ratio: var(--sp-aspect-ratio-${step});`]),
  );

const buildTrackingRules = (): string[] =>
  trackingSteps.map((step) =>
    rule(`.sp-tracking-${step}`, [`letter-spacing: var(--sp-tracking-${step});`]),
  );

const buildRadiusRules = (): string[] =>
  radiusSteps.map((step) => rule(`.sp-rounded-${step}`, [`border-radius: var(--sp-radius-${step});`]));

const buildShadowRules = (): string[] =>
  shadowSteps.map((step) => rule(`.sp-shadow-${step}`, [`box-shadow: var(--sp-shadow-${step});`]));

const buildShadowInsetRules = (): string[] =>
  shadowInsetSteps.map((step) =>
    rule(`.sp-shadow-inset-${step}`, [`box-shadow: var(--sp-shadow-inset-${step});`]),
  );

const buildOpacityRules = (): string[] =>
  opacitySteps.map((step) => rule(`.sp-opacity-${step}`, [`opacity: var(--sp-opacity-${step});`]));

const buildZIndexRules = (): string[] =>
  zIndexSteps.map((step) => rule(`.sp-z-${step}`, [`z-index: var(--sp-z-index-${step});`]));

const buildFontWeightRules = (): string[] =>
  fontWeights.map((weight) => rule(`.sp-font-${weight}`, [`font-weight: ${weight};`]));

// Thick borders on --sp-border-width-thick. They default to the divider
// color and take any sp-border-{color} utility, which is emitted later in
// this file and so wins on source order. No responsive variants, which would
// land after the color utilities and override the chosen color.
const BORDER_THICK_SIDES = [
  { suffix: '', prefix: 'border' },
  { suffix: '-t', prefix: 'border-top' },
  { suffix: '-r', prefix: 'border-right' },
  { suffix: '-b', prefix: 'border-bottom' },
  { suffix: '-l', prefix: 'border-left' },
] as const;

const buildBorderThickRules = (): string[] =>
  BORDER_THICK_SIDES.map(({ suffix, prefix }) =>
    rule(`.sp-border-thick${suffix}`, [
      `${prefix}-width: var(--sp-border-width-thick);`,
      `${prefix}-style: solid;`,
      `${prefix}-color: var(--sp-surface-divider);`,
    ]),
  );

// Background utilities bound to the surface roles, so a band can sit on
// surface.subtle (or any role) without the palette scale. surface.hero is a
// gradient, so it goes on background-image.
const buildSurfaceBackgroundRules = (): string[] =>
  surfaceRoles.map((role) =>
    rule(`.sp-bg-surface-${role}`, [
      role === 'hero'
        ? `background-image: var(--sp-surface-${role});`
        : `background-color: var(--sp-surface-${role});`,
    ]),
  );

// component.chart (spectre-tokens 4.12.0): text/bg/border plus SVG fill and
// stroke, so a chart drawn in SVG or canvas-backed HTML takes token colors.
const buildChartColorRules = (): string[] =>
  chartRoles.flatMap((role) => [
    ...colorAxisRules(`chart-${role}`, `--sp-chart-${role}`),
    rule(`.sp-fill-chart-${role}`, [`fill: var(--sp-chart-${role});`]),
    rule(`.sp-stroke-chart-${role}`, [`stroke: var(--sp-chart-${role});`]),
  ]);

// Semantic elevation levels (spectre-tokens 4.12.0) pair shadow, surface,
// and stacking order, so one class picks a level instead of three.
const buildElevationRules = (): string[] =>
  elevationLevels.map((level) =>
    rule(`.sp-elevation-${level}`, [
      `background-color: var(--sp-elevation-${level}-surface);`,
      `box-shadow: var(--sp-elevation-${level}-shadow);`,
      `z-index: var(--sp-elevation-${level}-z-index);`,
    ]),
  );

const sections: string[] = [];

sections.push(LAYOUT_UTILITIES.map((utility) => utilityRule(utility)).join('\n\n'));
sections.push(AUTO_MARGIN_UTILITIES.map((utility) => utilityRule(utility)).join('\n\n'));
sections.push(buildBorderThickRules().join('\n\n'));
sections.push(buildSurfaceBackgroundRules().join('\n\n'));
sections.push(buildBaseSpacingRules().join('\n\n'));
sections.push(buildAspectRatioRules().join('\n\n'));
sections.push(buildTrackingRules().join('\n\n'));
sections.push(buildPaletteRules().join('\n\n'));
sections.push(buildSemanticColorRules().join('\n\n'));
sections.push(buildRadiusRules().join('\n\n'));
sections.push(buildShadowRules().join('\n\n'));
sections.push(buildShadowInsetRules().join('\n\n'));
sections.push(buildOpacityRules().join('\n\n'));
sections.push(buildZIndexRules().join('\n\n'));
sections.push(buildFontWeightRules().join('\n\n'));
sections.push(buildDurationRules().join('\n\n'));
sections.push(buildEasingRules().join('\n\n'));
sections.push(buildBorderStyleRules().join('\n\n'));
sections.push(buildBorderWidthRules().join('\n\n'));
sections.push(buildIconSizeRules().join('\n\n'));
sections.push(buildChartColorRules().join('\n\n'));
sections.push(buildElevationRules().join('\n\n'));

for (const breakpoint of RESPONSIVE_BREAKPOINT_ORDER) {
  sections.push(buildResponsiveSpacingBlock(breakpoint));
  sections.push(buildResponsiveLayoutBlock(breakpoint));
}

const banner = [
  '/* This file is generated by scripts/build-utilities.ts. Do not hand-edit. */',
  '/* Regenerate with `npm run build:utilities` after a spectre-tokens bump. */',
].join('\n');

const output = `${banner}\n\n@layer base, components, utilities;\n\n@layer utilities {\n${sections.join('\n\n')}\n}\n`;

fs.writeFileSync(outputPath, output, 'utf8');

console.log(
  `Generated ${outputPath.replace(`${projectRoot}/`, '')}: ` +
    `${spaceSteps.length} space steps, ${aspectRatioSteps.length} aspect-ratio steps, ` +
    `${trackingSteps.length} tracking steps, ` +
    `${paletteHues.size} palette hues, ${SEMANTIC_COLOR_SCALES.length} semantic color scales, ` +
    `${radiusSteps.length} radius steps, ${shadowSteps.length} shadow steps, ` +
    `${shadowInsetSteps.length} inset shadow steps, ` +
    `${opacitySteps.length} opacity roles, ${zIndexSteps.length} z-index roles, ` +
    `${fontWeights.length} font weights, ${durationSteps.length} durations, ` +
    `${easingSteps.length} easings, ${borderStyleSteps.length} border styles, ` +
    `${borderWidthSteps.length} border widths, ${iconSteps.length} icon sizes, ` +
    `${surfaceRoles.length} surface backgrounds, ${BORDER_THICK_SIDES.length} thick borders, ` +
    `${chartRoles.length} chart color roles, ${elevationLevels.length} elevation levels, ` +
    `${LAYOUT_UTILITIES.length + AUTO_MARGIN_UTILITIES.length} layout utilities, ` +
    `${RESPONSIVE_BREAKPOINT_ORDER.length} responsive breakpoints.`,
);
