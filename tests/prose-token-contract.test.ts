import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const utilitiesCss = fs.readFileSync(
  path.join(__dirname, '..', 'dist', 'utilities.css'),
  'utf8'
)

describe('prose component.prose token contract', () => {
  it('colors editor content elements from the published prose tokens', () => {
    for (const token of [
      '--sp-prose-blockquote-border',
      '--sp-prose-blockquote-text',
      '--sp-prose-code-bg',
      '--sp-prose-code-text',
      '--sp-prose-code-block-bg',
      '--sp-prose-code-block-text',
      '--sp-prose-code-block-border',
      '--sp-prose-mark-bg',
      '--sp-prose-mark-text',
      '--sp-prose-hr'
    ]) {
      expect(utilitiesCss).toContain(`var(${token})`)
    }
  })

  it('styles inline code, code blocks, highlights, and rules', () => {
    for (const selector of [
      '.sp-prose :not(pre) > code',
      '.sp-prose pre',
      '.sp-prose mark',
      '.sp-prose hr'
    ]) {
      expect(utilitiesCss).toContain(selector)
    }
  })
})
