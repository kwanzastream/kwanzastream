"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Search, Bell, Menu, Radio, User, Settings,
  LogOut, LayoutDashboard, Wallet, Tv, Zap
} from "lucide-react"
import { toast } from "sonner"

interface NavbarProps {
  variant?: "public" | "main"
}

export function Navbar({ variant = "public" }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return
    api.get("/api/notifications/unread-count")
      .then((res) => setUnreadCount(res.data?.count ?? 0))
      .catch(() => { })
  }, [isAuthenticated, pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
      toast.success("Sessão terminada")
    } catch {
      toast.error("Erro ao terminar sessão")
    }
  }

  const initials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : user?.username?.slice(0, 2).toUpperCase() ?? "KS"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <Link href={isAuthenticated ? "/feed" : "/"} className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <Tv className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block tracking-tight">Kwanza Stream</span>
        </Link>

        {/* Nav links (public, desktop) */}
        {variant === "public" && (
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {[
              { href: "/explorar", label: "Explorar" },
              { href: "/ao-vivo", label: "Ao Vivo" },
              { href: "/categoria/gaming", label: "Gaming" },
              { href: "/categoria/musica", label: "Música" },
              { href: "/radio", label: "Rádio" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Search (main variant) */}
        {variant === "main" && (
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Pesquisar streams, canais, jogos..." className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </form>
        )}

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {variant === "main" && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push("/pesquisa")}>
              <Search className="w-5 h-5" />
            </Button>
          )}

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-primary" onClick={() => router.push("/dashboard/stream-manager")}>
                <Radio className="w-4 h-4" /><span className="text-xs font-medium">Transmitir</span>
              </Button>

              <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/notificacoes")}>
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 rounded-full hover:opacity-80 transition-opacity">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatarUrl} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">{initials}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="font-medium truncate">{user?.displayName || user?.username}</p>
                    <p className="text-xs text-muted-foreground font-normal truncate">@{user?.username}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push(`/${user?.username}`)}><User className="w-4 h-4 mr-2" />O meu canal</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wallet")}>
                    <Wallet className="w-4 h-4 mr-2" /><span className="flex-1">Carteira</span>
                    {user?.balance !== undefined && <span className="text-xs text-muted-foreground">{(user.balance / 100).toLocaleString("pt-AO")} Kz</span>}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/definicoes")}><Settings className="w-4 h-4 mr-2" />Definições</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Terminar sessão</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/entrar"><Button variant="ghost" size="sm">Entrar</Button></Link>
              <Link href="/registar"><Button size="sm" className="hidden sm:flex"><Zap className="w-3.5 h-3.5 mr-1.5" />Criar conta</Button></Link>
            </>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden"><Menu className="w-5 h-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <MobileMenu isAuthenticated={isAuthenticated} user={user} onClose={() => setMobileMenuOpen(false)} onLogout={handleLogout} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ isAuthenticated, user, onClose, onLogout }: { isAuthenticated: boolean; user: any; onClose: () => void; onLogout: () => void }) {
  const router = useRouter()
  const navigate = (href: string) => { router.push(href); onClose() }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-primary/20 text-primary">{user?.displayName?.slice(0, 2).toUpperCase() ?? "KS"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user?.displayName || user?.username}</p>
              <p className="text-xs text-muted-foreground">@{user?.username}</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button className="flex-1" size="sm" onClick={() => navigate("/registar")}>Criar conta</Button>
            <Button variant="outline" className="flex-1" size="sm" onClick={() => navigate("/entrar")}>Entrar</Button>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {[
          { href: "/explorar", icon: "🔭", label: "Explorar" },
          { href: "/ao-vivo", icon: "🔴", label: "Ao Vivo" },
          { href: "/categoria/gaming", icon: "🎮", label: "Gaming" },
          { href: "/categoria/musica", icon: "🎵", label: "Música" },
          { href: "/categoria/futebol", icon: "⚽", label: "Futebol" },
          { href: "/radio", icon: "📻", label: "Rádio" },
          { href: "/torneios", icon: "🏆", label: "Torneios" },
          { href: "/leaderboard", icon: "📊", label: "Leaderboard" },
        ].map((item) => (
          <button key={item.href} onClick={() => navigate(item.href)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors text-left">
            <span>{item.icon}</span><span>{item.label}</span>
          </button>
        ))}

        {isAuthenticated && (
          <>
            <div className="pt-2 pb-1"><p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">A minha conta</p></div>
            {[
              { href: "/", icon: "👤", label: "O meu canal" },
              { href: "/feed", icon: "🏠", label: "Feed" },
              { href: "/mensagens", icon: "💬", label: "Mensagens" },
              { href: "/notificacoes", icon: "🔔", label: "Notificações" },
              { href: "/wallet", icon: "💰", label: "Carteira" },
              { href: "/dashboard", icon: "🎛️", label: "Dashboard" },
              { href: "/definicoes", icon: "⚙️", label: "Definições" },
            ].map((item) => (
              <button key={item.href} onClick={() => navigate(item.href === "/" && user?.username ? `/${user.username}` : item.href)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors text-left">
                <span>{item.icon}</span><span>{item.label}</span>
              </button>
            ))}
          </>
        )}
      </nav>

      {isAuthenticated && (
        <div className="p-3 border-t">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-4 h-4" />Terminar sessão
          </button>
        </div>
      )}
    </div>
  )
}
