'use client'

import { useState, useEffect, useCallback } from 'react'
import { connectSocket } from '@/lib/socket'

interface SaloAlert {
    id: string
    saloType: string
    amount: number
    username: string
    displayName?: string
    message?: string
}

const SALO_EMOJIS: Record<string, string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    diamond: '💎',
    legendary: '👑',
}

const SALO_COLORS: Record<string, string> = {
    bronze: 'from-orange-700 to-orange-900',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-500 to-amber-700',
    diamond: 'from-cyan-400 to-blue-600',
    legendary: 'from-purple-500 to-pink-600',
}

export function SaloAlertOverlay({ streamId }: { streamId: string }) {
    const [alerts, setAlerts] = useState<SaloAlert[]>([])
    const [currentAlert, setCurrentAlert] = useState<SaloAlert | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    // Listen for donation events
    useEffect(() => {
        const socket = connectSocket()

        socket.on('donation', (data: any) => {
            if (data.streamId !== streamId) return

            const alert: SaloAlert = {
                id: `${Date.now()}-${data.userId}`,
                saloType: data.saloType,
                amount: data.amount,
                username: data.username,
                displayName: data.displayName,
                message: data.message,
            }

            setAlerts(prev => [...prev, alert])
        })

        return () => {
            socket.off('donation')
        }
    }, [streamId])

    // Process alert queue
    useEffect(() => {
        if (alerts.length > 0 && !currentAlert) {
            const [next, ...rest] = alerts
            setAlerts(rest)
            setCurrentAlert(next)
            setIsAnimating(true)

            // Auto-dismiss after 5s
            setTimeout(() => {
                setIsAnimating(false)
                setTimeout(() => setCurrentAlert(null), 500) // fade out time
            }, 5000)
        }
    }, [alerts, currentAlert])

    if (!currentAlert) return null

    const emoji = SALO_EMOJIS[currentAlert.saloType] || '🎁'
    const gradient = SALO_COLORS[currentAlert.saloType] || 'from-red-500 to-red-700'

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div
                className={`
                    bg-gradient-to-r ${gradient} 
                    rounded-xl px-6 py-4 shadow-2xl
                    min-w-[300px] max-w-[400px]
                    border border-white/20
                    transition-all duration-500
                    ${isAnimating ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}
                `}
            >
                <div className="flex items-center gap-3">
                    <span className="text-4xl animate-bounce">{emoji}</span>
                    <div>
                        <p className="text-white font-bold text-sm">
                            {currentAlert.displayName || currentAlert.username}
                        </p>
                        <p className="text-white/80 text-xs">
                            enviou um <span className="font-bold capitalize">{currentAlert.saloType}</span> Salo!
                        </p>
                        {currentAlert.message && (
                            <p className="text-white/70 text-xs mt-1 italic">
                                "{currentAlert.message}"
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
