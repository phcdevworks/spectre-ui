import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// Framework adapters can only wrap recipes, so every sp-* class in the
// component and base bundles must be named by some recipe: as a literal, or
// as the fixed prefix of a template such as `sp-btn--${variant}`.
// tests/utility-recipe-parity.test.ts covers the utility bundles.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, '..', 'src')
const read = (...parts: string[]): string =>
  fs.readFileSync(path.join(srcDir, ...parts), 'utf8')

const css = ['components.css', 'base.css']
  .map((fileName) => read('styles', fileName))
  .join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '')
const cssClasses = new Set(
  Array.from(css.matchAll(/\.(sp-[a-z0-9_-]+)/g), (match) => match[1])
)

const recipeSource = ['recipes', 'internal']
  .flatMap((dir) =>
    fs
      .readdirSync(path.join(srcDir, dir))
      .filter((fileName) => fileName.endsWith('.ts'))
      .map((fileName) => read(dir, fileName))
  )
  .join('\n')
const literals = new Set(recipeSource.match(/sp-[a-z0-9_-]+/g) ?? [])
// `sp-${prefix}`-style templates name no fixed prefix, so they are skipped.
const templatePrefixes = Array.from(
  recipeSource.matchAll(/(sp-[a-z0-9_-]*)\$\{/g),
  (match) => match[1]
).filter((prefix) => prefix !== 'sp-')

describe('component and base CSS → recipe reachability', () => {
  it('names every component class in a recipe', () => {
    const unreachable = [...cssClasses].filter(
      (name) =>
        !literals.has(name) &&
        !templatePrefixes.some((prefix) => name.startsWith(prefix))
    )
    expect(
      unreachable,
      `component classes no recipe can emit:\n${unreachable.join('\n')}`
    ).toEqual([])
  })
})
