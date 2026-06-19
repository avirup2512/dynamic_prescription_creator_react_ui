import type { DialogAlertOptions, DialogConfirmOptions, DialogPromptOptions } from "@/types/ui-services"

export interface DialogServiceApi {
  alert: (options: DialogAlertOptions) => Promise<void>
  confirm: (options: DialogConfirmOptions) => Promise<boolean>
  prompt: (options: DialogPromptOptions) => Promise<string | null>
}

export interface DialogRequest {
  id: string
  type: "alert" | "confirm" | "prompt"
  options: DialogAlertOptions | DialogConfirmOptions | DialogPromptOptions
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}
