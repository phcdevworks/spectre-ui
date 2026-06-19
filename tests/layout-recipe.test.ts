import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getContainerClasses,
  getFooterClasses,
  getGridClasses,
  getSectionClasses,
  getSidebarBackdropClasses,
  getSidebarClasses,
  getSidebarLinkClasses,
  getStackClasses,
} from '@phcdevworks/spectre-ui'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('getContainerClasses', () => {
  it('returns the default container class', () => {
    expect(getContainerClasses()).toBe('sp-container')
  })

  it('returns the prose max-width modifier class', () => {
    expect(getContainerClasses({ maxWidth: 'prose' })).toBe(
      'sp-container sp-container--max-width-prose'
    )
  })
})

describe('getStackClasses', () => {
  it('returns the vertical stack class by default', () => {
    expect(getStackClasses()).toBe('sp-stack')
  })

  it('returns the horizontal stack class', () => {
    expect(getStackClasses({ direction: 'horizontal' })).toBe('sp-hstack')
  })

  it('returns the vertical stack class explicitly', () => {
    expect(getStackClasses({ direction: 'vertical' })).toBe('sp-stack')
  })

  it('returns the sidebar basis modifier class', () => {
    expect(getStackClasses({ basis: 'sidebar' })).toBe(
      'sp-stack sp-stack--basis-sidebar'
    )
  })

  it('combines direction and basis', () => {
    expect(getStackClasses({ direction: 'horizontal', basis: 'sidebar' })).toBe(
      'sp-hstack sp-stack--basis-sidebar'
    )
  })
})

describe('getSectionClasses', () => {
  it('returns the default section class', () => {
    expect(getSectionClasses()).toBe('sp-section')
  })
})

describe('getGridClasses', () => {
  it('returns the default 1-column, md-gap classes', () => {
    expect(getGridClasses()).toBe('sp-grid sp-grid--gap-md sp-grid-cols-1')
  })

  it('returns the requested column count class', () => {
    expect(getGridClasses({ columns: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-3'
    )
  })

  it('returns the requested gap class', () => {
    expect(getGridClasses({ columns: 4, gap: 'lg' })).toBe(
      'sp-grid sp-grid--gap-lg sp-grid-cols-4'
    )
  })

  it('ships responsive @media step-down rules in utilities.css for every column count', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('@media (min-width: 768px)')
    expect(css).toContain('@media (min-width: 1024px)')
    ;[1, 2, 3, 4, 6, 12].forEach((columns) => {
      expect(css).toContain(`.sp-grid-cols-${columns}`)
    })
  })
})

describe('getSidebarClasses', () => {
  it('returns the default sidebar class', () => {
    expect(getSidebarClasses()).toBe('sp-sidebar')
  })

  it('returns the bordered modifier class', () => {
    expect(getSidebarClasses({ bordered: true })).toBe(
      'sp-sidebar sp-sidebar--bordered'
    )
  })

  it('ships the data-sidebar-open interactive-state contract in components.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('@media (min-width: 768px)')
    expect(css).toContain('[data-sidebar-open="true"] .sp-sidebar')
    expect(css).toContain('[data-sidebar-open="true"] .sp-sidebar-backdrop')
  })
})

describe('getSidebarLinkClasses', () => {
  it('returns the default sidebar link class', () => {
    expect(getSidebarLinkClasses()).toBe('sp-sidebar__link')
  })

  it('returns the active modifier class', () => {
    expect(getSidebarLinkClasses({ active: true })).toBe(
      'sp-sidebar__link sp-sidebar__link--active'
    )
  })
})

describe('getSidebarBackdropClasses', () => {
  it('returns the backdrop class', () => {
    expect(getSidebarBackdropClasses()).toBe('sp-sidebar-backdrop')
  })
})

describe('getFooterClasses', () => {
  it('returns the default footer class', () => {
    expect(getFooterClasses()).toBe('sp-footer')
  })

  it('returns the bordered and fullWidth modifier classes', () => {
    expect(getFooterClasses({ bordered: true, fullWidth: true })).toBe(
      'sp-footer sp-footer--bordered sp-footer--full'
    )
  })
})
