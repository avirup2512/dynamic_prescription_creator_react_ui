import type { ToastServiceApi } from "./toast.types"

let activeToastApi: ToastServiceApi | null = null

export function registerToastService(api: ToastServiceApi) {
  activeToastApi = api
}

export function clearToastService() {
  activeToastApi = null
}

function ensureToastApi(): ToastServiceApi {
  if (!activeToastApi) {
    throw new Error("Toast service is not initialized. Wrap your app with ToastProvider.")
  }
  return activeToastApi
}

export const toast: ToastServiceApi = {
  success(message, options = {}) {
    ensureToastApi().success(message, options)
  },
  error(message, options = {}) {
    ensureToastApi().error(message, options)
  },
  warning(message, options = {}) {
    ensureToastApi().warning(message, options)
  },
  info(message, options = {}) {
    ensureToastApi().info(message, options)
  },
  loading(message, options = {}) {
    ensureToastApi().loading(message, options)
  },
  promise(promise, config) {
    return ensureToastApi().promise(promise, config)
  },
}
