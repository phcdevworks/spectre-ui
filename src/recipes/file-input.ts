import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const FILE_INPUT_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

const FILE_INPUT_STATES = {
  default: true,
  invalid: true,
  success: true
} as const

export type FileInputSize = keyof typeof FILE_INPUT_SIZES
export type FileInputState = keyof typeof FILE_INPUT_STATES

export interface FileInputRecipeOptions {
  size?: FileInputSize
  state?: FileInputState
  fullWidth?: boolean
  disabled?: boolean
  focused?: boolean
}

/**
 * Styles `<input type="file">`, including its browse button through
 * `::file-selector-button`.
 */
export function getFileInputClasses(opts: FileInputRecipeOptions = {}): string {
  const {
    size: sizeInput,
    state: stateInput,
    fullWidth = false,
    disabled = false,
    focused = false
  } = opts

  const size = resolveOption({
    name: 'file input size',
    value: sizeInput,
    allowed: FILE_INPUT_SIZES,
    fallback: 'md'
  })

  const state = resolveOption({
    name: 'file input state',
    value: stateInput,
    allowed: FILE_INPUT_STATES,
    fallback: 'default'
  })

  return cx(
    'sp-file-input',
    `sp-file-input--${size}`,
    state === 'invalid' && 'sp-file-input--invalid',
    state === 'success' && 'sp-file-input--success',
    fullWidth && 'sp-file-input--full',
    disabled && 'sp-file-input--disabled',
    focused && 'sp-file-input--focus is-focus'
  )
}
