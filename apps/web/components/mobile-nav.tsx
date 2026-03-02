'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, Flame, PlusCircle, Bell, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { notificationService } from '@/lib/services'
import { connectSocket } from '@/lib/socket'

const NAV_ITEMS = [
    { href: '/feed', icon: Home, label: 'Início' },
    { href: '/feed?tab=lives', icon: Flame, label: 'Lives' },
    { href: '/stream', icon: PlusCircle, label: 'Criar', accent: true },
    { href: '/feed?tab=notifications', icon: Bell, label: 'Alertas', hasBadge: true },
    { href: '/profile', icon: User, label: 'Perfil' },
]

export function MobileNav() {
    const pathname = usePathname()
    const router = useRouter()
    const [unreadCount, setUnreadCount] = useState(0)

    // Fetch unread count
    useEffect(() => {
        notificationService.getUnreadCount()
            .then(({ data }) => setUnreadCount(data.count))
            .catch(() => { })
    }, [])

    // Listen for new notifications
    useEffect(() => {
        const socket = connectSocket()
        socket.on('notification:new', () => {
            setUnreadCount(prev => prev + 1)
        })
        return () => { socket.off('notification:new') }
    }, [])

    const isActive = (href: string) => {
        if (href.includes('?')) return pathname === href.split('?')[0]
        return pathname === href || (href === '/profile' && pathname?.startsWith('/profile'))
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-t border-white/10"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
            <div className="flex items-center justify-around h-14">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)

                    return (
                        <button
                            key={item.href}
                            onClick={() => router.push(item.href)}
                            className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors
                                ${item.accent
                                    ? 'text-primary'
                                    : active
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                }`}
                            aria-label={item.label}
                        >
                            {item.accent ? (
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center -mt-4 shadow-lg shadow-primary/30 border-2 border-background">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            ) : (
                                <>
                                    <div className="relative">
                                        <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
                                        {item.hasBadge && unreadCount > 0 && (
                                            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                                                {unreadCount > 99 ? '99+' : unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`text-[10px] ${active ? 'font-semibold' : 'font-normal'}`}>
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
