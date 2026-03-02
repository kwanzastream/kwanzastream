"use client"

import * as React from "react"
import { X, AlertTriangle, CheckCircle, Info, WifiOff } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "error" | "success" | "info" | "offline"

interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
    const context = React.useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within ToastProvider")
    }
    return context
}

const TOAST_DURATION = 5000
const MAX_TOASTS = 3

const typeConfig = {
    error: {
        icon: AlertTriangle,
        bg: "bg-red-500/10 border-red-500/30",
        text: "text-red-400",
        iconColor: "text-red-400",
    },
    success: {
        icon: CheckCircle,
        bg: "bg-green-500/10 border-green-500/30",
        text: "text-green-400",
        iconColor: "text-green-400",
    },
    info: {
        icon: Info,
        bg: "bg-blue-500/10 border-blue-500/30",
        text: "text-blue-400",
        iconColor: "text-blue-400",
    },
    offline: {
        icon: WifiOff,
        bg: "bg-orange-500/10 border-orange-500/30",
        text: "text-orange-400",
        iconColor: "text-orange-400",
    },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([])

    const showToast = React.useCallback((message: string, type: ToastType = "error") => {
        const id = crypto.randomUUID()
        setToasts((prev) => {
            const updated = [...prev, { id, message, type }]
            // Keep max toasts
            return updated.slice(-MAX_TOASTS)
        })

        // Auto-dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, TOAST_DURATION)
    }, [])

    const dismiss = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    // Listen for network status changes
    React.useEffect(() => {
        const handleOffline = () => {
            showToast("Sem ligação à internet. Verifica a tua conexão.", "offline")
        }
        const handleOnline = () => {
            showToast("Ligação restaurada!", "success")
        }

        window.addEventListener("offline", handleOffline)
        window.addEventListener("online", handleOnline)

        return () => {
            window.removeEventListener("offline", handleOffline)
            window.removeEventListener("online", handleOnline)
        }
    }, [showToast])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast container */}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => {
                    const config = typeConfig[toast.type]
                    const Icon = config.icon
                    return (
                        <div
                            key={toast.id}
                            className={cn(
                                "flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl pointer-events-auto",
                                "animate-in slide-in-from-right-5 fade-in duration-300",
                                config.bg
                            )}
                        >
                            <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconColor)} />
                            <p className={cn("text-sm flex-1", config.text)}>{toast.message}</p>
                            <button
                                onClick={() => dismiss(toast.id)}
                                className="text-muted-foreground hover:text-white transition-colors flex-shrink-0"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </ToastContext.Provider>
    )
}
