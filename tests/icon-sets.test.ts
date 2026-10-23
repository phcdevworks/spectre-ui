import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { describe, expect, it } from 'vitest'
import { mdiHome } from '@phcdevworks/spectre-ui/icons/mdi'
import { siGithub } from '@phcdevworks/spectre-ui/icons/brands'
import { faHouse } from '@phcdevworks/spectre-ui/icons/fa-solid'
import { faHouse as faHouseRegular } from '@phcdevworks/spectre-ui/icons/fa-regular'
import { faGithub } from '@phcdevworks/spectre-ui/icons/fa-brands'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const require = createRequire(import.meta.url)
const manifest = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'ui-contract.manifest.json'), 'utf8')
) as {
  iconSets: { subpath: string; provider: string; nameSnapshot: string }[]
}

// Each set re-exports its package's own icon values: an SVG path string
// (@mdi/js), a Simple Icons object, or a Font Awesome definition.
const isIcon = (value: unknown): boolean =>
  (typeof value === 'string' && /^M/.test(value)) ||
  (typeof value === 'object' &&
    value !== null &&
    (typeof (value as { path?: unknown }).path === 'string' ||
      Array.isArray((value as { icon?: unknown }).icon)))

describe('extra icon sets', () => {
  it('exports real icons from every set', () => {
    expect(mdiHome).toMatch(/^M10,20V14H14V20/)
    expect(siGithub).toMatchObject({ title: 'GitHub', slug: 'github' })
    expect(siGithub.path).toMatch(/^M12/)
    expect(faHouse.prefix).toBe('fas')
    expect(faHouseRegular.prefix).toBe('far')
    expect(faGithub.iconName).toBe('github')
    const [width, height, , , pathData] = faHouse.icon
    expect([width, height]).toEqual([512, 512])
    expect(typeof pathData).toBe('string')
  })

  for (const set of manifest.iconSets) {
    describe(set.subpath, () => {
      const snapshot = JSON.parse(
        fs.readFileSync(path.join(projectRoot, set.nameSnapshot), 'utf8')
      ) as { package: string; version: string; names: string[] }

      it('exports exactly the snapshotted icons plus iconSet', async () => {
        const mod = (await import(set.subpath)) as Record<string, unknown>
        expect(snapshot.package).toBe(set.provider)
        expect(mod.iconSet).toMatchObject({
          package: set.provider,
          version: snapshot.version,
          count: snapshot.names.length
        })
        expect(Object.keys(mod).sort()).toEqual([...snapshot.names, 'iconSet'].sort())
        for (const name of snapshot.names) {
          expect(isIcon(mod[name]), name).toBe(true)
        }
      })

      it('resolves through CommonJS require', () => {
        const cjs = require(set.subpath) as Record<string, unknown>
        expect(isIcon(cjs[snapshot.names[0]])).toBe(true)
      })

      it('pins its package exactly', () => {
        const packageJson = JSON.parse(
          fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
        ) as { dependencies: Record<string, string> }
        expect(packageJson.dependencies[set.provider]).toBe(snapshot.version)
      })
    })
  }

  it('leaves out brand logos whose own licence restricts use', async () => {
    const brands = (await import('@phcdevworks/spectre-ui/icons/brands')) as Record<
      string,
      { slug?: string }
    >
    const slugs = new Set(Object.values(brands).map((icon) => icon.slug))
    // GPL, CC-BY-SA, CC-BY-NC-SA, and custom-licensed logos in simple-icons.
    for (const slug of ['fishshell', 'debian', 'sass', 'broadcom']) {
      expect(slugs.has(slug), slug).toBe(false)
    }
    expect(slugs.has('github')).toBe(true)
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
    for (const [subpath, name] of [
      ['mdi', 'mdiHome'],
      ['brands', 'siGithub'],
      ['fa-solid', 'faHouse']
    ]) {
      const out = await bundle(
        `import { ${name} } from '@phcdevworks/spectre-ui/icons/${subpath}'; console.log(${name})`
      )
      expect(out.length, `${subpath} bundle`).toBeLessThan(8192)
    }
  })
})
