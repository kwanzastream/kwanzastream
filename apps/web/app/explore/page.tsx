"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search, Flame, TrendingUp, Radio, Users, MapPin, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"

const categories = ["Todos", "Música", "Kuduro", "Gaming", "Culinária", "Educação", "Negócios", "Religião"]
const provinces = ["Todas Províncias", "Luanda", "Benguela", "Huambo", "Huíla", "Cabinda"]

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = React.useState("Todos")
  const [activeProvince, setActiveProvince] = React.useState("Todas Províncias")

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar userLoggedIn={true} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-10">
            {/* Category Pills */}
            <section>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full px-6 font-bold transition-all ${
                        activeCategory === cat
                          ? "bg-primary text-white"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>

            {/* Featured Carousel Placeholder */}
            <section className="relative group">
              <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl">
                <img
                  src="/vibrant-concert-stage.png"
                  alt="Featured Event"
                  className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-linear-to-t from-black via-transparent to-transparent">
                  <Badge className="w-fit mb-4 bg-primary border-none text-white font-bold animate-pulse">
                    <Flame className="w-3 h-3 mr-1" /> EM DESTAQUE
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">Festival Som de Luanda 2025</h2>
                  <p className="text-lg text-white/80 max-w-xl mb-6 font-medium">
                    Acompanha em direto os maiores artistas de Angola no palco principal. 🇦🇴
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-white text-black hover:bg-white/90 font-black rounded-full px-8">
                      Ver Agora
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-black/40 border-white/20 hover:bg-black/60 font-black rounded-full px-8"
                    >
                      Ver Perfil
                    </Button>
                  </div>
                </div>
                <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-black/50 text-white border-white/20"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-black/50 text-white border-white/20"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Popular Lives Grid */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <Radio className="h-6 w-6 text-red-600" /> Lives Populares Agora
                </h3>
                <div className="flex gap-2">
                  <ScrollArea className="max-w-[300px] whitespace-nowrap hidden md:block">
                    <div className="flex gap-2 p-1">
                      {provinces.map((prov) => (
                        <Badge
                          key={prov}
                          variant={activeProvince === prov ? "default" : "outline"}
                          onClick={() => setActiveProvince(prov)}
                          className={`cursor-pointer border-white/10 font-bold px-3 py-1 ${
                            activeProvince === prov ? "bg-secondary text-black" : "bg-white/5 text-muted-foreground"
                          }`}
                        >
                          {prov}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <LiveCard
                  thumbnail="/recording-studio.png"
                  avatar="/abstract-profile.png"
                  name="Anselmo Ralph"
                  title="Produção do Novo Álbum em Direto"
                  viewers="5.2K"
                  category="Música"
                  verified
                />
                <LiveCard
                  thumbnail="/gaming-setup.png"
                  avatar="/abstract-profile.png"
                  name="Ninja Angolano"
                  title="Sexta-feira de Gaming: Solo vs Squad"
                  viewers="1.8K"
                  category="Gaming"
                />
                <LiveCard
                  thumbnail="/diverse-food-spread.png"
                  avatar="/abstract-profile.png"
                  name="Tia Maria"
                  title="Segredos do Mufete de Peixe"
                  viewers="3.1K"
                  category="Culinária"
                />
                <LiveCard
                  thumbnail="/vibrant-concert-stage.png"
                  avatar="/abstract-profile.png"
                  name="Yola Semedo"
                  title="Ensaio para a Tour 2025"
                  viewers="2.4K"
                  category="Música"
                  verified
                />
              </div>
            </section>

            {/* Featured Creators Row */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <Users className="h-6 w-6 text-primary" /> Creators em Destaque
                </h3>
                <Button variant="link" className="text-primary font-bold">
                  Ver todos
                </Button>
              </div>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {[
                    { name: "Gilmário Vemba", followers: "850K", handle: "@gilmario" },
                    { name: "C4 Pedro", followers: "1.2M", handle: "@c4pedro" },
                    { name: "Sandra Gomes", followers: "150K", handle: "@sandrag" },
                    { name: "Preto Show", followers: "920K", handle: "@pretoshow" },
                    { name: "Ary", followers: "680K", handle: "@ary_diva" },
                    { name: "Puto Português", followers: "420K", handle: "@putoportugues" },
                  ].map((creator) => (
                    <div
                      key={creator.handle}
                      className="w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 group hover:border-primary/50 transition-all cursor-pointer"
                    >
                      <Avatar className="h-20 w-20 mx-auto ring-2 ring-transparent group-hover:ring-primary ring-offset-4 ring-offset-background transition-all">
                        <AvatarImage
                          src={`/.jpg?key=kkbj7&height=80&width=80&query=${creator.name}`}
                          alt={creator.name}
                        />
                        <AvatarFallback>{creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold truncate flex items-center justify-center gap-1">
                          {creator.name} <CheckCircle2 className="h-3 w-3 text-primary fill-primary text-white" />
                        </h4>
                        <p className="text-xs text-muted-foreground">{creator.followers} seguidores</p>
                      </div>
                      <Button size="sm" className="w-full rounded-full bg-white text-black hover:bg-white/80 font-bold">
                        Seguir
                      </Button>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>

            {/* Trending Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <TrendingUp className="h-6 w-6" /> Tendências em Angola
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TrendingCard hashtag="#UnitelFesta" posts="45K" color="bg-primary" />
                  <TrendingCard hashtag="#KuduroPower" posts="120K" color="bg-secondary" />
                  <TrendingCard hashtag="#AngolaModa" posts="12K" color="bg-blue-500" />
                  <TrendingCard hashtag="#LuandaNoite" posts="89K" color="bg-red-500" />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <MapPin className="h-6 w-6 text-secondary" /> Próximo de Ti
                </h3>
                <div className="p-6 rounded-2xl bg-linear-to-br from-white/10 to-transparent border border-white/10 space-y-4">
                  <p className="text-sm text-muted-foreground">Encontra eventos e creators na tua província.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-sm font-bold">Luanda</span>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                        156 Lives
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 opacity-60">
                      <span className="text-sm font-bold">Benguela</span>
                      <Badge variant="secondary" className="bg-white/10 text-white border-none">
                        42 Lives
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold rounded-xl">
                    Mudar Localização
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </Suspense>
  )
}

function LiveCard({ thumbnail, avatar, name, title, viewers, category, verified = false }: any) {
  return (
    <div className="group cursor-pointer space-y-3">
      <div className="aspect-video rounded-xl overflow-hidden relative border border-white/10">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-red-600 border-none text-[10px] font-bold px-2 py-0.5">AO VIVO</Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-black/70 backdrop-blur-md border-none text-[10px] flex items-center gap-1 font-bold">
            <Users className="w-3 h-3" /> {viewers}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <Radio className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border border-white/10">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
            {name} {verified && <CheckCircle2 className="h-3 w-3 text-primary fill-primary text-white" />}
          </p>
          <Badge variant="outline" className="mt-2 text-[10px] h-5 border-white/10 bg-white/5 text-muted-foreground">
            {category}
          </Badge>
        </div>
      </div>
    </div>
  )
}

function TrendingCard({ hashtag, posts, color }: any) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group flex items-center justify-between">
      <div className="space-y-1">
        <p className={`text-sm font-black group-hover:underline`}>{hashtag}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{posts} posts esta semana</p>
      </div>
      <div className={`w-2 h-10 rounded-full ${color} opacity-50 group-hover:opacity-100 transition-opacity`} />
    </div>
  )
}
