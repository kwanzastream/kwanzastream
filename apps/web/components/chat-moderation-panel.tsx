'use client'

import { useState, useCallback } from 'react'
import { Shield, Clock, Ban, MessageSquareOff, AlertTriangle, X, ChevronRight } from 'lucide-react'
import { connectSocket } from '@/lib/socket'

interface ChatModerationPanelProps {
    streamId: string
    isStreamer: boolean
    isModerator?: boolean
}

interface UserAction {
    userId: string
    username: string
    action: 'timeout' | 'ban'
    duration?: number
    reason?: string
}

const TIMEOUT_DURATIONS = [
    { label: '1 min', seconds: 60 },
    { label: '5 min', seconds: 300 },
    { label: '10 min', seconds: 600 },
    { label: '30 min', seconds: 1800 },
    { label: '1 hora', seconds: 3600 },
]

const SLOW_MODE_INTERVALS = [
    { label: 'Desligado', seconds: 0 },
    { label: '3 seg', seconds: 3 },
    { label: '5 seg', seconds: 5 },
    { label: '10 seg', seconds: 10 },
    { label: '30 seg', seconds: 30 },
    { label: '1 min', seconds: 60 },
]

export function ChatModerationPanel({ streamId, isStreamer, isModerator }: ChatModerationPanelProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [slowModeInterval, setSlowModeInterval] = useState(0)
    const [showUserAction, setShowUserAction] = useState<UserAction | null>(null)
    const [actionReason, setActionReason] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    // Only show for streamers and moderators
    if (!isStreamer && !isModerator) return null

    const toggleSlowMode = useCallback((seconds: number) => {
        const socket = connectSocket()
        socket.emit('chat:slow_mode', { streamId, enabled: seconds > 0, intervalSeconds: seconds })
        setSlowModeInterval(seconds)
    }, [streamId])

    const timeoutUser = useCallback(async (userId: string, username: string, durationSeconds: number) => {
        setIsProcessing(true)
        try {
            const socket = connectSocket()
            socket.emit('chat:timeout_user', {
                streamId,
                userId,
                durationSeconds,
                reason: actionReason || 'Violação das regras do chat',
            })
            setShowUserAction(null)
            setActionReason('')
        } finally {
            setIsProcessing(false)
        }
    }, [streamId, actionReason])

    const banUser = useCallback(async (userId: string, username: string) => {
        setIsProcessing(true)
        try {
            const socket = connectSocket()
            socket.emit('chat:ban_user', {
                streamId,
                userId,
                permanent: true,
                reason: actionReason || 'Banido pelo streamer',
            })
            setShowUserAction(null)
            setActionReason('')
        } finally {
            setIsProcessing(false)
        }
    }, [streamId, actionReason])

    return (
        <>
            {/* Mod badge button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-green-400 border border-green-500/20"
                title="Ferramentas de moderação"
            >
                <Shield className="w-4 h-4" />
            </button>

            {/* Moderation panel */}
            {isOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-72 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-2">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-green-500/5">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-semibold text-white">Moderação</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Slow mode */}
                    <div className="p-4 border-b border-white/5">
                        <div className="flex items-center gap-2 mb-2.5">
                            <Clock className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-300">Modo Lento</span>
                            {slowModeInterval > 0 && (
                                <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded-full">
                                    ATIVO
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {SLOW_MODE_INTERVALS.map(opt => (
                                <button
                                    key={opt.seconds}
                                    onClick={() => toggleSlowMode(opt.seconds)}
                                    className={`text-xs px-2.5 py-1.5 rounded-lg transition-all ${slowModeInterval === opt.seconds
                                            ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="p-4">
                        <p className="text-xs text-gray-500 mb-2.5">
                            Clica num username no chat para moderar
                        </p>

                        {/* Action buttons for when a user is selected */}
                        <div className="space-y-1.5">
                            <button
                                onClick={() => setShowUserAction({ userId: '', username: '', action: 'timeout' })}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-orange-500/10 text-gray-300 hover:text-orange-300 transition-all text-sm"
                            >
                                <MessageSquareOff className="w-3.5 h-3.5" />
                                <span>Timeout</span>
                                <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                            </button>
                            <button
                                onClick={() => setShowUserAction({ userId: '', username: '', action: 'ban' })}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-300 transition-all text-sm"
                            >
                                <Ban className="w-3.5 h-3.5" />
                                <span>Banir do chat</span>
                                <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Timeout duration picker modal */}
            {showUserAction?.action === 'timeout' && (
                <div className="fixed inset-0 bg-black/60 z-[300] flex items-center justify-center p-4" onClick={() => setShowUserAction(null)}>
                    <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-orange-400" />
                            <h3 className="text-white font-semibold">Timeout</h3>
                        </div>

                        <input
                            type="text"
                            placeholder="Username do utilizador..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 mb-3"
                        />

                        <textarea
                            value={actionReason}
                            onChange={e => setActionReason(e.target.value)}
                            placeholder="Motivo (opcional)..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 resize-none h-16 mb-3"
                        />

                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {TIMEOUT_DURATIONS.map(d => (
                                <button
                                    key={d.seconds}
                                    onClick={() => timeoutUser(showUserAction.userId, showUserAction.username, d.seconds)}
                                    disabled={isProcessing}
                                    className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm hover:bg-orange-500/20 transition-all disabled:opacity-50"
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowUserAction(null)}
                            className="w-full py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Ban confirmation modal */}
            {showUserAction?.action === 'ban' && (
                <div className="fixed inset-0 bg-black/60 z-[300] flex items-center justify-center p-4" onClick={() => setShowUserAction(null)}>
                    <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2 mb-4">
                            <Ban className="w-5 h-5 text-red-400" />
                            <h3 className="text-white font-semibold">Banir do Chat</h3>
                        </div>

                        <input
                            type="text"
                            placeholder="Username do utilizador..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 mb-3"
                        />

                        <textarea
                            value={actionReason}
                            onChange={e => setActionReason(e.target.value)}
                            placeholder="Motivo do ban..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 resize-none h-16 mb-4"
                        />

                        <p className="text-xs text-red-300/60 mb-4">
                            ⚠️ Esta acção é permanente. O utilizador não poderá enviar mensagens nesta stream.
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowUserAction(null)}
                                className="flex-1 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => banUser(showUserAction.userId, showUserAction.username)}
                                disabled={isProcessing}
                                className="flex-1 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/30 disabled:opacity-50"
                            >
                                Confirmar Ban
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
