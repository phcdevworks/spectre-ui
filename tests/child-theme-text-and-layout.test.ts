import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import { describe, expect, it } from 'vitest'
import {
  getIconBoxClasses,
  getProseClasses,
  getSidebarGroupContentClasses,
  getSidebarGroupIconClasses,
  getSidebarGroupSummaryClasses,
  getSidebarToggleClasses
} from '@phcdevworks/spectre-ui'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(__dirname, '..', 'src', 'styles')
const parseStyles = (fileName: string): postcss.Root =>
  postcss.parse(fs.readFileSync(path.join(stylesDir, fileName), 'utf8'))

const componentsRoot = parseStyles('components.css')
const utilitiesRoot = parseStyles('utilities.css')

const declsFor = (
  root: postcss.Root,
  selector: string
): Record<string, string> => {
  const decls: Record<string, string> = {}
  let found = false
  root.walkRules((rule) => {
    if (rule.selector !== selector) return
    found = true
    rule.walkDecls((decl) => {
      decls[decl.prop] = decl.value
    })
  })
  expect(found, `no rule for ${selector}`).toBe(true)
  return decls
}

// Text roles spectre-base listed as sitting below --sp-min-text-size (16px).
describe('component text honours the minimum text size', () => {
  const cases: [postcss.Root, string][] = [
    [componentsRoot, '.sp-footer__heading'],
    [componentsRoot, '.sp-footer__text'],
    [componentsRoot, '.sp-footer__muted'],
    [componentsRoot, '.sp-footer__link'],
    [componentsRoot, '.sp-tabs__item'],
    [componentsRoot, '.sp-form-label'],
    [componentsRoot, '.sp-label'],
    [componentsRoot, '.sp-fieldset__legend'],
    [componentsRoot, '.sp-helper-text'],
    [componentsRoot, '.sp-error-message'],
    [componentsRoot, '.sp-table'],
    [componentsRoot, '.sp-table caption'],
    [componentsRoot, '.sp-accordion__header'],
    [componentsRoot, '.sp-accordion__panel'],
    [componentsRoot, '.sp-breadcrumb'],
    [utilitiesRoot, '.sp-prose figcaption'],
    [utilitiesRoot, '.sp-prose caption']
  ]

  for (const [root, selector] of cases) {
    it(`${selector} uses the md text preset`, () => {
      const decls = declsFor(root, selector)
      expect(decls['font-size']).toBe('var(--sp-font-md-size)')
      expect(decls['line-height']).toBe('var(--sp-font-md-line-height)')
    })
  }
})

describe('prose size option', () => {
  it('emits a size modifier only when asked', () => {
    expect(getProseClasses()).toBe('sp-prose')
    expect(getProseClasses({ size: 'lg' })).toBe('sp-prose sp-prose--lg')
    expect(getProseClasses({ size: 'xl', accentMarkers: true })).toBe(
      'sp-prose sp-prose--xl sp-prose--accent-markers'
    )
  })

  for (const size of ['md', 'lg', 'xl']) {
    it(`.sp-prose--${size} sets the ${size} font preset`, () => {
      expect(declsFor(utilitiesRoot, `.sp-prose--${size}`)).toEqual({
        'font-size': `var(--sp-font-${size}-size)`,
        'line-height': `var(--sp-font-${size}-line-height)`
      })
    })
  }
})

describe('icon box icon size option', () => {
  const iconSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const

  it('emits an icon size modifier only when asked', () => {
    expect(getIconBoxClasses()).not.toContain('sp-iconbox--icon-')
    expect(getIconBoxClasses({ iconSize: 'xl' })).toBe(
      'sp-iconbox sp-iconbox--primary sp-iconbox--md sp-iconbox--icon-xl'
    )
  })

  for (const size of iconSizes) {
    it(`.sp-iconbox--icon-${size} points the glyph at --sp-icon-${size}`, () => {
      expect(declsFor(componentsRoot, `.sp-iconbox--icon-${size}`)).toEqual({
        '--sp-component-iconbox-icon-size': `var(--sp-icon-${size})`
      })
    })
  }

  it('sizes svg and <i> glyphs from the icon size, 1em by default', () => {
    expect(
      declsFor(componentsRoot, '.sp-iconbox')['--sp-component-iconbox-icon-size']
    ).toBe('1em')
    for (const selector of ['.sp-iconbox svg', '.sp-iconbox > i']) {
      const decls = declsFor(componentsRoot, selector)
      expect(decls.width).toBe('var(--sp-component-iconbox-icon-size)')
      expect(decls.height).toBe('var(--sp-component-iconbox-icon-size)')
    }
  })
})

describe('nav and footer container seam', () => {
  it('fills the flex item, whether it is .sp-container or the <sp-container> host', () => {
    expect(
      declsFor(
        utilitiesRoot,
        ':where(.sp-nav, .sp-footer) > :where(.sp-container, sp-container)'
      )
    ).toEqual({ width: '100%' })
  })

  it('drops the nav/footer inline padding so the container keeps its own', () => {
    expect(
      declsFor(
        componentsRoot,
        '.sp-nav:has(> :where(.sp-container, sp-container)),\n  .sp-footer:has(> :where(.sp-container, sp-container))'
      )
    ).toEqual({ 'padding-inline': '0' })
  })
})

describe('sidebar group and toggle recipes', () => {
  it('reaches the group icon, group content, and forced states', () => {
    expect(getSidebarGroupIconClasses()).toBe('sp-sidebar__group-icon')
    expect(getSidebarGroupContentClasses()).toBe('sp-sidebar__group-content')
    expect(getSidebarGroupSummaryClasses()).toBe('sp-sidebar__group-summary')
    expect(getSidebarGroupSummaryClasses({ hovered: true, focused: true })).toBe(
      'sp-sidebar__group-summary is-hover is-focus'
    )
    expect(getSidebarToggleClasses({ focused: true })).toBe(
      'sp-sidebar-toggle is-focus'
    )
    for (const selector of [
      '.sp-sidebar__group-icon',
      '.sp-sidebar__group-content'
    ]) {
      declsFor(componentsRoot, selector)
    }
  })
})
