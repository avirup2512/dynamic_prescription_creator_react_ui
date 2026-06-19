import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { TooltipRegistryApi } from "./tooltip.types"
import { TOOLTIPS } from "./tooltipRegistry"

const TooltipContext = createContext<TooltipRegistryApi | null>(null)

interface TooltipProviderProps {
  children: ReactNode
}

const tooltipService: TooltipRegistryApi = {
  getMessage(key) {
    if (!(key in TOOLTIPS)) {
      throw new Error(`Tooltip key not found: ${key}`)
    }
    return TOOLTIPS[key]
  },
  getKeys() {
    return Object.keys(TOOLTIPS)
  },
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return (
    <TooltipContext.Provider value={tooltipService}>
      {children}
    </TooltipContext.Provider>
  )
}

export function useTooltipRegistry(): TooltipRegistryApi {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error("useTooltipRegistry must be used within TooltipProvider")
  }
  return context
}
