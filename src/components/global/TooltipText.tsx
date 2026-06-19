import { type ReactNode } from "react"
import { useTooltipRegistry } from "@/services/tooltip/TooltipProvider"
import { Tooltip, TooltipContent, TooltipProvider as RadixTooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TooltipTextProps {
  tooltipKey: string
  children: ReactNode
}

export function TooltipText({ tooltipKey, children }: TooltipTextProps) {
  const tooltip = useTooltipRegistry()
  const message = tooltip.getMessage(tooltipKey)

  return (
    <RadixTooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top">{message}</TooltipContent>
      </Tooltip>
    </RadixTooltipProvider>
  )
}
