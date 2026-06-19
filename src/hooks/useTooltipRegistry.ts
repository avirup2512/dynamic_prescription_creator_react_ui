import { useTooltipRegistry } from "@/services/tooltip/TooltipProvider"

export function useTooltip() {
  return useTooltipRegistry()
}
