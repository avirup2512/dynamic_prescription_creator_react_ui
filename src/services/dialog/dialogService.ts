import type { DialogServiceApi } from "./dialog.types"

let activeDialogApi: DialogServiceApi | null = null

export function registerDialogService(api: DialogServiceApi) {
  activeDialogApi = api
}

export function clearDialogService() {
  activeDialogApi = null
}

function ensureDialogApi(): DialogServiceApi {
  if (!activeDialogApi) {
    throw new Error("Dialog service is not initialized. Wrap your app with DialogProvider.")
  }
  return activeDialogApi
}

export const dialog: DialogServiceApi = {
  alert(options) {
    return ensureDialogApi().alert(options)
  },
  confirm(options) {
    return ensureDialogApi().confirm(options)
  },
  prompt(options) {
    return ensureDialogApi().prompt(options)
  },
}
