import type { ReactNode } from "react"
import { DialogProvider } from "@/services/dialog/DialogProvider"
import { LoaderProvider } from "@/services/loader/LoaderProvider"
import { ToastProvider } from "@/services/toast/ToastProvider"
import { TooltipProvider } from "@/services/tooltip/TooltipProvider"

interface GlobalUiProviderProps {
  children: ReactNode
}

export function GlobalUiProvider({ children }: GlobalUiProviderProps) {
  return (
    <LoaderProvider>
      <DialogProvider>
        <ToastProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ToastProvider>
      </DialogProvider>
    </LoaderProvider>
  )
}
