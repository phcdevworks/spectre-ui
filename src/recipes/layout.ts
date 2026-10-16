import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import { RESPONSIVE_BREAKPOINTS } from '../internal/utility-scales.generated'

// Option value → generated layout utility (`sp-{class}`, and
// `sp-{bp}-{class}` inside a breakpoint block).
export const LAYOUT_AXES = {
  display: {
    block: 'block',
    inlineBlock: 'inline-block',
    inline: 'inline',
    flex: 'flex',
    inlineFlex: 'inline-flex',
    grid: 'grid',
    hidden: 'hidden'
  },
  direction: {
    row: 'flex-row',
    rowReverse: 'flex-row-reverse',
    col: 'flex-col',
    colReverse: 'flex-col-reverse'
  },
  wrap: {
    wrap: 'flex-wrap',
    wrapReverse: 'flex-wrap-reverse',
    nowrap: 'flex-nowrap'
  },
  flex: {
    '1': 'flex-1',
    auto: 'flex-auto',
    initial: 'flex-initial',
    none: 'flex-none'
  },
  grow: { true: 'grow', false: 'grow-0' },
  shrink: { true: 'shrink', false: 'shrink-0' },
  justify: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  },
  items: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  },
  content: {
    start: 'content-start',
    end: 'content-end',
    center: 'content-center',
    between: 'content-between',
    around: 'content-around',
    evenly: 'content-evenly',
    stretch: 'content-stretch'
  },
  self: {
    auto: 'self-auto',
    start: 'self-start',
    end: 'self-end',
    center: 'self-center',
    stretch: 'self-stretch',
    baseline: 'self-baseline'
  },
  position: {
    static: 'static',
    fixed: 'fixed',
    absolute: 'absolute',
    relative: 'relative',
    sticky: 'sticky'
  },
  inset: { all: 'inset-0', x: 'inset-x-0', y: 'inset-y-0' },
  top: { true: 'top-0' },
  right: { true: 'right-0' },
  bottom: { true: 'bottom-0' },
  left: { true: 'left-0' },
  width: { auto: 'w-auto', full: 'w-full', fit: 'w-fit' },
  minWidth: { '0': 'min-w-0', full: 'min-w-full' },
  maxWidth: { none: 'max-w-none', full: 'max-w-full' },
  height: { auto: 'h-auto', full: 'h-full', fit: 'h-fit' },
  minHeight: { '0': 'min-h-0', full: 'min-h-full' },
  maxHeight: { none: 'max-h-none', full: 'max-h-full' },
  overflow: {
    auto: 'overflow-auto',
    hidden: 'overflow-hidden',
    clip: 'overflow-clip',
    visible: 'overflow-visible',
    scroll: 'overflow-scroll'
  },
  overflowX: {
    auto: 'overflow-x-auto',
    hidden: 'overflow-x-hidden',
    scroll: 'overflow-x-scroll'
  },
  overflowY: {
    auto: 'overflow-y-auto',
    hidden: 'overflow-y-hidden',
    scroll: 'overflow-y-scroll'
  },
  whitespace: { normal: 'whitespace-normal', nowrap: 'whitespace-nowrap' },
  textAlign: { left: 'text-left', center: 'text-center', right: 'text-right' },
  objectFit: {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    scaleDown: 'object-scale-down'
  },
  objectPosition: {
    top: 'object-top',
    right: 'object-right',
    bottom: 'object-bottom',
    left: 'object-left',
    center: 'object-center'
  },
  aspect: { auto: 'aspect-auto' },
  /** A component-width border in `surface.divider` on one or all sides. */
  border: {
    all: 'border',
    t: 'border-t',
    r: 'border-r',
    b: 'border-b',
    l: 'border-l',
    none: 'border-none'
  },
  listStyle: { none: 'list-none', disc: 'list-disc', decimal: 'list-decimal' },
  listPosition: { inside: 'list-inside', outside: 'list-outside' }
} as const

type LayoutAxes = typeof LAYOUT_AXES
type LayoutAxis = keyof LayoutAxes
type AxisValue<A extends LayoutAxis> = [keyof LayoutAxes[A]] extends ['true']
  ? true
  : [keyof LayoutAxes[A]] extends ['true' | 'false']
    ? boolean
    : Extract<keyof LayoutAxes[A], string>

export type LayoutBreakpoint = (typeof RESPONSIVE_BREAKPOINTS)[number]
export type LayoutDisplay = AxisValue<'display'>
export type LayoutJustify = AxisValue<'justify'>
export type LayoutAlign = AxisValue<'items'>
export type LayoutPosition = AxisValue<'position'>
export type LayoutOverflow = AxisValue<'overflow'>

export type LayoutValues = { [A in LayoutAxis]?: AxisValue<A> }

/**
 * Base layout plus per-breakpoint overrides that apply from that breakpoint
 * up, e.g. `{ display: 'block', md: { display: 'flex', justify: 'between' } }`.
 */
export interface LayoutRecipeOptions extends LayoutValues {
  sm?: LayoutValues
  md?: LayoutValues
  lg?: LayoutValues
  xl?: LayoutValues
  '2xl'?: LayoutValues
}

const layoutClasses = (values: LayoutValues, prefix: string): string[] =>
  (Object.keys(LAYOUT_AXES) as LayoutAxis[]).flatMap((axis) => {
    const input = values[axis]
    if (input === undefined) return []
    const allowed = LAYOUT_AXES[axis] as Record<string, string>
    const key = resolveOption({
      name: `layout ${axis}`,
      value: String(input),
      allowed,
      fallback: Object.keys(allowed)[0] ?? ''
    })
    return [`sp-${prefix}${allowed[key]}`]
  })

export function getLayoutClasses(opts: LayoutRecipeOptions = {}): string {
  return cx(
    ...layoutClasses(opts, ''),
    ...RESPONSIVE_BREAKPOINTS.flatMap((breakpoint) => {
      const values = opts[breakpoint]
      return values ? layoutClasses(values, `${breakpoint}-`) : []
    })
  )
}
