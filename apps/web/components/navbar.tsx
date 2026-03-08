"use client"
import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Radio, Wallet, LogOut, User, Settings, X, CheckCircle2, Users, Compass, MonitorPlay } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { NotificationBell } from "@/components/notification-bell"
import { searchService } from "@/lib/services"
import { LanguageSwitcher } from "@/components/language-switcher"

interface SearchResult {
  users?: { id: string; username: string; displayName: string; avatarUrl?: string; isVerified: boolean; followersCount: number }[]
  streams?: { id: string; title: string; category?: string; viewerCount: number; streamer: { id: string; displayName?: string; username?: string; avatarUrl?: string } }[]
}

export function Navbar() {
  const { user, isLoggedIn, isLoading, logout } = useAuth()
  const router = useRouter()
  const [showMenu, setShowMenu] = React.useState(false)
  const [showSearch, setShowSearch] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<SearchResult | null>(null)
  const [isSearching, setIsSearching] = React.useState(false)
  const [showResults, setShowResults] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const searchRef = React.useRef<HTMLDivElement>(null)
  const searchTimeout = React.useRef<NodeJS.Timeout | null>(null)

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Debounced search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    if (!value.trim()) {
      setSearchResults(null)
      setShowResults(false)
      return
    }
    setIsSearching(true)
    setShowResults(true)
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await searchService.search(value.trim())
        setSearchResults(res.data)
      } catch {
        setSearchResults(null)
      } finally {
        setIsSearching(false)
      }
    }, 300)
  }

  const navigateTo = (path: string) => {
    setShowResults(false)
    setSearchQuery("")
    setShowSearch(false)
    router.push(path)
  }

  const handleLogout = async () => {
    setShowMenu(false)
    await logout()
    router.push('/')
  }

  const hasResults = searchResults && ((searchResults.users?.length || 0) + (searchResults.streams?.length || 0)) > 0

  const SearchDropdown = () => (
    showResults && searchQuery.trim() ? (
      <div className="absolute top-full left-0 right-0 mt-2 surface-2 border border-border rounded-xl overflow-hidden z-50 max-h-80 overflow-y-auto custom-scrollbar" style={{ boxShadow: 'var(--shadow-lg)' }}>
        {isSearching ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            <div className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-2" />
            <p>A pesquisar...</p>
          </div>
        ) : hasResults ? (
          <>
            {(searchResults?.users?.length || 0) > 0 && (
              <div>
                <div className="px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest surface-3">Creators</div>
                {searchResults?.users?.map(u => (
                  <button key={u.id} onClick={() => navigateTo(`/profile/${u.id}`)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={u.avatarUrl || '/placeholder-user.jpg'} alt={u.displayName} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">{(u.displayName || u.username || '?')[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold truncate flex items-center gap-1.5">
                        {u.displayName || u.username}
                        {u.isVerified && <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary" />}
                      </p>
                      <p className="text-xs text-muted-foreground">@{u.username} · {u.followersCount} seguidores</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {(searchResults?.streams?.length || 0) > 0 && (
              <div>
                <div className="px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest surface-3">Lives</div>
                {searchResults?.streams?.map(s => (
                  <button key={s.id} onClick={() => navigateTo(`/stream/${s.id}`)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0">
                      <Radio className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold truncate">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.streamer?.displayName || s.streamer?.username} · {s.viewerCount} viewers</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="p-6 text-center text-sm text-muted-foreground">
            <Users className="w-5 h-5 mx-auto mb-2 opacity-40" />
            Nenhum resultado para &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    ) : null
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl overflow-visible">
      <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-6 max-w-[1600px] mx-auto">
        {/* Logo — always visible */}
        {!showSearch && (
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={isLoggedIn ? "/feed" : "/"}
              className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
            >
              <Image src="/kwanza-logo.png" alt="Kwanza Stream" width={30} height={30} className="rounded-lg" />
              <span className="font-bold text-lg tracking-tight hidden md:block">
                KWANZA <span className="text-secondary">STREAM</span>
              </span>
            </Link>
          </div>
        )}

        {/* Search — full bar on desktop, expandable on mobile */}
        {isLoggedIn && (
          <>
            {/* Desktop search */}
            <div className="hidden md:block flex-1 max-w-lg mx-6 relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Pesquisar creators, lives ou hashtags..."
                  className="w-full surface-4 border-border pl-10 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary h-10 rounded-xl text-sm"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchQuery.trim() && setShowResults(true)}
                />
              </div>
              <SearchDropdown />
            </div>

            {/* Mobile expanded search */}
            {showSearch && (
              <div className="flex-1 flex items-center gap-2 md:hidden relative" ref={searchRef}>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="search"
                    placeholder="Pesquisar..."
                    className="w-full surface-4 border-border pl-10 focus-visible:ring-1 focus-visible:ring-primary h-10 rounded-xl text-base"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => searchQuery.trim() && setShowResults(true)}
                  />
                </div>
                <button onClick={() => { setShowSearch(false); setSearchQuery(""); setShowResults(false) }} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <SearchDropdown />
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          {isLoggedIn && user ? (
            <>
              {/* Mobile search toggle */}
              {!showSearch && (
                <button onClick={() => setShowSearch(true)} className="p-2 text-muted-foreground hover:text-foreground transition-colors md:hidden rounded-lg hover:bg-white/5">
                  <Search className="w-5 h-5" />
                </button>
              )}

              {/* Language + Notification — desktop only */}
              <div className="hidden md:flex items-center gap-0.5">
                <LanguageSwitcher compact />
                <NotificationBell />
              </div>

              {/* Nav Links — desktop */}
              <div className="hidden md:flex items-center gap-1">
                <Button asChild variant="ghost" className="h-9 rounded-xl gap-1.5 text-muted-foreground hover:text-foreground font-medium text-sm">
                  <Link href="/streams">
                    <MonitorPlay className="h-4 w-4" />
                    Streams
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="h-9 rounded-xl gap-1.5 text-muted-foreground hover:text-foreground font-medium text-sm">
                  <Link href="/explore">
                    <Compass className="h-4 w-4" />
                    Explorar
                  </Link>
                </Button>
              </div>

              {/* Wallet badge */}
              <Button asChild variant="ghost" className="hidden md:flex gap-2 font-semibold text-primary h-9 rounded-xl hover:bg-primary/10">
                <Link href="/wallet">
                  <Wallet className="h-4 w-4" />
                  {(user.balance || 0).toLocaleString()} Kz
                </Link>
              </Button>

              {/* Go Live button */}
              <Button asChild size="sm" className="hidden md:flex font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl gap-1.5 h-9 px-4">
                <Link href="/stream">
                  <Radio className="h-3.5 w-3.5" />
                  Go Live
                </Link>
              </Button>

              {/* Profile Menu */}
              <div className="relative" ref={menuRef}>
                <Avatar
                  onClick={() => setShowMenu(!showMenu)}
                  className="h-8 w-8 cursor-pointer ring-offset-background transition-all hover:ring-2 hover:ring-primary/50 ring-offset-2"
                >
                  <AvatarImage src={user.avatarUrl || '/abstract-profile.png'} alt={user.displayName || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-xs">
                    {(user.displayName || user.username || 'U')[0]}
                  </AvatarFallback>
                </Avatar>

                {showMenu && (
                  <div className="absolute right-0 top-12 w-60 surface-2 border border-border rounded-xl py-1.5 animate-fade-in z-50" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-semibold text-sm truncate">{user.displayName || user.username || 'Utilizador'}</p>
                      {user.phone && <p className="text-xs text-muted-foreground mt-0.5">{user.phone}</p>}
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setShowMenu(false); router.push(`/profile/${user.id}`) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                      >
                        <User className="h-4 w-4 text-muted-foreground" /> O Meu Perfil
                      </button>
                      <button
                        onClick={() => { setShowMenu(false); router.push('/settings') }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                      >
                        <Settings className="h-4 w-4 text-muted-foreground" /> Definições
                      </button>
                      <button
                        onClick={() => { setShowMenu(false); router.push('/streams') }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors md:hidden"
                      >
                        <MonitorPlay className="h-4 w-4 text-muted-foreground" /> Streams Ao Vivo
                      </button>
                      <button
                        onClick={() => { setShowMenu(false); router.push('/explore') }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors md:hidden"
                      >
                        <Compass className="h-4 w-4 text-muted-foreground" /> Explorar
                      </button>
                      <button
                        onClick={() => { setShowMenu(false); router.push('/wallet') }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors md:hidden"
                      >
                        <Wallet className="h-4 w-4 text-muted-foreground" /> Carteira
                        <span className="ml-auto text-xs font-semibold text-primary">{(user.balance || 0).toLocaleString()} Kz</span>
                      </button>
                    </div>
                    <div className="border-t border-border pt-1">
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
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="font-semibold h-9 rounded-xl">
                <Link href="/auth">Entrar</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 font-semibold h-9 rounded-xl px-5">
                <Link href="/auth">Criar Conta</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
