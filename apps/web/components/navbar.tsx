"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Radio, Wallet, LogOut, User, Settings, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { NotificationBell } from "@/components/notification-bell"

export function Navbar() {
  const { user, isLoggedIn, isLoading, logout } = useAuth()
  const router = useRouter()
  const [showMenu, setShowMenu] = React.useState(false)
  const [showSearch, setShowSearch] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    setShowMenu(false)
    await logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="flex h-14 md:h-16 items-center justify-between px-3 md:px-6">
        {/* Logo — always visible */}
        {!showSearch && (
          <div className="flex items-center gap-2">
            <Link
              href={isLoggedIn ? "/feed" : "/"}
              className="flex items-center gap-2 group transition-transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg shadow-lg border border-white/10 text-white">
                K
              </div>
              <span className="font-bold text-xl tracking-tighter hidden md:block uppercase">
                KWANZA <span className="text-secondary">STREAM</span>
              </span>
            </Link>
          </div>
        )}

        {/* Search — full bar on desktop, expandable on mobile */}
        {isLoggedIn && (
          <>
            {/* Desktop search */}
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar creators, lives ou hashtags..."
                  className="w-full bg-white/5 border-white/10 pl-9 focus-visible:ring-primary h-9"
                />
              </div>
            </div>

            {/* Mobile expanded search */}
            {showSearch && (
              <div className="flex-1 flex items-center gap-2 md:hidden">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Pesquisar..."
                    className="w-full bg-white/5 border-white/10 pl-9 focus-visible:ring-primary h-9 text-base"
                    autoFocus
                  />
                </div>
                <button onClick={() => setShowSearch(false)} className="p-2 text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-1 md:gap-2">
          {isLoggedIn && user ? (
            <>
              {/* Mobile search toggle */}
              {!showSearch && (
                <button onClick={() => setShowSearch(true)} className="p-2 text-muted-foreground hover:text-foreground md:hidden">
                  <Search className="w-5 h-5" />
                </button>
              )}

              {/* Notification bell — desktop only (mobile uses bottom nav) */}
              <div className="hidden md:block">
                <NotificationBell />
              </div>

              <Button asChild variant="ghost" className="hidden md:flex gap-2 font-bold text-primary h-9">
                <Link href="/wallet">
                  <Wallet className="h-4 w-4" />
                  {(user.balance || 0).toLocaleString()} Kz
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="hidden md:flex font-bold text-primary">
                <Link href="/stream">
                  <Radio className="mr-2 h-4 w-4" /> Go Live
                </Link>
              </Button>

              {/* Profile Menu */}
              <div className="relative" ref={menuRef}>
                <Avatar
                  onClick={() => setShowMenu(!showMenu)}
                  className="h-8 w-8 cursor-pointer ring-offset-background transition-all hover:ring-2 hover:ring-primary ring-offset-2"
                >
                  <AvatarImage src={user.avatarUrl || '/abstract-profile.png'} alt={user.displayName || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-xs">
                    {(user.displayName || user.username || 'U')[0]}
                  </AvatarFallback>
                </Avatar>

                {showMenu && (
                  <div className="absolute right-0 top-12 w-56 bg-card border border-white/10 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="font-bold text-sm truncate">{user.displayName || user.username || 'Utilizador'}</p>
                      {user.phone && <p className="text-xs text-muted-foreground">{user.phone}</p>}
                    </div>
                    <button
                      onClick={() => { setShowMenu(false); router.push(`/profile/${user.id}`) }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                    >
                      <User className="h-4 w-4 text-muted-foreground" /> O Meu Perfil
                    </button>
                    <button
                      onClick={() => { setShowMenu(false); router.push('/wallet') }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors md:hidden"
                    >
                      <Wallet className="h-4 w-4 text-muted-foreground" /> Carteira
                      <span className="ml-auto text-xs font-bold text-primary">{(user.balance || 0).toLocaleString()} Kz</span>
                    </button>
                    <div className="border-t border-white/10 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Terminar Sessão
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="font-bold">
                <Link href="/auth">Entrar</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 font-bold">
                <Link href="/auth">Criar Conta</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
