"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search, Mic, Users, Radio, CheckCircle2, X } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const recentSearches = ["Kuduro Mix 2024", "Anselmo Ralph", "#TechAngola", "Luanda Lives"]

function SearchContent() {
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-4xl mx-auto w-full md:border-x border-white/10">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 space-y-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/feed" className="md:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Search className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Procurar creators, lives, hashtags..."
              className="w-full bg-white/5 border-white/10 pl-11 pr-10 h-11 rounded-xl text-base focus-visible:ring-primary"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1.5 h-8 w-8 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-white/10 bg-white/5 shrink-0">
            <Mic className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Filters/Recent Searches */}
        {!searchQuery && (
          <div className="space-y-3 pt-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
              Recentemente
            </h3>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-2">
                {recentSearches.map((s) => (
                  <Button
                    key={s}
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold h-8 px-4"
                    onClick={() => setSearchQuery(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-background border-b border-white/10 rounded-none h-14 p-0">
          <TabsTrigger
            value="all"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-black text-xs uppercase"
          >
            Tudo
          </TabsTrigger>
          <TabsTrigger
            value="lives"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-black text-xs uppercase"
          >
            Lives
          </TabsTrigger>
          <TabsTrigger
            value="people"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-black text-xs uppercase"
          >
            Pessoas
          </TabsTrigger>
          <TabsTrigger
            value="tags"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-black text-xs uppercase"
          >
            Hashtags
          </TabsTrigger>
        </TabsList>

        <div className="p-4 md:p-6 pb-24">
          <TabsContent value="all" className="mt-0 space-y-10">
            {/* Top Results */}
            <section className="space-y-4">
              <h3 className="text-lg font-black uppercase tracking-tighter">Melhor Correspondência</h3>
              <div className="p-4 rounded-2xl bg-white/5 border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src="/abstract-profile.png" alt="Preto Show" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h4 className="text-lg font-black flex items-center gap-2">
                      Preto Show <CheckCircle2 className="h-4 w-4 text-primary fill-primary text-white" />
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium">920K Seguidores • @pretoshow_oficial</p>
                    <p className="text-xs text-foreground/80 mt-1 line-clamp-1">
                      O rei do Kuduro e da energia angolana. 🇦🇴🔥
                    </p>
                  </div>
                </div>
                <Button className="rounded-full bg-white text-black hover:bg-white/90 font-black px-6">Seguir</Button>
              </div>
            </section>

            {/* Active Lives */}
            <section className="space-y-4">
              <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                <Radio className="h-5 w-5 text-red-500" /> Lives Ao Vivo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SearchLiveCard
                  title="Produção de Beats ao Vivo"
                  name="DJ Luanda"
                  viewers="1.2K"
                  image="/recording-studio.png"
                />
                <SearchLiveCard
                  title="Gaming: Squad Nacional"
                  name="Ninja Angolano"
                  viewers="850"
                  image="/gaming-setup.png"
                />
              </div>
            </section>

            {/* Trending Hashtags */}
            <section className="space-y-4">
              <h3 className="text-lg font-black uppercase tracking-tighter">Hashtags Relacionadas</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="px-4 py-2 border-white/10 bg-white/5 text-sm font-bold rounded-full"
                >
                  #KuduroAngola
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2 border-white/10 bg-white/5 text-sm font-bold rounded-full"
                >
                  #SomDeLuanda
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2 border-white/10 bg-white/5 text-sm font-bold rounded-full"
                >
                  #TechAO
                </Badge>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="people" className="mt-0 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-white/10">
                    <AvatarImage src="/abstract-profile.png" alt="Creator" />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold flex items-center gap-1">
                      Angolano Creator {i} <CheckCircle2 className="h-3 w-3 text-primary fill-primary text-white" />
                    </h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                      {i * 10}K Seguidores
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-bold h-9 px-6"
                >
                  Seguir
                </Button>
              </div>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function SearchLiveCard({ title, name, viewers, image }: any) {
  return (
    <div className="group cursor-pointer space-y-2">
      <div className="aspect-video rounded-xl overflow-hidden relative border border-white/10">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-red-600 border-none text-[10px] font-black px-2 py-0.5">AO VIVO</Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-black/70 backdrop-blur-md border-none text-[10px] flex items-center gap-1 font-bold">
            <Users className="w-3 h-3" /> {viewers}
          </Badge>
        </div>
      </div>
      <div className="px-1">
        <h4 className="text-xs font-bold truncate group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-[10px] text-muted-foreground font-medium">{name}</p>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  )
}
