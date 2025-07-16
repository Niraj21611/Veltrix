"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils/utils"

const ToastProvider = React.createContext<{
  toast: (props: { title: string; description?: string; variant?: "default" | "destructive" }) => void
}>({
  toast: () => {},
})

export const useToast = () => React.useContext(ToastProvider)

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: string
      title: string
      description?: string
      variant?: "default" | "destructive"
    }>
  >([])

  const toast = React.useCallback(
    (props: { title: string; description?: string; variant?: "default" | "destructive" }) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, ...props }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 5000)
    },
    [],
  )

  return (
    <ToastProvider.Provider value={{ toast }}>
      {children}
      <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 w-full max-w-sm p-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "relative flex flex-col gap-1 rounded-md border p-4 shadow-md",
              toast.variant === "destructive" ? "border-red-500 bg-red-50" : "border-gray-200 bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold">{toast.title}</div>
                {toast.description && <div className="text-sm text-gray-500">{toast.description}</div>}
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastProvider.Provider>
  )
}

// Global toast function
export const toast = {
  show: (props: { title: string; description?: string }) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("toast", { detail: props })
      window.dispatchEvent(event)
    }
  },
  error: (props: { title: string; description?: string }) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("toast", { detail: { ...props, variant: "destructive" } })
      window.dispatchEvent(event)
    }
  },
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: string
      title: string
      description?: string
      variant?: "default" | "destructive"
    }>
  >([])

  React.useEffect(() => {
    const handleToast = (e: Event) => {
      const detail = (e as CustomEvent).detail
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, ...detail }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 5000)
    }

    window.addEventListener("toast", handleToast)
    return () => window.removeEventListener("toast", handleToast)
  }, [])

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 w-full max-w-sm p-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "relative flex flex-col gap-1 rounded-md border p-4 shadow-md",
            toast.variant === "destructive" ? "border-red-500 bg-red-50" : "border-gray-200 bg-white",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold">{toast.title}</div>
              {toast.description && <div className="text-sm text-gray-500">{toast.description}</div>}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
