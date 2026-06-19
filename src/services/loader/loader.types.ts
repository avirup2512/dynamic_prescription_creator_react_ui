import type { LoaderMode } from "@/types/ui-services"

export interface LoaderState {
  activeCount: number
  message: string | null
  mode: LoaderMode
}

export interface LoaderServiceApi {
  show: (options?: { message?: string; mode?: LoaderMode }) => void
  hide: () => void
  start: (options?: { message?: string; mode?: LoaderMode }) => void
  stop: () => void
  isLoading: () => boolean
}
