import type { LoaderServiceApi } from "./loader.types"

let activeApi: LoaderServiceApi | null = null

export function registerLoaderService(api: LoaderServiceApi) {
  activeApi = api
}

export function clearLoaderService() {
  activeApi = null
}

function ensureApi(): LoaderServiceApi {
  if (!activeApi) {
    throw new Error("Loader service is not initialized. Wrap your app with LoaderProvider.")
  }
  return activeApi
}

export const loader: LoaderServiceApi = {
  show(options = {}) {
    ensureApi().show(options)
  },
  hide() {
    ensureApi().hide()
  },
  start(options = {}) {
    ensureApi().start(options)
  },
  stop() {
    ensureApi().stop()
  },
  isLoading() {
    return ensureApi().isLoading()
  },
}
