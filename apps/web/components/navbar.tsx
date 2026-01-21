"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, MessageCircle, Radio, Wallet } from "lucide-react"
import Link from "next/link"

interface NavbarProps {
  userLoggedIn?: boolean
  userBalance?: number
  userNotifications?: number
}

export function Navbar({ userLoggedIn = false, userBalance = 0, userNotifications = 0 }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link
            href={userLoggedIn ? "/feed" : "/"}
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

        {userLoggedIn && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar creators, lives ou hashtags..."
                className="w-full bg-white/5 border-white/10 pl-9 focus-visible:ring-primary h-9"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {userLoggedIn ? (
            <>
              <Button asChild variant="ghost" className="hidden md:flex gap-2 font-bold text-primary h-9">
                <Link href="/wallet">
                  <Wallet className="h-4 w-4" />
                  {userBalance.toLocaleString()} Kz
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground relative h-9 w-9">
                <Bell className="h-5 w-5" />
                {userNotifications > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:flex font-bold text-primary">
                <Radio className="mr-2 h-4 w-4" /> Go Live
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer ring-offset-background transition-all hover:ring-2 hover:ring-primary ring-offset-2">
                <AvatarImage src="/abstract-profile.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
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
