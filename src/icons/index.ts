// `@phcdevworks/spectre-ui/icons`: the Lucide icon set as plain SVG data.
// Each icon is an `IconNode`, a list of `[tag, attributes]` children for an
// `<svg>` that uses `iconAttributes`. Nothing here touches the DOM or a
// framework; adapters render the nodes themselves.
export type { IconNode, SVGProps as IconAttributes } from 'lucide'

export * from './icons.generated'
