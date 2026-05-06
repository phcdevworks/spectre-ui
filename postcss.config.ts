import { createRequire } from 'node:module'
import postcssImport from 'postcss-import'

const require = createRequire(import.meta.url)

export default {
  plugins: [
    postcssImport({
      path: ['node_modules'],
      resolve: (id: string, basedir: string) =>
        require.resolve(id, { paths: [basedir] })
    })
  ]
}
