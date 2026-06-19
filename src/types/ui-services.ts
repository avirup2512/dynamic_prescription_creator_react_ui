export type LoaderMode = "page" | "fullscreen"

export interface LoaderOptions {
  mode?: LoaderMode
  message?: string
}

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastOptions {
  duration?: number
  action?: ToastAction
}

export interface ToastPromiseConfig<T = unknown> {
  loading: string
  success: string | ((value: T) => string)
  error: string | ((error: unknown) => string)
  duration?: number
  action?: ToastAction
  retry?: () => void
}

export interface DialogBaseOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export interface DialogAlertOptions extends DialogBaseOptions {}

export interface DialogConfirmOptions extends DialogBaseOptions {
  confirmText?: string
  cancelText?: string
}

export interface DialogPromptOptions extends DialogBaseOptions {
  placeholder?: string
  defaultValue?: string
  inputType?: "text" | "email" | "number" | "password"
}

export type DialogResult = boolean | string | null | void

export type TooltipKey = string
export type TooltipMessageMap = Record<string, string>
