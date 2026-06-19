import type { ToastAction, ToastOptions, ToastPromiseConfig } from "@/types/ui-services"

export interface ToastServiceApi {
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  warning: (message: string, options?: ToastOptions) => void
  info: (message: string, options?: ToastOptions) => void
  loading: (message: string, options?: Pick<ToastOptions, "duration">) => void
  promise: <T = unknown>(promise: Promise<T>, config: ToastPromiseConfig<T>) => Promise<T>
}
