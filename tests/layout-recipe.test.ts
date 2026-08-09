import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getContainerClasses,
  getFooterChipClasses,
  getFooterClasses,
  getFooterDividerClasses,
  getFooterHeadingClasses,
  getFooterLinkClasses,
  getFooterLinksClasses,
  getFooterMutedClasses,
  getFooterTextClasses,
  getGridClasses,
  getSectionClasses,
  getSidebarBackdropClasses,
  getSidebarClasses,
  getSidebarGroupClasses,
  getSidebarGroupSummaryClasses,
  getSidebarHeaderClasses,
  getSidebarLinkClasses,
  getSidebarToggleClasses,
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

  it('reserves sidebar width only at breakpoints.md and above', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    const sidebarBasisStart = css.indexOf('.sp-stack--basis-sidebar')
    const responsiveStart = css.indexOf(
      '@media (min-width: 768px)',
      sidebarBasisStart
    )
    const mobileBlock = css.slice(sidebarBasisStart, responsiveStart)
    const responsiveBlock = css.slice(responsiveStart)

    expect(mobileBlock).toContain('flex: 0 0 0')
    expect(mobileBlock).toContain('width: 0')
    expect(responsiveBlock).toContain(
      'flex: 0 0 var(--sp-layout-sidebar-width)'
    )
    expect(responsiveBlock).toContain('width: auto')
  })

  it('returns center align by default with no modifier class', () => {
    expect(getStackClasses({ align: 'center' })).toBe('sp-stack')
  })

  it('returns the stretch align modifier class', () => {
    expect(getStackClasses({ align: 'stretch' })).toBe(
      'sp-stack sp-stack--align-stretch'
    )
  })

  it('combines direction and align', () => {
    expect(
      getStackClasses({ direction: 'horizontal', align: 'stretch' })
    ).toBe('sp-hstack sp-stack--align-stretch')
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

  it('returns the auto equal-width column class', () => {
    expect(getGridClasses({ columns: 'auto' })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-auto'
    )
  })

  it('ships .sp-grid-cols-auto in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('.sp-grid-cols-auto {')
    expect(css).toContain('grid-template-columns: repeat(auto-fit, minmax(0, 1fr));')
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

  it('returns a base column span class', () => {
    expect(getGridClasses({ span: 2 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-col-span-2'
    )
  })

  it('returns the full-width span class', () => {
    expect(getGridClasses({ span: 'full' })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-col-span-full'
    )
  })

  it('returns per-breakpoint span classes', () => {
    expect(
      getGridClasses({ columns: 12, span: { base: 12, md: 6, lg: 4 } })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-12 sp-col-span-12 sp-md-col-span-6 sp-lg-col-span-4'
    )
  })

  it('omits span classes when span is not provided', () => {
    expect(getGridClasses({ columns: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-3'
    )
  })

  it('ships sp-col-span-* and responsive sp-{bp}-col-span-* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'full'].forEach((span) => {
      expect(css).toContain(`.sp-col-span-${span}`)
      expect(css).toContain(`.sp-md-col-span-${span}`)
      expect(css).toContain(`.sp-lg-col-span-${span}`)
    })
  })

  it('returns a base column offset class', () => {
    expect(getGridClasses({ offset: 2 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-col-offset-2'
    )
  })

  it('omits the offset class when offset is 0', () => {
    expect(getGridClasses({ offset: 0 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1'
    )
  })

  it('returns per-breakpoint offset classes', () => {
    expect(
      getGridClasses({ columns: 12, offset: { base: 0, md: 2, lg: 4 } })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-12 sp-md-col-offset-2 sp-lg-col-offset-4'
    )
  })

  it('combines span and offset classes', () => {
    expect(getGridClasses({ columns: 12, span: 6, offset: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-12 sp-col-span-6 sp-col-offset-3'
    )
  })

  it('omits offset classes when offset is not provided', () => {
    expect(getGridClasses({ columns: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-3'
    )
  })

  it('ships sp-col-offset-* and responsive sp-{bp}-col-offset-* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((offset) => {
      expect(css).toContain(`.sp-col-offset-${offset}`)
      expect(css).toContain(`.sp-md-col-offset-${offset}`)
      expect(css).toContain(`.sp-lg-col-offset-${offset}`)
    })
  })

  it('returns a fixed-track class and omits sp-grid-cols-* when fixedTracks is set', () => {
    expect(getGridClasses({ columns: 4, fixedTracks: { count: 2 } })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-fixed-tracks-2'
    )
  })

  it('ships sp-grid-fixed-tracks-* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;[1, 2, 3, 4].forEach((count) => {
      expect(css).toContain(`.sp-grid-fixed-tracks-${count}`)
    })
    expect(css).toContain('var(--sp-space-240)')
  })

  it('returns a leading-track class alongside sp-grid-cols-*', () => {
    expect(
      getGridClasses({ columns: 6, leadingTracks: { weight: 1.6 } })
    ).toBe('sp-grid sp-grid--gap-md sp-grid-cols-6 sp-lg-grid-leading-1_6-of-6')
  })

  it('ships sp-lg-grid-leading-{weight}-of-{columns} rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;[1, 2, 3, 4, 6, 12].forEach((columns) => {
      ;['1_5', '1_6', '2', '2_5', '3'].forEach((weight) => {
        expect(css).toContain(`.sp-lg-grid-leading-${weight}-of-${columns}`)
      })
    })
  })

  it('omits fixed-track and leading-track classes when not provided', () => {
    expect(getGridClasses({ columns: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-3'
    )
  })

  it('returns per-breakpoint leading-track classes', () => {
    expect(
      getGridClasses({
        columns: 4,
        leadingTracks: { weight: { base: 2, md: 2.5, lg: 3 } },
      })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-4 sp-grid-leading-2-of-4 sp-md-grid-leading-2_5-of-4 sp-lg-grid-leading-3-of-4'
    )
  })

  it('ships base and md sp-grid-leading-{weight}-of-{columns} rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;[1, 2, 3, 4, 6, 12].forEach((columns) => {
      ;['1_5', '1_6', '2', '2_5', '3'].forEach((weight) => {
        expect(css).toContain(`.sp-grid-leading-${weight}-of-${columns}`)
        expect(css).toContain(`.sp-md-grid-leading-${weight}-of-${columns}`)
      })
    })
  })

  it('returns independent columnGap and rowGap classes', () => {
    expect(
      getGridClasses({ columns: 3, columnGap: 'lg', rowGap: 'sm' })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid--column-gap-lg sp-grid--row-gap-sm sp-grid-cols-3'
    )
  })

  it('ships sp-grid--column-gap-* and sp-grid--row-gap-* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;['sm', 'md', 'lg'].forEach((gap) => {
      expect(css).toContain(`.sp-grid--column-gap-${gap}`)
      expect(css).toContain(`.sp-grid--row-gap-${gap}`)
    })
  })

  it('returns a base row span class', () => {
    expect(getGridClasses({ rowSpan: 2 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-row-span-2'
    )
  })

  it('returns per-breakpoint row span classes', () => {
    expect(
      getGridClasses({ rowSpan: { base: 1, md: 2, lg: 3 } })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-row-span-1 sp-md-row-span-2 sp-lg-row-span-3'
    )
  })

  it('returns a base row offset class and omits it when 0', () => {
    expect(getGridClasses({ rowOffset: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-row-offset-3'
    )
    expect(getGridClasses({ rowOffset: 0 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1'
    )
  })

  it('returns per-breakpoint row offset classes', () => {
    expect(
      getGridClasses({ rowOffset: { base: 0, md: 1, lg: 2 } })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-md-row-offset-1 sp-lg-row-offset-2'
    )
  })

  it('ships sp-row-span-*, sp-row-offset-*, and responsive sp-{bp}-row-* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'full'].forEach((span) => {
      expect(css).toContain(`.sp-row-span-${span}`)
      expect(css).toContain(`.sp-md-row-span-${span}`)
      expect(css).toContain(`.sp-lg-row-span-${span}`)
    })
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((offset) => {
      expect(css).toContain(`.sp-row-offset-${offset}`)
      expect(css).toContain(`.sp-md-row-offset-${offset}`)
      expect(css).toContain(`.sp-lg-row-offset-${offset}`)
    })
  })

  it('returns a base order class', () => {
    expect(getGridClasses({ order: 'first' })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-order-first'
    )
    expect(getGridClasses({ order: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-order-3'
    )
  })

  it('omits the order class when order is none', () => {
    expect(getGridClasses({ order: 'none' })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1'
    )
  })

  it('returns per-breakpoint order classes', () => {
    expect(
      getGridClasses({ order: { base: 'last', md: 2, lg: 'first' } })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-order-last sp-md-order-2 sp-lg-order-first'
    )
  })

  it('ships sp-order-*, responsive sp-{bp}-order-*, first/last/none rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;['first', 'last', 'none', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((order) => {
      expect(css).toContain(`.sp-order-${order}`)
      expect(css).toContain(`.sp-md-order-${order}`)
      expect(css).toContain(`.sp-lg-order-${order}`)
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

  it('stretches to full height once docked inline above breakpoints.md', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    const dockedBlock = css.slice(
      css.indexOf('@media (min-width: 768px)', css.indexOf('.sp-sidebar {'))
    )

    expect(dockedBlock).toContain('position: static')
    expect(dockedBlock).toContain('height: 100%')
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

  it('returns no child modifier class for the default parent level', () => {
    expect(getSidebarLinkClasses({ level: 'parent' })).toBe('sp-sidebar__link')
  })

  it('returns the child modifier class for nested links', () => {
    expect(getSidebarLinkClasses({ level: 'child' })).toBe(
      'sp-sidebar__link sp-sidebar__link--child'
    )
  })

  it('combines level with other modifiers', () => {
    expect(getSidebarLinkClasses({ level: 'child', active: true })).toBe(
      'sp-sidebar__link sp-sidebar__link--active sp-sidebar__link--child'
    )
  })
})

describe('getSidebarHeaderClasses', () => {
  it('returns the sidebar header class', () => {
    expect(getSidebarHeaderClasses()).toBe('sp-sidebar__header')
  })

  it('ships the sidebar header class in components.css, distinct from sidebar link', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('.sp-sidebar__header')
  })
})

describe('sidebar group helpers', () => {
  it('returns the collapsible group classes', () => {
    expect(getSidebarGroupClasses()).toBe('sp-sidebar__group')
    expect(getSidebarGroupSummaryClasses()).toBe('sp-sidebar__group-summary')
  })

  it('ships the native details open-state contract in components.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('.sp-sidebar__group-summary')
    expect(css).toContain(
      '.sp-sidebar__group[open] > .sp-sidebar__group-summary .sp-sidebar__group-icon'
    )
    expect(css).toContain('.sp-sidebar__group-content')
  })
})

describe('getSidebarBackdropClasses', () => {
  it('returns the backdrop class', () => {
    expect(getSidebarBackdropClasses()).toBe('sp-sidebar-backdrop')
  })
})

describe('getSidebarToggleClasses', () => {
  it('returns the toggle class', () => {
    expect(getSidebarToggleClasses()).toBe('sp-sidebar-toggle')
  })

  it('stacks above the sidebar backdrop z-index in components.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('--sp-component-sidebar-toggle-z-index: var(--sp-z-index-modal)')
    expect(css).toContain('z-index: var(--sp-component-sidebar-toggle-z-index)')
  })

  it('keeps the drawer above the backdrop and styles the toggle states', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain(
      '--sp-component-sidebar-z-index: var(--sp-z-index-overlay)'
    )
    expect(css).toContain(
      '--sp-component-sidebar-backdrop-z-index: var(--sp-z-index-fixed)'
    )
    expect(css).toContain('.sp-sidebar-toggle:hover')
    expect(css).toContain('.sp-sidebar-toggle:focus-visible')
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

  it('sizes component-footer roles from the independent --sp-footer-* contract, not Nav aliases', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('--sp-component-footer-bg: var(--sp-footer-bg)')
    expect(css).toContain('--sp-component-footer-text: var(--sp-footer-text)')
    expect(css).toContain('--sp-component-footer-heading: var(--sp-footer-heading)')
    expect(css).toContain('--sp-component-footer-muted: var(--sp-footer-muted)')
    expect(css).toContain('--sp-component-footer-link: var(--sp-footer-link)')
    expect(css).toContain('--sp-component-footer-link-hover: var(--sp-footer-link-hover)')
    expect(css).toContain('--sp-component-footer-border: var(--sp-footer-border)')
    expect(css).toContain('--sp-component-footer-divider: var(--sp-footer-divider)')
    expect(css).toContain('--sp-component-footer-chip-bg: var(--sp-footer-chip-bg)')
    expect(css).not.toContain('--sp-component-footer-bg: var(--sp-nav-bg)')
  })
})

describe('getFooterHeadingClasses', () => {
  it('returns the heading class', () => {
    expect(getFooterHeadingClasses()).toBe('sp-footer__heading')
  })
})

describe('getFooterTextClasses', () => {
  it('returns the text class', () => {
    expect(getFooterTextClasses()).toBe('sp-footer__text')
  })
})

describe('getFooterMutedClasses', () => {
  it('returns the muted class', () => {
    expect(getFooterMutedClasses()).toBe('sp-footer__muted')
  })
})

describe('getFooterLinksClasses', () => {
  it('returns the links wrapper class', () => {
    expect(getFooterLinksClasses()).toBe('sp-footer__links')
  })
})

describe('getFooterLinkClasses', () => {
  it('returns the default link class', () => {
    expect(getFooterLinkClasses()).toBe('sp-footer__link')
  })

  it('applies boolean flag modifiers', () => {
    const result = getFooterLinkClasses({
      active: true,
      disabled: true,
      hovered: true,
      focused: true,
    })

    expect(result).toContain('sp-footer__link--active')
    expect(result).toContain('sp-footer__link--disabled')
    expect(result).toContain('sp-footer__link--hover is-hover')
    expect(result).toContain('sp-footer__link--focus is-focus')
  })
})

describe('getFooterDividerClasses', () => {
  it('returns the divider class', () => {
    expect(getFooterDividerClasses()).toBe('sp-footer__divider')
  })
})

describe('getFooterChipClasses', () => {
  it('returns the default chip class', () => {
    expect(getFooterChipClasses()).toBe('sp-footer__chip')
  })

  it('applies boolean flag modifiers', () => {
    const result = getFooterChipClasses({
      disabled: true,
      hovered: true,
      focused: true,
    })

    expect(result).toContain('sp-footer__chip--disabled')
    expect(result).toContain('sp-footer__chip--hover is-hover')
    expect(result).toContain('sp-footer__chip--focus is-focus')
  })

  it('sizes the chip hit area from --sp-min-touch-target', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'components.css')
    const css = fs.readFileSync(cssPath, 'utf8')

    expect(css).toContain('.sp-footer__chip {')
    expect(css).toContain('width: var(--sp-min-touch-target)')
  })
})
