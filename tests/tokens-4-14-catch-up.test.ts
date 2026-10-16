import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { getTextClasses } from '../src/index'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const read = (...segments: string[]) =>
  fs.readFileSync(path.join(projectRoot, ...segments), 'utf8')

const componentsCss = read('src', 'styles', 'components.css')
const generatedCss = read('src', 'styles', 'utilities.generated.css')
const tokensCss = read(
  'node_modules',
  '@phcdevworks',
  'spectre-tokens',
  'dist',
  'index.css'
)

// spectre-tokens 4.14.0 moved every font step from lg up one size. Component
// rules that used a step directly were moved one step up to keep their size;
// only the sp-text--{step} presets track the step by name.
const PRESET_STEPS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl'
] as const

const rulesUsing = (step: string) =>
  [...componentsCss.matchAll(/([^{}]+)\{([^}]*)\}/g)]
    .filter(([, , body]) => body.includes(`var(--sp-font-${step}-`))
    .map(([, selector]) => selector.replace(/\/\*[\s\S]*?\*\//g, '').trim())

describe('spectre-tokens 4.14.0 catch-up', () => {
  it('ships a sp-text preset for every published font step', () => {
    for (const step of PRESET_STEPS) {
      expect(tokensCss).toContain(`--sp-font-${step}-size:`)
      expect(componentsCss).toContain(
        `.sp-text--${step} {\n    font-size: var(--sp-font-${step}-size);`
      )
      expect(getTextClasses({ size: step })).toBe(
        `sp-text sp-text--${step} sp-text--default`
      )
    }
  })

  it('keeps component font sizes by using the step above the old one', () => {
    expect(rulesUsing('lg')).toEqual(['.sp-text--lg'])
    expect(rulesUsing('xl')).toEqual(
      expect.arrayContaining(['.sp-btn--lg', '.sp-input--lg', '.sp-text--xl'])
    )
    expect(rulesUsing('7xl')).toEqual(
      expect.arrayContaining([
        '.sp-quote--accent-mark::before',
        '.sp-stat--xl .sp-stat__figure',
        '.sp-text--7xl'
      ])
    )
  })

  it('generates one sp-font-size utility per numeric font size', () => {
    const steps = [...tokensCss.matchAll(/--sp-font-size-([0-9]+):/g)].map(
      (match) => match[1]
    )

    expect(steps).toContain('18')
    for (const step of steps) {
      expect(generatedCss).toContain(
        `.sp-font-size-${step} {\n    font-size: var(--sp-font-size-${step});\n  }`
      )
    }
  })
})
