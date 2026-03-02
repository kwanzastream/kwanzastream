'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Bell, Check, CheckCheck } from 'lucide-react'
import { notificationService } from '@/lib/services'
import { connectSocket, disconnectSocket } from '@/lib/socket'

interface Notification {
    id: string
    type: string
    title: string
    body: string
    imageUrl?: string
    linkUrl?: string
    read: boolean
    createdAt: string
}

export function NotificationBell() {
    const [unreadCount, setUnreadCount] = useState(0)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Fetch unread count on mount
    useEffect(() => {
        fetchUnreadCount()
    }, [])

    // Socket.io listener for real-time notifications
    useEffect(() => {
        const socket = connectSocket()
        socket.on('notification:new', (notification: Notification) => {
            setUnreadCount(prev => prev + 1)
            setNotifications(prev => [notification, ...prev])
        })

        return () => {
            socket.off('notification:new')
        }
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const fetchUnreadCount = async () => {
        try {
            const { data } = await notificationService.getUnreadCount()
            setUnreadCount(data.count)
        } catch {
            // Silently fail
        }
    }

    const fetchNotifications = async () => {
        setLoading(true)
        try {
            const { data } = await notificationService.getAll()
            setNotifications(data.notifications)
        } catch {
            // Silently fail
        }
        setLoading(false)
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            fetchNotifications()
        }
    }

    const handleMarkAsRead = async (id: string) => {
        try {
            await notificationService.markAsRead(id)
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
            setUnreadCount(prev => Math.max(0, prev - 1))
        } catch {
            // Silently fail
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead()
            setNotifications(prev => prev.map(n => ({ ...n, read: true })))
            setUnreadCount(0)
        } catch {
            // Silently fail
        }
    }

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'LIVE_STARTED': return '🔴'
            case 'DONATION_RECEIVED': return '💰'
            case 'NEW_FOLLOWER': return '👤'
            default: return '🔔'
        }
    }

    const timeAgo = (date: string) => {
        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
        if (seconds < 60) return 'agora'
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
        return `${Math.floor(seconds / 86400)}d`
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell button */}
            <button
                onClick={handleOpen}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Notificações"
            >
                <Bell className="w-5 h-5 text-gray-300" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-white">Notificações</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                                <CheckCheck className="w-3.5 h-3.5" />
                                Marcar tudo
                            </button>
                        )}
                    </div>

                    {/* Notification list */}
                    <div className="max-h-80 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500 text-sm">A carregar...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                Sem notificações
                            </div>
                        ) : (
                            notifications.map(n => (
                                <button
                                    key={n.id}
                                    onClick={() => !n.read && handleMarkAsRead(n.id)}
                                    className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 ${!n.read ? 'bg-blue-900/10' : ''}`}
                                >
                                    <span className="text-lg mt-0.5">{getNotificationIcon(n.type)}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm ${!n.read ? 'text-white font-medium' : 'text-gray-400'}`}>
                                            {n.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{n.body}</p>
                                        <p className="text-[10px] text-gray-600 mt-1">{timeAgo(n.createdAt)}</p>
                                    </div>
                                    {!n.read && (
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
