"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Radio, Bell, ExternalLink, LogOut, Settings, Menu, Tv } from "lucide-react"
import { toast } from "sonner"
import { DashboardSidebar } from "./dashboard-sidebar"

export function DashboardNav() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try { await logout(); router.push("/"); toast.success("Sessão terminada") }
    catch { toast.error("Erro ao terminar sessão") }
  }

  return (
    <header className="h-14 border-b border-border/50 bg-background/95 backdrop-blur flex items-center px-4 gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-3 lg:hidden">
        <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button></SheetTrigger>
          <SheetContent side="left" className="p-0 w-64"><DashboardSidebar /></SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2"><Tv className="w-5 h-5 text-primary" /><span className="font-bold text-sm">Studio</span></Link>
      </div>
      <div className="hidden lg:flex items-center gap-2"><span className="text-sm font-semibold">Kwanza Stream Studio</span><Badge variant="outline" className="text-[10px] h-5">Beta</Badge></div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Link href={`/${user?.username}`} target="_blank"><Button variant="ghost" size="sm" className="gap-1.5 hidden sm:flex text-xs"><ExternalLink className="w-3.5 h-3.5" />Ver canal</Button></Link>
        <Button size="sm" className="gap-1.5 bg-[#CE1126] hover:bg-[#CE1126]/90 text-xs" onClick={() => router.push("/dashboard/stream-manager")}><Radio className="w-3.5 h-3.5" /><span className="hidden sm:inline">Transmitir</span></Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/notificacoes")}><Bell className="w-4 h-4" /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><button><Avatar className="w-8 h-8"><AvatarImage src={user?.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary text-xs">{user?.displayName?.slice(0, 2).toUpperCase() ?? "KS"}</AvatarFallback></Avatar></button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/definicoes")}><Settings className="w-4 h-4 mr-2" />Definições</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Terminar sessão</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
