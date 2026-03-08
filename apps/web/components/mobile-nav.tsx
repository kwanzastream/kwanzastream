'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, Compass, PlusCircle, Bell, User } from 'lucide-react'
import { useEffect, useState, useRef, useCallback } from 'react'
import { notificationService } from '@/lib/services'
import { connectSocket } from '@/lib/socket'

const NAV_ITEMS = [
    { href: '/feed', icon: Home, label: 'Início' },
    { href: '/explore', icon: Compass, label: 'Explorar' },
    { href: '/stream', icon: PlusCircle, label: 'Criar', accent: true },
    { href: '/feed?tab=notifications', icon: Bell, label: 'Alertas', hasBadge: true },
    { href: '/profile', icon: User, label: 'Perfil' },
]

export function MobileNav() {
    const pathname = usePathname()
    const router = useRouter()
    const [unreadCount, setUnreadCount] = useState(0)
    const [pressedIndex, setPressedIndex] = useState<number | null>(null)
    const navRef = useRef<HTMLDivElement>(null)

    // Fetch unread count
    useEffect(() => {
        notificationService.getUnreadCount()
            .then(({ data }) => setUnreadCount(data.count))
            .catch(() => { })
    }, [])

    // Listen for new notifications + count sync
    useEffect(() => {
        const socket = connectSocket()
        socket.on('notification:new', () => {
            setUnreadCount(prev => prev + 1)
        })
        socket.on('notification:count', (data: { unreadCount: number }) => {
            setUnreadCount(data.unreadCount)
        })
        return () => {
            socket.off('notification:new')
            socket.off('notification:count')
        }
    }, [])

    const isActive = (href: string) => {
        if (href.includes('?')) return pathname === href.split('?')[0]
        return pathname === href || (href === '/profile' && pathname?.startsWith('/profile'))
    }

    const handlePress = useCallback((index: number, href: string) => {
        setPressedIndex(index)
        // Reset notification count when viewing notifications
        if (href.includes('notifications')) {
            setUnreadCount(0)
        }
        router.push(href)
        setTimeout(() => setPressedIndex(null), 200)
    }, [router])

    const activeIndex = NAV_ITEMS.findIndex(item => isActive(item.href))

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-xl border-t border-border"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
            <div ref={navRef} className="relative flex items-center justify-around h-[58px]">
                {/* Animated active indicator */}
                {activeIndex >= 0 && !NAV_ITEMS[activeIndex]?.accent && (
                    <div
                        className="absolute top-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-all duration-300 ease-out"
                        style={{
                            width: `${100 / NAV_ITEMS.length}%`,
                            left: `${(activeIndex / NAV_ITEMS.length) * 100}%`,
                        }}
                    />
                )}

                {NAV_ITEMS.map((item, index) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    const pressed = pressedIndex === index

                    return (
                        <button
                            key={item.href}
                            onClick={() => handlePress(index, item.href)}
                            className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200
                                ${pressed ? 'scale-90' : 'scale-100'}
                                ${item.accent
                                    ? 'text-primary'
                                    : active
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                }`}
                            aria-label={item.label}
                        >
                            {item.accent ? (
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center -mt-5 shadow-lg shadow-primary/25 border-[3px] border-background">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            ) : (
                                <>
                                    <div className="relative">
                                        <Icon className={`w-[21px] h-[21px] transition-all duration-200 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                                        {item.hasBadge && unreadCount > 0 && (
                                            <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 shadow-sm shadow-red-500/30">
                                                {unreadCount > 99 ? '99+' : unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`text-[10px] leading-tight transition-all duration-200 ${active ? 'font-semibold text-primary' : 'font-normal text-muted-foreground'}`}>
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
