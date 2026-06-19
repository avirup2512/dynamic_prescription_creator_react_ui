import { createContext, useContext, useEffect } from "react"
import type { ReactNode } from "react"
import { toast as sonnerToast } from "sonner"
import type { Action } from "sonner"
import type { ToastServiceApi } from "./toast.types"
import { registerToastService, clearToastService } from "./toastService"
import { Toaster as AppToaster } from "@/components/ui/sonner"

const ToastContext = createContext<ToastServiceApi | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

const toastService: ToastServiceApi = {
  success(message, options: import("@/types/ui-services").ToastOptions = {}) {
    sonnerToast.success(message, {
      duration: options.duration,
      action: options.action
        ? ({
            label: options.action.label,
            onClick: (event) => {
              options.action?.onClick?.()
              event.preventDefault()
            },
          } as Action)
        : undefined,
    })
  },
  error(message, options: import("@/types/ui-services").ToastOptions = {}) {
    sonnerToast.error(message, {
      duration: options.duration,
      action: options.action
        ? ({
            label: options.action.label,
            onClick: (event) => {
              options.action?.onClick?.()
              event.preventDefault()
            },
          } as Action)
        : undefined,
    })
  },
  warning(message, options: import("@/types/ui-services").ToastOptions = {}) {
    sonnerToast.warning(message, {
      duration: options.duration,
      action: options.action
        ? ({
            label: options.action.label,
            onClick: (event) => {
              options.action?.onClick?.()
              event.preventDefault()
            },
          } as Action)
        : undefined,
    })
  },
  info(message, options: import("@/types/ui-services").ToastOptions = {}) {
    sonnerToast(message, {
      duration: options.duration,
      action: options.action
        ? ({
            label: options.action.label,
            onClick: (event) => {
              options.action?.onClick?.()
              event.preventDefault()
            },
          } as Action)
        : undefined,
    })
  },
  loading(message, options: Pick<import("@/types/ui-services").ToastOptions, "duration"> = {}) {
    sonnerToast.loading(message, {
      duration: options.duration ?? 0,
    })
  },
  promise<T>(promise: Promise<T>, config: import("@/types/ui-services").ToastPromiseConfig<T>) {
    const result = sonnerToast.promise(promise, {
      loading: config.loading,
      success: config.success,
      error: config.error,
      duration: config.duration,
      action: config.action,
    })
    return result.unwrap()
  },
}

export function ToastProvider({ children }: ToastProviderProps) {
  useEffect(() => {
    registerToastService(toastService)
    return () => {
      clearToastService()
    }
  }, [])

  return (
    <ToastContext.Provider value={toastService}>
      {children}
      <AppToaster />
    </ToastContext.Provider>
  )
}

export function useToastService(): ToastServiceApi {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToastService must be used within ToastProvider")
  }
  return context
}
