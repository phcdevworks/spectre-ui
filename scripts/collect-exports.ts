import ts from 'typescript'

export function collectExports(entryFile: string): string[] {
  const program = ts.createProgram([entryFile], {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    skipLibCheck: true
  })
  const source = program.getSourceFile(entryFile)
  if (!source) throw new Error(`Unable to read export entry point: ${entryFile}`)

  const checker = program.getTypeChecker()
  const moduleSymbol = checker.getSymbolAtLocation(source)
  if (!moduleSymbol) throw new Error(`Export entry point is not a module: ${entryFile}`)

  return checker.getExportsOfModule(moduleSymbol)
    .map((symbol) => symbol.getName())
    .sort((a, b) => a.localeCompare(b))
}
