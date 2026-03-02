'use client'

import { useState, useEffect } from 'react'
import { WifiOff } from 'lucide-react'

export function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false)

    useEffect(() => {
        const handleOffline = () => setIsOffline(true)
        const handleOnline = () => setIsOffline(false)

        // Check initial state
        setIsOffline(!navigator.onLine)

        window.addEventListener('offline', handleOffline)
        window.addEventListener('online', handleOnline)

        return () => {
            window.removeEventListener('offline', handleOffline)
            window.removeEventListener('online', handleOnline)
        }
    }, [])

    if (!isOffline) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white text-center py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg animate-in slide-in-from-top duration-300">
            <WifiOff className="h-4 w-4 flex-shrink-0" />
            <span>Sem ligação à Internet — verifica a tua conexão</span>
        </div>
    )
}
