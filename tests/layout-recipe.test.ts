import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
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
  getProseClasses,
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

  // Regression for TODO.md "Shell — Nav And Footer Container Seam": sp-nav
  // and sp-footer are flex containers with their own inline padding, so a
  // nested sp-container needs an explicit width to fill that flex item and
  // must not stack a second inline inset on top of the nav/footer padding.
  it('fills the flex item and drops inline padding when nested inside sp-nav/sp-footer', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    const root = postcss.parse(css, { from: cssPath })

    let matchedRule: import('postcss').Rule | undefined
    root.walkRules((rule) => {
      if (rule.selector.includes('.sp-nav') && rule.selector.includes('> .sp-container')) {
        matchedRule = rule
      }
    })

    expect(matchedRule).toBeDefined()
    expect(matchedRule?.selector).toContain('.sp-footer')
    expect(matchedRule?.toString()).toContain('width: 100%')
    expect(matchedRule?.toString()).toContain('padding-inline: 0')
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

  it('returns md gap by default with no modifier class', () => {
    expect(getStackClasses({ gap: 'md' })).toBe('sp-stack')
  })

  it('returns the sm and lg gap modifier classes', () => {
    expect(getStackClasses({ gap: 'sm' })).toBe('sp-stack sp-stack--gap-sm')
    expect(getStackClasses({ gap: 'lg' })).toBe('sp-stack sp-stack--gap-lg')
  })

  it('combines direction and gap', () => {
    expect(
      getStackClasses({ direction: 'horizontal', gap: 'lg' })
    ).toBe('sp-hstack sp-stack--gap-lg')
  })

  // Regression for TODO.md "Stack — Gap Option On getStackClasses":
  // getGridClasses has gap/columnGap/rowGap options; getStackClasses had no
  // matching option, so a consumer had to reach for the generic sp-gap-*
  // utility name instead of a recipe-backed option, unlike every other
  // layout primitive.
  it('ships sp-stack--gap-sm/lg in @layer components, so sp-gap-* still wins by layer precedence', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    const root = postcss.parse(css, { from: cssPath })

    const layerOf = (selector: string): string | undefined => {
      let found: string | undefined
      root.walkRules(selector, (rule) => {
        let node: import('postcss').Container | import('postcss').Document | undefined = rule.parent
        while (node) {
          if (node.type === 'atrule' && (node as import('postcss').AtRule).name === 'layer') {
            found = (node as import('postcss').AtRule).params
            break
          }
          node = node.parent
        }
      })
      return found
    }

    expect(layerOf('.sp-stack--gap-sm')).toBe('components')
    expect(layerOf('.sp-stack--gap-lg')).toBe('components')
    expect(layerOf('.sp-gap-64')).toBe('utilities')
  })
})

describe('getSectionClasses', () => {
  it('returns the default section class', () => {
    expect(getSectionClasses()).toBe('sp-section')
  })
})

describe('getProseClasses', () => {
  it('returns the default prose class', () => {
    expect(getProseClasses()).toBe('sp-prose')
  })

  // Regression for TODO.md "Prose — Editor Content Recipe": raw editor HTML
  // (e.g. a WordPress the_content() call) gets no component treatment, so
  // the build's CSS reset and this package's own base-layer list reset
  // (spectre-ui@4.1.0) leave it with no list markers, no blockquote
  // treatment, and no flow spacing between top-level elements.
  it('ships list marker, blockquote, and flow-spacing rules scoped to .sp-prose in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    expect(css).toContain('.sp-prose > * + *')
    expect(css).toContain('.sp-prose ul')
    expect(css).toContain('.sp-prose ol')
    expect(css).toContain('list-style: disc')
    expect(css).toContain('list-style: decimal')
    expect(css).toContain('.sp-prose blockquote')
  })

  it('does not restyle headings or links, leaving that to the consuming theme', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    const root = postcss.parse(css, { from: cssPath })

    let hasHeadingRule = false
    let hasLinkRule = false
    root.walkRules((rule) => {
      if (!rule.selector.startsWith('.sp-prose')) return
      if (/\bh[1-6]\b/.test(rule.selector)) hasHeadingRule = true
      if (/\ba\b/.test(rule.selector)) hasLinkRule = true
    })

    expect(hasHeadingRule).toBe(false)
    expect(hasLinkRule).toBe(false)
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

  it('returns a base column start class', () => {
    expect(getGridClasses({ colStart: 4 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-1 sp-col-start-4'
    )
  })

  it('returns per-breakpoint column start classes', () => {
    expect(
      getGridClasses({ columns: 12, colStart: { md: 2, lg: 5 } })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-12 sp-md-col-start-2 sp-lg-col-start-5'
    )
  })

  // Regression for TODO.md "Grid — Cell Alignment And Column Start":
  // sp-col-offset-* shifts relative to natural position; sp-col-start-*
  // sets the absolute grid-column-start line, which offset cannot express.
  it('ships sp-col-start-* and responsive sp-{bp}-col-start-* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((start) => {
      expect(css).toContain(`.sp-col-start-${start} {\n    grid-column-start: ${start};`)
      expect(css).toContain(`.sp-md-col-start-${start} {\n      grid-column-start: ${start};`)
      expect(css).toContain(`.sp-lg-col-start-${start} {\n      grid-column-start: ${start};`)
    })
  })

  it('returns a grid alignment class', () => {
    expect(getGridClasses({ align: 'start' })).toBe(
      'sp-grid sp-grid--gap-md sp-grid--align-start sp-grid-cols-1'
    )
  })

  it('omits the alignment class when align is not provided', () => {
    expect(getGridClasses({ columns: 3 })).toBe(
      'sp-grid sp-grid--gap-md sp-grid-cols-3'
    )
  })

  // Regression for TODO.md "Grid — Cell Alignment And Column Start": the
  // generic sp-items-* utility already covers this CSS effect, but Grid's
  // own recipe API had no way to reach it directly, unlike gap/columnGap/
  // rowGap on the same recipe.
  it('ships sp-grid--align-* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;['start', 'center', 'end', 'baseline', 'stretch'].forEach((align) => {
      expect(css).toContain(`.sp-grid--align-${align}`)
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

  it('returns a template class and omits sp-grid-cols-* when explicitTemplate is set', () => {
    expect(
      getGridClasses({ columns: 3, explicitTemplate: { template: 'edge-fluid-edge' } })
    ).toBe('sp-grid sp-grid--gap-md sp-grid-template--edge-fluid-edge')
  })

  it('defaults label-fluid-fluid weight to 2 and honors an explicit weight', () => {
    expect(
      getGridClasses({ explicitTemplate: { template: 'label-fluid-fluid' } })
    ).toBe('sp-grid sp-grid--gap-md sp-grid-template--label-fluid-fluid-2')
    expect(
      getGridClasses({ explicitTemplate: { template: 'label-fluid-fluid', weight: 1.6 } })
    ).toBe('sp-grid sp-grid--gap-md sp-grid-template--label-fluid-fluid-1_6')
  })

  it('lets explicitTemplate override fixedTracks and leadingTracks', () => {
    expect(
      getGridClasses({
        columns: 4,
        fixedTracks: { count: 2 },
        leadingTracks: { weight: 2 },
        explicitTemplate: { template: 'edge-fluid-edge' },
      })
    ).toBe('sp-grid sp-grid--gap-md sp-grid-template--edge-fluid-edge')
  })

  it('ships sp-grid-template--* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    expect(css).toContain('.sp-grid-template--edge-fluid-edge')
    expect(css).toContain('grid-template-columns: auto 1fr auto;')
    ;['1_5', '1_6', '2', '2_5', '3'].forEach((weight) => {
      expect(css).toContain(`.sp-grid-template--label-fluid-fluid-${weight}`)
    })
  })

  it('accepts a { base, md, lg } explicitTemplate.template object for responsive templates', () => {
    expect(
      getGridClasses({
        explicitTemplate: {
          template: { md: 'edge-fluid-edge', lg: 'label-fluid-fluid' },
          weight: { lg: 1.6 },
        },
      })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-md-grid-template--edge-fluid-edge sp-lg-grid-template--label-fluid-fluid-1_6'
    )
  })

  it('omits sp-grid-cols-*/leading-track classes when only a responsive explicitTemplate is set', () => {
    expect(
      getGridClasses({
        columns: 3,
        leadingTracks: { weight: 2 },
        explicitTemplate: { template: { lg: 'edge-fluid-edge' } },
      })
    ).toBe('sp-grid sp-grid--gap-md sp-lg-grid-template--edge-fluid-edge')
  })

  // Regression for TODO.md "Grid — Responsive Explicit Template Variants":
  // every other Grid sizing option (columns, span, offset, order,
  // leading-track weight) ships md/lg responsive steps in the CSS bundle;
  // explicit-template previously had none, forcing the same asymmetric
  // shape at every width down to 375px.
  it('ships sp-md-grid-template--* and sp-lg-grid-template--* rules in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;['sp-md-', 'sp-lg-'].forEach((prefix) => {
      expect(css).toContain(`.${prefix}grid-template--edge-fluid-edge`)
      ;['1_5', '1_6', '2', '2_5', '3'].forEach((weight) => {
        expect(css).toContain(`.${prefix}grid-template--label-fluid-fluid-${weight}`)
      })
    })
  })

  it('defaults fluid-fixed count to 2 and honors an explicit count', () => {
    expect(
      getGridClasses({ explicitTemplate: { template: 'fluid-fixed' } })
    ).toBe('sp-grid sp-grid--gap-md sp-grid-template--fluid-fixed-2')
    expect(
      getGridClasses({ explicitTemplate: { template: 'fluid-fixed', count: 3 } })
    ).toBe('sp-grid sp-grid--gap-md sp-grid-template--fluid-fixed-3')
  })

  it('accepts a { base, md, lg } explicitTemplate.count object for responsive fluid-fixed counts', () => {
    expect(
      getGridClasses({
        explicitTemplate: {
          template: { md: 'fluid-fixed', lg: 'fluid-fixed' },
          count: { md: 2, lg: 4 },
        },
      })
    ).toBe(
      'sp-grid sp-grid--gap-md sp-md-grid-template--fluid-fixed-2 sp-lg-grid-template--fluid-fixed-4'
    )
  })

  // Regression for TODO.md "Grid — Fluid Plus Equal Fixed Tracks Template":
  // a comparison table wants one fluid label column plus N equal fixed
  // columns sized from the same --sp-space-240 step as fixedTracks, so
  // compared values sit in identical space.
  it('ships sp-grid-template--fluid-fixed-* rules (and md/lg variants) in utilities.css', () => {
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    ;['', 'sp-md-', 'sp-lg-'].forEach((prefix) => {
      ;[1, 2, 3, 4].forEach((count) => {
        const selector =
          prefix === ''
            ? `.sp-grid-template--fluid-fixed-${count}`
            : `.${prefix}grid-template--fluid-fixed-${count}`
        expect(css).toContain(selector)
      })
    })
    expect(css).toContain(
      'grid-template-columns: minmax(0, 1fr) repeat(2, minmax(0, var(--sp-space-240)));'
    )
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

  it('keeps sp-gap-*/sp-grid--*-gap-* utilities able to override sp-stack/sp-grid gap primitives', () => {
    // Regression for TODO.md "Layout — Spacing Utility Override Of Layout
    // Primitives": .sp-stack and .sp-grid--{,column-,row-}gap-* must live in
    // a weaker @layer than the standalone sp-gap-*/sp-column-gap-*/
    // sp-row-gap-* utility scale, so `class="sp-stack sp-gap-40"` (or the
    // grid equivalents) always resolves to the utility's value regardless of
    // source order in the bundle.
    const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
    const css = fs.readFileSync(cssPath, 'utf8')
    const root = postcss.parse(css, { from: cssPath })

    const layerNameFor = (selector: string): string | undefined => {
      let found: string | undefined
      root.walkRules(selector, (rule) => {
        let node: import('postcss').Container | import('postcss').Document | undefined = rule.parent
        while (node) {
          if (node.type === 'atrule' && (node as import('postcss').AtRule).name === 'layer') {
            found = (node as import('postcss').AtRule).params
            break
          }
          node = node.parent
        }
      })
      return found
    }

    const primitiveLayer = layerNameFor('.sp-stack')
    const utilityLayer = layerNameFor('.sp-gap-40')

    expect(primitiveLayer).toBe('components')
    expect(utilityLayer).toBe('utilities')

    const layerOrderMatch = css.match(/@layer\s+([^;{]+);/)
    expect(layerOrderMatch).not.toBeNull()
    const layerOrder = (layerOrderMatch?.[1] ?? '')
      .split(',')
      .map((name) => name.trim())

    expect(layerOrder.indexOf('components')).toBeGreaterThanOrEqual(0)
    expect(layerOrder.indexOf('utilities')).toBeGreaterThan(
      layerOrder.indexOf('components')
    )
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
