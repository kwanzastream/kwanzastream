"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Video, 
  Radio, 
  Users, 
  TrendingUp, 
  Clock, 
  MapPin, 
  CheckCircle2,
  Flame,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useParams } from "next/navigation"

const categoryMap: Record<string, {
  name: string
  description: string
  icon: React.ReactNode
  color: string
}> = {
  "jogos-esports": {
    name: "Jogos & eSports",
    description: "Gameplays, competições e torneios de eSports angolanos",
    icon: <Video className="w-6 h-6" />,
    color: "from-blue-600 to-purple-600"
  },
  "igrejas-espiritualidade": {
    name: "Igrejas & Espiritualidade",
    description: "Cultos, pregações e momentos de fé ao vivo",
    icon: <Users className="w-6 h-6" />,
    color: "from-yellow-600 to-orange-600"
  },
  "educacao": {
    name: "Educação",
    description: "Aulas, tutoriais e conteúdo educacional",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-green-600 to-emerald-600"
  },
  "podcasts-conversas": {
    name: "Podcasts & Conversas",
    description: "Conversas, debates e podcasts ao vivo",
    icon: <Radio className="w-6 h-6" />,
    color: "from-pink-600 to-rose-600"
  },
  "djs-musica": {
    name: "DJs & Música",
    description: "Sets de DJs, shows musicais e festas",
    icon: <Radio className="w-6 h-6" />,
    color: "from-purple-600 to-indigo-600"
  },
  "negocios-empreendedorismo": {
    name: "Negócios & Empreendedorismo",
    description: "Dicas de negócios, networking e empreendedorismo",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-cyan-600 to-blue-600"
  },
  "arte-cultura": {
    name: "Arte & Cultura",
    description: "Arte, cultura angolana e expressões artísticas",
    icon: <Users className="w-6 h-6" />,
    color: "from-red-600 to-pink-600"
  },
  "comunidade-vida-local": {
    name: "Comunidade & Vida Local",
    description: "Vida local, comunidade e eventos regionais",
    icon: <MapPin className="w-6 h-6" />,
    color: "from-orange-600 to-red-600"
  }
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params?.slug as string
  const category = categoryMap[slug] || categoryMap["jogos-esports"]

  // Mock data
  const liveStreams = [
    {
      id: "1",
      title: "Torneio de FIFA 25 - Final",
      creator: "Gaming Angola",
      avatar: "/abstract-profile.png",
      viewers: 1250,
      thumbnail: "/api/placeholder/400/225",
      isLive: true
    },
    {
      id: "2",
      title: "Ranked Match - Valorant",
      creator: "ProGamerAO",
      avatar: "/abstract-profile.png",
      viewers: 890,
      thumbnail: "/api/placeholder/400/225",
      isLive: true
    }
  ]

  const topCreators = [
    { id: "1", name: "Gaming Angola", avatar: "/abstract-profile.png", followers: 12500, verified: true },
    { id: "2", name: "ProGamerAO", avatar: "/abstract-profile.png", followers: 8900, verified: true },
    { id: "3", name: "eSports Luanda", avatar: "/abstract-profile.png", followers: 5600, verified: false }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Link href="/categorias">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Categorias
              </Button>
            </Link>

            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                {category.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-black tracking-tighter mb-2">{category.name}</h1>
                <p className="text-muted-foreground text-lg">{category.description}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Live Streams */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary" />
                Lives ao Vivo
              </h2>
              <Button variant="outline" size="sm">Ver Todas</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map((stream) => (
                <Link key={stream.id} href={`/stream/${stream.id}`}>
                  <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer group">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {stream.isLive && (
                        <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
                          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse mr-2" />
                          AO VIVO
                        </Badge>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <p className="font-bold text-sm line-clamp-1">{stream.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={stream.avatar} />
                            <AvatarFallback>{stream.creator[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{stream.creator}</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        <Users className="w-3 h-3" />
                        {stream.viewers.toLocaleString()}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Top Creators */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Criadores em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topCreators.map((creator) => (
                <Card key={creator.id} className="hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold truncate">{creator.name}</h3>
                          {creator.verified && (
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {creator.followers.toLocaleString()} seguidores
                        </p>
                        <Button size="sm" className="mt-2 w-full">Seguir</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Replays */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Replays Populares
              </h2>
              <Button variant="outline" size="sm">Ver Mais</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      <Clock className="w-3 h-3 inline mr-1" />
                      2h atrás
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm line-clamp-2">Replay de Live #{i}</p>
                    <p className="text-xs text-muted-foreground mt-1">1.2K visualizações</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
