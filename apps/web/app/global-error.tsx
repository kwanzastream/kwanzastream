"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw } from "lucide-react"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("App error:", error)
    }, [error])

    return (
        <html>
            <body className="bg-[#050505] text-white">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="h-10 w-10 text-red-400" />
                        </div>
                        <h2 className="text-xl font-black">Algo correu mal 😔</h2>
                        <p className="text-sm text-zinc-400">
                            Ocorreu um erro inesperado. A equipa foi notificada.
                        </p>
                        <Button
                            onClick={reset}
                            className="bg-violet-600 hover:bg-violet-700 font-bold h-12 px-8"
                        >
                            <RefreshCcw className="h-4 w-4 mr-2" />
                            Tentar Novamente
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    )
}
