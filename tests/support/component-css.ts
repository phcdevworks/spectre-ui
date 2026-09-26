import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const componentsCss = fs.readFileSync(
  path.join(__dirname, '..', '..', 'dist', 'components.css'),
  'utf8'
)

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const expectTokenizedClassString = (result: string): void => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(new Set(tokens).size).toBe(tokens.length)
}

/**
 * Asserts every `sp-*` class a recipe can emit has a selector in the built
 * components bundle, so recipes never hand out classes with no styling.
 */
export const expectRecipeClassesStyled = (classStrings: string[]): void => {
  const classNames = new Set(
    classStrings
      .flatMap((value) => value.split(/\s+/))
      .filter((name) => name.startsWith('sp-'))
  )

  for (const className of classNames) {
    expect(
      componentsCss,
      `no selector for .${className} in dist/components.css`
    ).toMatch(new RegExp(String.raw`\.${escapeRegex(className)}(?=[\s{,:.\[>)])`))
  }
}
