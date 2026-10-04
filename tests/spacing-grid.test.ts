import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(__dirname, '..', 'src', 'styles')

// Hand-authored recipe stylesheets. utilities.generated.css is exempt: it
// exposes the full published --sp-space-* scale by design.
const RECIPE_STYLESHEETS = ['components.css', 'utilities.css']

const SPACING_PROPERTY =
  /^(padding|margin|gap|row-gap|column-gap)(-[a-z]+)*$|^--sp-component-[a-z0-9-]*(padding|gap|margin)[a-z0-9-]*$/

// 8px layout grid (owner-confirmed 2026-10-03, see the spectre-tokens
// changelog). 4px is the in-component sub-step; nothing else is allowed.
const isOnGrid = (step: number): boolean => step === 0 || step === 4 || step % 8 === 0

describe('recipe spacing on the 8px grid', () => {
  it('uses only 0, 4, or multiples of 8 for recipe padding, margins, and gaps', () => {
    const violations: string[] = []
    let checked = 0

    for (const fileName of RECIPE_STYLESHEETS) {
      const root = postcss.parse(fs.readFileSync(path.join(stylesDir, fileName), 'utf8'))
      root.walkDecls((decl) => {
        if (!SPACING_PROPERTY.test(decl.prop)) return
        for (const match of decl.value.matchAll(/var\(--sp-space-([0-9]+)\)/g)) {
          checked += 1
          if (!isOnGrid(Number(match[1]))) {
            const selector = decl.parent?.type === 'rule' ? decl.parent.selector : '(at-rule)'
            violations.push(`${fileName} ${selector} { ${decl.prop}: ${decl.value} }`)
          }
        }
      })
    }

    expect(checked).toBeGreaterThan(100)
    expect(violations, `Off-grid spacing:\n${violations.join('\n')}`).toEqual([])
  })
})
