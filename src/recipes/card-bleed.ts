import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const CARD_BLEED_EDGE_ORDER = ['top', 'right', 'bottom', 'left'] as const

const CARD_BLEED_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true
} as const

const CARD_BLEED_PADDING_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

export type CardBleedEdge = keyof typeof CARD_BLEED_EDGES
export type CardBleedPaddingSize = keyof typeof CARD_BLEED_PADDING_SIZES

export interface CardBleedRecipeOptions {
  /**
   * Which card edge(s) this child should run flush through. Pass a single
   * edge, an array of edges, or `'all'` for every edge. Corner radius is
   * only added where two bled edges meet, so a single-edge bleed stays
   * square. Omission is neutral and bleeds no edge.
   */
  edges?: CardBleedEdge | readonly CardBleedEdge[] | 'all'
  /**
   * The active card padding step this child is escaping. Mirrors
   * `CardRecipeOptions['padded']`: `true`/`'md'` share the legacy step,
   * `'sm'`/`'lg'` opt into the matching step. Omission produces zero bleed
   * margin, which is correct for an unpadded card — corner radius from
   * `edges` still applies.
   */
  padded?: boolean | CardBleedPaddingSize
}

export function getCardBleedClasses(opts: CardBleedRecipeOptions = {}): string {
  const { edges: edgesInput, padded } = opts

  const requestedEdges: readonly string[] =
    edgesInput === undefined
      ? []
      : edgesInput === 'all'
        ? CARD_BLEED_EDGE_ORDER
        : Array.isArray(edgesInput)
          ? edgesInput
          : [edgesInput]

  const resolvedEdges = new Set(
    requestedEdges.map((edge) =>
      resolveOption({
        name: 'card bleed edge',
        value: edge as CardBleedEdge,
        allowed: CARD_BLEED_EDGES,
        fallback: 'top'
      })
    )
  )

  const edgeClasses = CARD_BLEED_EDGE_ORDER.filter((edge) =>
    resolvedEdges.has(edge)
  ).map((edge) => `sp-card__bleed--${edge}`)

  let paddedClass: string | false = false
  if (padded === true) {
    paddedClass = 'sp-card__bleed--padded'
  } else if (typeof padded === 'string') {
    const paddedSize = resolveOption({
      name: 'card bleed padded size',
      value: padded,
      allowed: CARD_BLEED_PADDING_SIZES,
      fallback: 'md'
    })
    paddedClass =
      paddedSize === 'md'
        ? 'sp-card__bleed--padded'
        : `sp-card__bleed--padded-${paddedSize}`
  }

  return cx('sp-card__bleed', ...edgeClasses, paddedClass)
}
