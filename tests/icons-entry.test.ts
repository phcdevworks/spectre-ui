import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { describe, expect, it } from 'vitest'
import * as root from '@phcdevworks/spectre-ui'
import * as icons from '@phcdevworks/spectre-ui/icons'
import {
  House,
  Search,
  Settings,
  iconAliases,
  iconAttributes,
  lucideVersion,
  type IconNode
} from '@phcdevworks/spectre-ui/icons'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const require = createRequire(import.meta.url)
const packageJson = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
) as {
  dependencies: Record<string, string>
  peerDependencies?: Record<string, string>
  exports: Record<string, unknown>
}
const manifest = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'ui-contract.manifest.json'), 'utf8')
) as { iconEntrypoint: { subpath: string; exports: string[] } }
const snapshot = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'scripts', 'icon-snapshots', 'lucide.json'), 'utf8')
) as { version: string; names: string[] }

const isIconNode = (value: unknown): value is IconNode =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (child) =>
      Array.isArray(child) &&
      typeof child[0] === 'string' &&
      typeof child[1] === 'object' &&
      child[1] !== null
  )

// Test-only serializer, standing in for whatever an adapter renders with.
const toSvg = (node: IconNode): string => {
  const attrs = (record: Record<string, unknown>): string =>
    Object.entries(record)
      .map(([key, value]) => ` ${key}="${String(value)}"`)
      .join('')
  return `<svg${attrs(iconAttributes)}>${node
    .map(([tag, childAttrs]) => `<${tag}${attrs(childAttrs)}/>`)
    .join('')}</svg>`
}

describe('@phcdevworks/spectre-ui/icons', () => {
  it('exports real Lucide icons as SVG node data', () => {
    for (const icon of [House, Search, Settings]) {
      expect(isIconNode(icon)).toBe(true)
    }
    expect(House[0]).toEqual([
      'path',
      { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' }
    ])
    expect(toSvg(Search)).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg".*<circle /)
  })

  it('exports every snapshotted name, each one an icon node', () => {
    const exported = icons as Record<string, unknown>
    expect(snapshot.version).toBe(lucideVersion)
    for (const name of snapshot.names) {
      expect(isIconNode(exported[name]), `${name} is not an icon node`).toBe(true)
    }
  })

  it('keeps renamed icons as aliases of the same data', () => {
    const exported = icons as Record<string, unknown>
    expect(iconAliases.AlarmCheck).toBe('AlarmClockCheck')
    for (const [alias, target] of Object.entries(iconAliases)) {
      expect(exported[alias], alias).toBe(exported[target])
    }
  })

  it('carries Lucide’s root svg attributes', () => {
    expect(iconAttributes).toMatchObject({
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor'
    })
  })

  it('matches the contract manifest', () => {
    expect(manifest.iconEntrypoint.subpath).toBe('@phcdevworks/spectre-ui/icons')
    const exported = Object.keys(icons)
    for (const name of manifest.iconEntrypoint.exports) {
      expect(exported, name).toContain(name)
    }
    expect(exported.sort()).toEqual(
      [...manifest.iconEntrypoint.exports, ...snapshot.names].sort()
    )
  })

  it('ships no DOM or framework helpers', () => {
    const exported = icons as Record<string, unknown>
    for (const name of ['createIcons', 'createElement', 'icons']) {
      expect(exported[name], name).toBeUndefined()
    }
    for (const value of Object.values(exported)) {
      expect(typeof value).not.toBe('function')
    }
    expect(exported.iconSet).toMatchObject({ id: 'lucide', package: 'lucide' })
  })

  it('resolves through CommonJS require', () => {
    const cjs = require('@phcdevworks/spectre-ui/icons') as Record<string, unknown>
    expect(cjs.House).toEqual(House)
    expect(cjs.lucideVersion).toBe(lucideVersion)
  })
})

describe('icon packaging', () => {
  it('declares the ./icons subpath for types, import, and require', () => {
    expect(packageJson.exports['./icons']).toEqual({
      types: './dist/icons.d.ts',
      import: './dist/icons.js',
      require: './dist/icons.cjs'
    })
    for (const file of ['icons.js', 'icons.cjs', 'icons.d.ts']) {
      expect(fs.existsSync(path.join(projectRoot, 'dist', file)), file).toBe(true)
    }
  })

  it('pins lucide exactly and adds no framework runtime', () => {
    expect(packageJson.dependencies.lucide).toMatch(/^\d+\.\d+\.\d+$/)
    expect(Object.keys(packageJson.dependencies).sort()).toEqual([
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@mdi/js',
      '@phcdevworks/spectre-tokens',
      'lucide',
      'simple-icons'
    ])
    const lucidePackage = require('lucide/package.json') as {
      dependencies?: object
      peerDependencies?: object
    }
    expect(lucidePackage.dependencies ?? {}).toEqual({})
    expect(lucidePackage.peerDependencies ?? {}).toEqual({})
    for (const framework of ['react', 'vue', 'lit', 'astro', 'svelte']) {
      expect(packageJson.peerDependencies ?? {}).not.toHaveProperty(framework)
    }
  })

  it('keeps the catalog out of the root entry point', () => {
    expect(Object.keys(root)).not.toContain('House')
    for (const file of ['index.js', 'index.cjs']) {
      const built = fs.readFileSync(path.join(projectRoot, 'dist', file), 'utf8')
      expect(built, file).not.toContain('lucide')
    }
  })

  it('tree-shakes a production bundle down to the icons it imports', async () => {
    const bundle = async (contents: string): Promise<string> => {
      const result = await build({
        stdin: { contents, resolveDir: projectRoot, loader: 'js' },
        bundle: true,
        format: 'esm',
        minify: true,
        write: false,
        platform: 'neutral',
        mainFields: ['module', 'main']
      })
      return result.outputFiles[0].text
    }

    const one = await bundle(
      "import { House } from '@phcdevworks/spectre-ui/icons'; console.log(House)"
    )
    expect(one).toContain('M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8')
    expect(one).not.toContain(Search[0][1].d as string)
    expect(one.length).toBeLessThan(2048)

    const all = await bundle(
      "import * as i from '@phcdevworks/spectre-ui/icons'; console.log(i)"
    )
    expect(all.length).toBeGreaterThan(one.length * 100)
  })
})
