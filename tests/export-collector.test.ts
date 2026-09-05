import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { collectExports } from '../scripts/collect-exports'

const directories: string[] = []

function fixture(files: Record<string, string>): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'spectre-exports-'))
  directories.push(directory)
  for (const [name, source] of Object.entries(files)) {
    fs.writeFileSync(path.join(directory, name), source)
  }
  return path.join(directory, 'index.ts')
}

afterEach(() => {
  for (const directory of directories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

describe('TypeScript export inventory', () => {
  it('includes direct declarations, types, local aliases, and default exports', () => {
    const entry = fixture({
      'index.ts': `
        export const style = 'sp-example'
        export function recipe() { return style }
        export interface Options { disabled?: boolean }
        export type Size = 'sm' | 'lg'
        const local = 'local'
        export { local as alias }
        export default recipe
      `
    })
    expect(collectExports(entry)).toEqual(
      ['style', 'recipe', 'Options', 'Size', 'alias', 'default'].sort((a, b) => a.localeCompare(b))
    )
  })

  it('resolves star exports through cycles and excludes nested default exports', () => {
    const entry = fixture({
      'index.ts': `export * from './a.js'; export * from './b.js'`,
      'a.ts': `export * from './b.js'; export const first = 1; export default first`,
      'b.ts': `export * from './a.js'; export const second = 2`
    })
    expect(collectExports(entry)).toEqual(['first', 'second'])
  })

  it('includes type-only aliases and namespace exports', () => {
    const entry = fixture({
      'index.ts': `
        export type { Options as PublicOptions } from './recipe'
        export { type Size, recipe as publicRecipe } from './recipe'
        export * as recipes from './recipe'
      `,
      'recipe.ts': `
        export interface Options { disabled?: boolean }
        export type Size = 'sm' | 'lg'
        export function recipe() { return 'sp-example' }
      `
    })
    expect(collectExports(entry)).toEqual(
      ['PublicOptions', 'Size', 'publicRecipe', 'recipes'].sort((a, b) => a.localeCompare(b))
    )
  })

  it('ignores export-shaped comments and string literals', () => {
    const entry = fixture({
      'index.ts': `
        // export { removed } from './missing'
        /* export * from './also-missing' */
        const example = "export { imaginary } from './missing'"
        export { example }
      `
    })
    expect(collectExports(entry)).toEqual(['example'])
  })
})
