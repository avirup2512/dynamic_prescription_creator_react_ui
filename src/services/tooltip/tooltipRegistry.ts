import type { TooltipMessageMap } from "@/types/ui-services"

export const TOOLTIPS: TooltipMessageMap = {
  SAVE_TEMPLATE: "Save the current template",
  DELETE_TEMPLATE: "Delete the selected template permanently",
  ADD_MEDICINE: "Add a new medicine line item",
  EDIT_PATIENT: "Edit patient information",
  OPEN_SETTINGS: "Open application settings",
}

export type TooltipKey = keyof typeof TOOLTIPS
