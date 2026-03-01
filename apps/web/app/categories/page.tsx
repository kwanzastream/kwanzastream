"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search, Music, Gamepad2, GraduationCap, Briefcase, Heart, Filter, Users, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const categories = [
  {
    id: "musica",
    name: "Música",
    icon: <Music />,
    color: "from-purple-600",
    desc: "Os ritmos de Angola: Kuduro, Semba e mais.",
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: <Gamepad2 />,
    color: "from-blue-600",
    desc: "Melhores gameplays e competições nacionais.",
  },
  {
    id: "educacao",
    name: "Educação",
    icon: <GraduationCap />,
    color: "from-green-600",
    desc: "Aprende novas skills com creators angolanos.",
  },
  {
    id: "negocios",
    name: "Negócios",
    icon: <Briefcase />,
    color: "from-orange-600",
    desc: "Empreendedorismo e economia digital em Angola.",
  },
]

function CategoriesContent() {
  const [activeCat, setActiveCat] = React.useState(categories[0])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Dynamic Header */}
      <section className={`h-64 md:h-80 bg-linear-to-br ${activeCat.color} to-black relative overflow-hidden shrink-0`}>
        <div className="absolute inset-0 angola-pattern opacity-10" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 md:px-8 space-y-4">
          <Link href="/feed">
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/20 text-white hover:bg-black/40 border-none rounded-full mb-4"
            >
              ← Voltar ao Feed
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
              {React.cloneElement(activeCat.icon as React.ReactElement<any>, { className: "w-10 h-10" })}
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                {activeCat.name}
              </h1>
              <p className="text-lg text-white/80 font-medium max-w-xl">{activeCat.desc}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Badge className="bg-white/20 text-white border-none font-bold py-1 px-4">12.5K Seguidores</Badge>
            <Button className="bg-white text-black hover:bg-white/90 font-black rounded-full px-8">Seguir Canal</Button>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-10">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <ScrollArea className="w-full md:w-auto">
            <div className="flex gap-2 pb-2">
              {["Mais Populares", "Ao Vivo Agora", "Recentemente", "Mais Vistos"].map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xs"
                >
                  {filter}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filtrar nesta categoria..."
                className="bg-white/5 border-white/10 pl-10 h-9 rounded-full text-xs"
              />
            </div>
            <Button size="icon" variant="outline" className="rounded-full border-white/10 h-9 w-9 bg-transparent">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeCat.id === "musica" && (
            <>
              <CategoryStreamCard
                title="Ensaio para o Coliseu"
                name="Anselmo Ralph"
                viewers="3.4K"
                image="/recording-studio.png"
                isLive
                verified
              />
              <CategoryStreamCard
                title="Mix de Kuduro 2024"
                name="DJ Luanda"
                viewers="1.2K"
                image="/vibrant-concert-stage.png"
                isLive
              />
              <CategoryStreamCard
                title="Semba das Quintas"
                name="Yola Semedo"
                viewers="5.6K"
                image="/recording-studio.png"
                verified
              />
              <CategoryStreamCard
                title="Novo Som: Afrobeat AO"
                name="Preto Show"
                viewers="900"
                image="/vibrant-concert-stage.png"
                isLive
                verified
              />
            </>
          )}
        </div>

        {/* Sidebar Style Section - Top Creators */}
        <section className="space-y-6 pt-10 border-t border-white/10">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" /> Top Creators de {activeCat.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-white/10">
                    <AvatarImage src="/abstract-profile.png" alt="Creator" />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold truncate flex items-center gap-1">
                      Creator {i} <CheckCircle2 className="h-3 w-3 text-primary fill-primary text-white" />
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      120K Seguidores
                    </p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full text-muted-foreground group-hover:text-primary"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Category Navigation Footer - Mobile Only */}
      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-white/10 p-4 md:hidden overflow-x-auto">
        <div className="flex gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat)}
              className={`flex flex-col items-center gap-1 min-w-[60px] ${activeCat.id === cat.id ? "text-primary" : "text-muted-foreground"}`}
            >
              <div className={`p-2 rounded-xl ${activeCat.id === cat.id ? "bg-primary/20" : "bg-white/5"}`}>
                {React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
              </div>
              <span className="text-[10px] font-bold">{cat.name}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  )
}

function CategoryStreamCard({ title, name, viewers, image, isLive = false, verified = false }: any) {
  return (
    <div className="group cursor-pointer space-y-3">
      <div className="aspect-video rounded-xl overflow-hidden relative border border-white/10 bg-black/40">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {isLive && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-600 border-none text-[10px] font-black px-2 py-0.5">AO VIVO</Badge>
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-black/70 backdrop-blur-md border-none text-[10px] flex items-center gap-1 font-bold">
            <Users className="w-3 h-3" /> {viewers}
          </Badge>
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-muted-foreground flex items-center gap-1 truncate font-medium">
          {name} {verified && <CheckCircle2 className="h-3 w-3 text-primary fill-primary text-white" />}
        </p>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={null}>
      <CategoriesContent />
    </Suspense>
  )
}
