import type { CSSProperties } from "react"

interface LoaderProps {
  active: boolean
  mode: "page" | "fullscreen"
  message: string | null
}

const overlayStyles: Record<string, CSSProperties> = {
  page: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(4px)",
  },
  fullscreen: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.65)",
    color: "white",
  },
}

export function Loader({ active, mode, message }: LoaderProps) {
  if (!active) {
    return null
  }

  return (
    <div style={overlayStyles[mode]} aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/90 p-6 shadow-lg shadow-black/10 text-center dark:bg-slate-950/90 dark:text-slate-50">
        <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-14 w-14" />
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {message ?? "Loading..."}
        </div>
      </div>
    </div>
  )
}
