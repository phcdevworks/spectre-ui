import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const recipesDirectory = path.join(__dirname, '..', 'src', 'recipes')

describe('recipe boolean default ownership', () => {
  it('does not opt callers into boolean behavior when options are omitted', () => {
    const violations = fs
      .readdirSync(recipesDirectory)
      .filter((fileName) => fileName.endsWith('.ts'))
      .flatMap((fileName) => {
        const source = fs.readFileSync(path.join(recipesDirectory, fileName), 'utf8')
        const hasTrueInitializer = /\b[A-Za-z]\w*\s*=\s*true\b/.test(source)
        const hasTrueNullishFallback = /\?\?\s*true\b/.test(source)

        return hasTrueInitializer || hasTrueNullishFallback ? [fileName] : []
      })

    expect(violations).toEqual([])
  })
})
