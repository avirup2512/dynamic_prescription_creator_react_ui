import { useCallback, useEffect, useMemo, useState } from "react"
import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { DialogRequest, DialogServiceApi } from "./dialog.types"
import { ConfirmDialog } from "@/components/global/ConfirmDialog"
import { PromptDialog } from "@/components/global/PromptDialog"
import { AlertDialog } from "@/components/global/AlertDialog"
import { registerDialogService, clearDialogService } from "./dialogService"

const DialogContext = createContext<DialogServiceApi | null>(null)

interface DialogProviderProps {
  children: ReactNode
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [queue, setQueue] = useState<DialogRequest[]>([])

  const currentDialog = queue[0]

  const present = useCallback((request: DialogRequest) => {
    setQueue((current) => [...current, request])
  }, [])

  const removeCurrent = useCallback(() => {
    setQueue((current) => current.slice(1))
  }, [])

  const api: DialogServiceApi = useMemo(
    () => ({
      alert(options) {
        return new Promise<void>((resolve: any, reject) => {
          present({
            id: crypto.randomUUID(),
            type: "alert",
            options,
            resolve,
            reject,
          })
        })
      },
      confirm(options) {
        return new Promise<boolean>((resolve: any, reject) => {
          present({
            id: crypto.randomUUID(),
            type: "confirm",
            options,
            resolve,
            reject,
          })
        })
      },
      prompt(options) {
        return new Promise<string | null>((resolve: any, reject) => {
          present({
            id: crypto.randomUUID(),
            type: "prompt",
            options,
            resolve,
            reject,
          })
        })
      },
    }),
    [present]
  )

  useEffect(() => {
    registerDialogService(api)
    return () => {
      clearDialogService()
    }
  }, [api])

  function handleClose(result: unknown) {
    if (!currentDialog) {
      return
    }

    currentDialog.resolve(result)
    removeCurrent()
  }

  function handleCancel() {
    if (!currentDialog) {
      return
    }

    if (currentDialog.type === "prompt") {
      currentDialog.resolve(null)
    } else {
      currentDialog.resolve(false)
    }
    removeCurrent()
  }

  return (
    <DialogContext.Provider value={api}>
      {children}
      {currentDialog?.type === "alert" && (
        <AlertDialog
          open
          options={currentDialog.options}
          onConfirm={() => handleClose(undefined)}
          onClose={() => handleClose(undefined)}
        />
      )}
      {currentDialog?.type === "confirm" && (
        <ConfirmDialog
          open
          options={currentDialog.options}
          onConfirm={() => handleClose(true)}
          onCancel={handleCancel}
        />
      )}
      {currentDialog?.type === "prompt" && (
        <PromptDialog
          open
          options={currentDialog.options}
          onConfirm={(value) => handleClose(value)}
          onCancel={handleCancel}
        />
      )}
    </DialogContext.Provider>
  )
}

export function useDialogService(): DialogServiceApi {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialogService must be used within DialogProvider")
  }
  return context
}
