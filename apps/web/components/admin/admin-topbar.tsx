"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Shield, ExternalLink, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export function AdminTopbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <header className="h-12 border-b border-border/50 bg-background flex items-center px-4 gap-3 sticky top-0 z-40">
      <div className="flex items-center gap-2.5"><Shield className="w-4 h-4 text-[#CE1126]" /><span className="font-bold text-sm tracking-tight">KS Admin</span><Badge className="bg-[#CE1126]/10 text-[#CE1126] text-[10px] h-4 px-1.5 border border-[#CE1126]/20">ADMIN</Badge></div>
      <div className="flex-1" />
      <Link href="/feed" target="_blank"><Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7"><ExternalLink className="w-3 h-3" />Ver plataforma</Button></Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><button><Avatar className="w-7 h-7"><AvatarImage src={user?.avatarUrl} /><AvatarFallback className="bg-[#CE1126]/20 text-[#CE1126] text-xs">{user?.displayName?.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar></button></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <div className="px-2 py-1.5"><p className="text-xs font-medium">{user?.displayName}</p><p className="text-[10px] text-muted-foreground">{user?.email}</p></div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/admin/config")}><Settings className="w-3.5 h-3.5 mr-2" />Configurações</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={async () => { await logout(); router.push("/entrar"); toast.success("Sessão terminada") }}><LogOut className="w-3.5 h-3.5 mr-2" />Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
