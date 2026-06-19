import type { TooltipMessageMap, TooltipKey } from "@/types/ui-services"

export interface TooltipRegistryApi {
  getMessage: (key: TooltipKey) => string
  getKeys: () => TooltipKey[]
}

export interface TooltipProviderProps {
  children: React.ReactNode
}

export interface TooltipWrapperProps {
  tooltipKey: TooltipKey
  children: React.ReactNode
}
