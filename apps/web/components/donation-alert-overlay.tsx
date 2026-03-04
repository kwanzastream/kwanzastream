'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { io as socketIo, Socket } from 'socket.io-client'

interface DonationAlert {
    id: string
    senderName: string
    senderAvatar?: string
    saloEmoji: string
    saloName: string
    amount: number
    message?: string
}

interface DonationAlertOverlayProps {
    streamId: string
    soundEnabled?: boolean
    position?: 'top' | 'center' | 'bottom'
}

export function DonationAlertOverlay({
    streamId,
    soundEnabled = true,
    position = 'top',
}: DonationAlertOverlayProps) {
    const [queue, setQueue] = useState<DonationAlert[]>([])
    const [current, setCurrent] = useState<DonationAlert | null>(null)
    const [visible, setVisible] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const socketRef = useRef<Socket | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Pre-load audio
    useEffect(() => {
        audioRef.current = new Audio('/sounds/salo-alert.mp3')
        audioRef.current.volume = 0.7
    }, [])

    // Connect Socket.io with httpOnly cookie auth
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const socket = socketIo(apiUrl, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
        })
        socketRef.current = socket

        socket.on('connect', () => {
            socket.emit('join:stream', streamId)
        })

        // Listen for donation alerts (matches shared-types/events.ts contract)
        socket.on('donation:received', (data: Omit<DonationAlert, 'id'>) => {
            const alert: DonationAlert = {
                ...data,
                id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            }
            setQueue(prev => [...prev, alert])
        })

        return () => {
            socket.emit('leave:stream', streamId)
            socket.disconnect()
        }
    }, [streamId])

    // Process queue
    useEffect(() => {
        if (current || queue.length === 0) return

        const next = queue[0]
        setQueue(prev => prev.slice(1))
        setCurrent(next)
        setVisible(true)

        // Play sound
        if (soundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(() => { })
        }

        // Auto-hide after 5s
        timeoutRef.current = setTimeout(() => {
            setVisible(false)
            setTimeout(() => setCurrent(null), 500) // wait for fade-out
        }, 5000)

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [queue, current, soundEnabled])

    if (!current) return null

    const posClass = {
        top: 'items-start pt-8',
        center: 'items-center',
        bottom: 'items-end pb-20',
    }[position]

    return (
        <div
            className={`fixed inset-0 flex justify-center ${posClass} pointer-events-none z-[200] transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div
                className={`pointer-events-auto transition-all duration-500 ${visible ? 'scale-100 translate-y-0' : 'scale-75 -translate-y-4'
                    }`}
            >
                <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl border border-primary/30 px-8 py-6 text-center shadow-2xl shadow-primary/20 min-w-[320px] max-w-[420px]">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 blur-xl -z-10" />

                    {/* Emoji */}
                    <div className="text-6xl mb-3 animate-bounce drop-shadow-lg">
                        {current.saloEmoji}
                    </div>

                    {/* Salo name */}
                    <p className="text-primary font-black text-lg uppercase tracking-wider mb-1">
                        {current.saloName}
                    </p>

                    {/* Amount */}
                    <p className="text-white font-black text-3xl mb-2">
                        {current.amount.toLocaleString()} Kz
                    </p>

                    {/* Sender */}
                    <p className="text-muted-foreground text-sm">
                        De{' '}
                        <span className="text-white font-bold">
                            {current.senderName}
                        </span>
                    </p>

                    {/* Message */}
                    {current.message && (
                        <div className="mt-3 bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                            <p className="text-sm text-white/90 italic">
                                "{current.message}"
                            </p>
                        </div>
                    )}

                    {/* Sparkle particles */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full animate-ping opacity-40" />
                    <div className="absolute -top-1 -right-3 w-3 h-3 bg-secondary rounded-full animate-ping opacity-30 delay-300" />
                    <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-30 delay-700" />
                </div>
            </div>
        </div>
    )
}
