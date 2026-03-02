'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { connectSocket } from '@/lib/socket'

const REACTIONS = ['❤️', '🔥', '😂', '💯', '👏']

interface FloatingReaction {
    id: string
    emoji: string
    x: number // random horizontal position
}

// Client-side throttle: 2 per second
const THROTTLE_MS = 500

export function ChatReactions({ streamId }: { streamId: string }) {
    const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([])
    const lastSentRef = useRef(0)

    // Listen for reaction broadcasts
    useEffect(() => {
        const socket = connectSocket()

        socket.on('reaction:broadcast', (data: { emoji: string; username: string }) => {
            const reaction: FloatingReaction = {
                id: `${Date.now()}-${Math.random()}`,
                emoji: data.emoji,
                x: Math.random() * 80 + 10, // 10% to 90% horizontal
            }

            setFloatingReactions(prev => [...prev.slice(-20), reaction]) // max 20 floating

            // Remove after animation (2s)
            setTimeout(() => {
                setFloatingReactions(prev => prev.filter(r => r.id !== reaction.id))
            }, 2000)
        })

        return () => {
            socket.off('reaction:broadcast')
        }
    }, [streamId])

    const sendReaction = useCallback((emoji: string) => {
        const now = Date.now()
        if (now - lastSentRef.current < THROTTLE_MS) return // client throttle

        lastSentRef.current = now
        const socket = connectSocket()
        socket.emit('reaction', { streamId, emoji })
    }, [streamId])

    return (
        <div className="relative">
            {/* Floating reactions overlay */}
            <div className="absolute -top-32 left-0 right-0 h-32 pointer-events-none overflow-hidden">
                {floatingReactions.map(r => (
                    <span
                        key={r.id}
                        className="absolute text-2xl animate-float-up"
                        style={{
                            left: `${r.x}%`,
                            bottom: 0,
                        }}
                    >
                        {r.emoji}
                    </span>
                ))}
            </div>

            {/* Reaction buttons */}
            <div className="flex items-center gap-1 py-1.5 px-2">
                {REACTIONS.map(emoji => (
                    <button
                        key={emoji}
                        onClick={() => sendReaction(emoji)}
                        className="text-lg p-1.5 rounded-lg hover:bg-white/10 active:scale-125 transition-all duration-150 cursor-pointer"
                        title={`Reagir com ${emoji}`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>

            {/* Custom animation */}
            <style jsx>{`
                @keyframes float-up {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translateY(-60px) scale(1.2);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-120px) scale(0.8);
                    }
                }
                .animate-float-up {
                    animation: float-up 2s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
