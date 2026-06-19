import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import type { LoaderState, LoaderServiceApi } from "./loader.types"
import { Loader } from "@/components/global/Loader"
import { registerLoaderService, clearLoaderService } from "./loaderService"

const LoaderContext = createContext<LoaderServiceApi | null>(null)

const initialState: LoaderState = {
  activeCount: 0,
  message: null,
  mode: "page",
}

interface LoaderProviderProps {
  children: ReactNode
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [state, setState] = useState<LoaderState>(initialState)

  const api: LoaderServiceApi = useMemo(
    () => ({
      show: ({ message, mode } = {}) => {
        setState((current) => ({
          activeCount: current.activeCount + 1,
          message: message ?? current.message,
          mode: mode ?? current.mode,
        }))
      },
      hide: () => {
        setState((current) => ({
          activeCount: Math.max(current.activeCount - 1, 0),
          message: current.activeCount > 1 ? current.message : null,
          mode: current.mode,
        }))
      },
      start: ({ message, mode } = {}) => {
        setState((current) => ({
          activeCount: current.activeCount + 1,
          message: message ?? current.message,
          mode: mode ?? current.mode,
        }))
      },
      stop: () => {
        setState((current) => ({
          activeCount: Math.max(current.activeCount - 1, 0),
          message: current.activeCount > 1 ? current.message : null,
          mode: current.mode,
        }))
      },
      isLoading: () => state.activeCount > 0,
    }),
    [state.activeCount, state.message, state.mode]
  )

  useEffect(() => {
    registerLoaderService(api)
    return () => {
      clearLoaderService()
    }
  }, [api])

  return (
    <LoaderContext.Provider value={api}>
      {children}
      <Loader active={state.activeCount > 0} message={state.message} mode={state.mode} />
    </LoaderContext.Provider>
  )
}

export function useLoaderService(): LoaderServiceApi {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error("useLoaderService must be used within LoaderProvider")
  }
  return context
}
