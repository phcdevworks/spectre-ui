import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getAspectRatioClasses,
  getBorderClasses,
  getChartColorClasses,
  getColorClasses,
  getContainerClasses,
  getFooterClasses,
  getNavClasses,
  getDividerClasses,
  getGridClasses,
  getLinkClasses,
  getProseClasses,
  getSectionClasses,
  getSectionHeadClasses,
  getSectionHeadLeadClasses,
  getSectionHeadTitleClasses,
  getStackClasses,
  getElevationClasses,
  getIconSizeClasses,
  getLayoutClasses,
  getMotionClasses,
  getOpacityClasses,
  getPaletteClasses,
  getShadowClasses,
  getSpacingClasses,
  getSurfaceClasses,
  getTextClasses,
  getZIndexClasses,
  spectreDensityModes,
  spectreThemeModes,
  type LayoutValues,
  type SpacingValues
} from '../src/index'
import { LAYOUT_AXES } from '../src/recipes/layout'
import * as scales from '../src/internal/utility-scales.generated'

// Framework adapters (spectre-ui-astro, spectre-components) can only wrap
// recipes. Every class in the generated, token-derived utility layer must be
// reachable through a recipe; this test fails the moment a new token scale
// or utility ships as CSS only.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const generatedCss = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'styles', 'utilities.generated.css'),
  'utf8'
)

const generatedClasses = new Set(
  Array.from(generatedCss.matchAll(/^\s*\.(sp-[a-z0-9-]+)\s*\{/gm), (m) => m[1])
)

// Same tokens as a class a recipe does emit; kept for plain-HTML use.
const EQUIVALENT_CLASSES: Record<string, string> = {
  'sp-bg-surface-input': 'getSurfaceClasses emits sp-surface--input (same token)',
  'sp-bg-surface-inverse': 'getSurfaceClasses emits sp-surface--inverse (same token)',
  'sp-bg-surface-hero': 'getSurfaceClasses emits sp-surface--hero (same token)'
}

const reachable = new Set<string>()
const add = (classes: string): void => {
  for (const name of classes.split(/\s+/)) if (name) reachable.add(name)
}

const breakpoints = [undefined, ...scales.RESPONSIVE_BREAKPOINTS]

// Spacing, every axis × step, base and every breakpoint.
const spacingKeys: Record<string, keyof SpacingValues> = {
  'gap-x': 'gapX',
  'gap-y': 'gapY'
}
for (const axis of scales.SPACING_AXES) {
  const key = spacingKeys[axis] ?? (axis as keyof SpacingValues)
  const values: Array<string | number> = scales.SPACE_STEPS.map(Number)
  if (axis.startsWith('m')) values.push('auto')
  for (const value of values) {
    for (const bp of breakpoints) {
      const set = { [key]: value } as SpacingValues
      add(getSpacingClasses(bp ? { [bp]: set } : set))
    }
  }
}

// Layout, every axis × value, base and every breakpoint.
for (const [axis, map] of Object.entries(LAYOUT_AXES)) {
  for (const raw of Object.keys(map)) {
    const value = raw === 'true' ? true : raw === 'false' ? false : raw
    for (const bp of breakpoints) {
      const set = { [axis]: value } as LayoutValues
      add(getLayoutClasses(bp ? { [bp]: set } : set))
    }
  }
}

for (const property of ['text', 'bg', 'border'] as const) {
  for (const color of [...scales.SEMANTIC_COLORS, ...scales.SINGLE_COLORS]) {
    add(getColorClasses({ [property]: color }))
  }
  for (const color of scales.PALETTE_COLORS) {
    add(getPaletteClasses({ [property]: color }))
  }
}

for (const surface of scales.SURFACE_ROLES) add(getSurfaceClasses({ surface }))
for (const role of scales.CHART_ROLES) {
  add(getChartColorClasses({ fill: role, stroke: role, bg: role, text: role, border: role }))
}
for (const level of scales.ELEVATION_LEVELS) add(getElevationClasses({ level }))
for (const radius of scales.RADIUS_STEPS) add(getBorderClasses({ radius }))
for (const style of scales.BORDER_STYLE_STEPS) add(getBorderClasses({ style }))
for (const width of scales.BORDER_WIDTH_STEPS) add(getBorderClasses({ width }))
for (const thick of ['all', 't', 'r', 'b', 'l'] as const) add(getBorderClasses({ thick }))
for (const shadow of scales.SHADOW_STEPS) add(getShadowClasses({ shadow }))
for (const inset of scales.SHADOW_INSET_STEPS) add(getShadowClasses({ inset }))
for (const role of scales.OPACITY_STEPS) add(getOpacityClasses({ role }))
for (const layer of scales.Z_INDEX_STEPS) add(getZIndexClasses({ layer }))
for (const size of scales.ICON_STEPS) add(getIconSizeClasses({ size }))
for (const ratio of scales.ASPECT_RATIO_STEPS) add(getAspectRatioClasses({ ratio }))
for (const tracking of scales.TRACKING_STEPS) add(getTextClasses({ tracking }))
for (const step of scales.FONT_SIZE_STEPS) {
  add(getTextClasses({ fontSize: Number(step) as never }))
}
for (const weight of scales.FONT_WEIGHTS) {
  add(getTextClasses({ weight: Number(weight) as never }))
}
for (const duration of scales.DURATION_STEPS) add(getMotionClasses({ duration }))
for (const easing of scales.EASING_STEPS) add(getMotionClasses({ easing }))

// Hand-written utilities.css: every layout and semantic recipe over every
// value it accepts, including the { base, md, lg } responsive forms.
const responsive = <T,>(value: T): Array<T | { base?: T; md?: T; lg?: T }> => [
  value,
  { base: value },
  { md: value },
  { lg: value }
]
const gaps = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const
for (const direction of ['vertical', 'horizontal'] as const) {
  for (const gap of gaps) add(getStackClasses({ direction, gap }))
}
add(getStackClasses({ basis: 'sidebar' }))
for (const align of ['center', 'stretch'] as const) add(getStackClasses({ align }))
for (const gap of gaps) {
  add(getSectionClasses({ spacing: gap, gap }))
  add(getContainerClasses({ padding: gap }))
}
for (const hero of ['sm', 'md', 'lg'] as const) add(getSectionClasses({ hero }))
add(getSectionClasses({ attached: true }))
for (const maxWidth of ['prose', 'wide'] as const) add(getContainerClasses({ maxWidth }))
for (const layout of ['stacked', 'split'] as const) {
  for (const align of ['start', 'center'] as const) add(getSectionHeadClasses({ layout, align }))
}
add(getSectionHeadTitleClasses())
add(getSectionHeadLeadClasses())
add(getProseClasses({ accentMarkers: true }))
add(getProseClasses())
add(getLinkClasses({ tone: 'onInverse' }))
add(getDividerClasses())
add(getSurfaceClasses({ hover: true, selected: true, active: true }))
add(getTextClasses({ tabularNums: true, balance: true }))
for (const decoration of ['thin', 'base', 'thick'] as const) add(getTextClasses({ decoration }))
for (const underlineOffset of ['sm', 'md', 'lg'] as const) add(getTextClasses({ underlineOffset }))
for (const shadow of ['soft', 'strong'] as const) add(getShadowClasses({ shadow }))
for (const animation of ['fadeIn', 'fadeOut', 'slideUp', 'slideDown', 'scaleIn', 'bounce', 'pulse', 'shake'] as const) {
  add(getMotionClasses({ animation }))
}
for (const transition of ['all', 'colors', 'opacity', 'transform', 'none'] as const) {
  add(getMotionClasses({ transition }))
}
const gridColumns = [1, 2, 3, 4, 6, 12, 'auto'] as const
const gridSpans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'full'] as const
const gridOffsets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const
const gridStarts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
const gridOrders = ['first', 'last', 'none', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
const leadingWeights = [1.5, 1.6, 2, 2.5, 3] as const
for (const columns of [1, 2, 3, 4, 6, 12] as const) {
  add(getGridClasses({ columns: { md: columns, lg: columns } }))
}
add(getNavClasses())
add(getFooterClasses())
add(getTextClasses({ variant: 'onInverse' }))
for (const columns of gridColumns) {
  add(getGridClasses({ columns }))
  // Leading tracks size against a column count; `auto` has none.
  if (columns === 'auto') continue
  for (const weight of leadingWeights) {
    for (const w of responsive(weight)) add(getGridClasses({ columns, leadingTracks: { weight: w } }))
  }
}
for (const gap of gaps) add(getGridClasses({ gap, columnGap: gap, rowGap: gap }))
for (const align of ['start', 'center', 'end', 'baseline', 'stretch'] as const) {
  add(getGridClasses({ align }))
}
for (const span of gridSpans) {
  for (const s of responsive(span)) add(getGridClasses({ span: s, rowSpan: s }))
}
for (const offset of gridOffsets) {
  for (const o of responsive(offset)) add(getGridClasses({ offset: o, rowOffset: o }))
}
for (const start of gridStarts) {
  for (const s of responsive(start)) add(getGridClasses({ colStart: s }))
}
for (const order of gridOrders) {
  for (const o of responsive(order)) add(getGridClasses({ order: o }))
}
for (const count of [1, 2, 3, 4] as const) {
  add(getGridClasses({ fixedTracks: { count } }))
  for (const c of responsive(count)) {
    add(getGridClasses({ explicitTemplate: { template: 'fluid-fixed', count: c } }))
    add(getGridClasses({ explicitTemplate: { template: { base: 'fluid-fixed', md: 'fluid-fixed', lg: 'fluid-fixed' }, count: c } }))
  }
}
for (const weight of leadingWeights) {
  for (const w of responsive(weight)) {
    add(getGridClasses({ explicitTemplate: { template: 'label-fluid-fluid', weight: w } }))
    add(getGridClasses({ explicitTemplate: { template: { base: 'label-fluid-fluid', md: 'label-fluid-fluid', lg: 'label-fluid-fluid' }, weight: w } }))
  }
}
for (const t of responsive('edge-fluid-edge' as const)) {
  add(getGridClasses({ explicitTemplate: { template: t } }))
}

const handWrittenCss = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'styles', 'utilities.css'),
  'utf8'
)
const handWrittenClasses = new Set(
  Array.from(handWrittenCss.matchAll(/\.(sp-[a-z0-9_-]+)/g), (m) => m[1])
)

describe('hand-written utilities.css → recipe parity', () => {
  it('reaches every hand-written utility class through a recipe', () => {
    const unreachable = [...handWrittenClasses].filter((name) => !reachable.has(name))
    expect(
      unreachable,
      `utilities.css classes no recipe can emit:\n${unreachable.join('\n')}`
    ).toEqual([])
  })
})

describe('attribute modes → typed exports', () => {
  it('exports every theme and density mode spectre-tokens publishes', () => {
    const tokensCss = fs.readFileSync(
      path.join(__dirname, '..', 'node_modules', '@phcdevworks', 'spectre-tokens', 'dist', 'index.css'),
      'utf8'
    )
    const published = (attribute: string): string[] =>
      [...new Set(Array.from(
        tokensCss.matchAll(new RegExp(`\\[data-spectre-${attribute}="([a-z-]+)"\\]`, 'g')),
        (m) => m[1]
      ))].sort()
    expect([...spectreThemeModes].sort()).toEqual(published('theme'))
    expect([...spectreDensityModes].sort()).toEqual(published('density'))
    expect(spectreThemeModes.length).toBeGreaterThan(0)
  })
})

describe('generated utility layer → recipe parity', () => {
  it('has a generated class set to check', () => {
    expect(generatedClasses.size).toBeGreaterThan(4000)
  })

  it('reaches every generated utility class through a recipe', () => {
    const unreachable = [...generatedClasses].filter(
      (name) => !reachable.has(name) && !(name in EQUIVALENT_CLASSES)
    )
    expect(
      unreachable,
      `Generated utilities no recipe can emit:\n${unreachable.join('\n')}`
    ).toEqual([])
  })

  it('only emits classes that exist in the generated layer or the hand-written CSS', () => {
    const stylesDir = path.join(__dirname, '..', 'src', 'styles')
    const allCss = fs
      .readdirSync(stylesDir)
      .filter((fileName) => fileName.endsWith('.css'))
      .map((fileName) => fs.readFileSync(path.join(stylesDir, fileName), 'utf8'))
      .join('\n')
    // Default-modifier classes that intentionally carry no rule of their own.
    const ruleless = new Set(['sp-section-head--stacked'])
    const missing = [...reachable].filter(
      (name) => !ruleless.has(name) && !new RegExp(`\\.${name}[\\s{:.,)]`).test(allCss)
    )
    expect(missing).toEqual([])
  })

  it('keeps the equivalence list free of stale entries', () => {
    for (const name of Object.keys(EQUIVALENT_CLASSES)) {
      expect(generatedClasses.has(name), `${name} is no longer generated`).toBe(true)
      expect(reachable.has(name), `${name} is now reachable; drop it`).toBe(false)
    }
  })
})
