"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  Settings,
  Edit,
  MapPin,
  Calendar,
  LinkIcon,
  CheckCircle2,
  Wallet,
  ArrowUpRight,
  Grid,
  Video,
  Info,
  Gift,
  Heart,
} from "lucide-react"

interface UserPost {
  id: string
  image: string
  likes: number
}

export default function ProfilePage() {
  const { user, isLoggedIn, isLoading, updateProfile, logout } = useAuth()
  const router = useRouter()
  const [editName, setEditName] = React.useState("")
  const [editBio, setEditBio] = React.useState("")
  const [editLocation, setEditLocation] = React.useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [userPosts, setUserPosts] = React.useState<UserPost[]>([])

  React.useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth")
    }
  }, [isLoggedIn, isLoading, router])

  React.useEffect(() => {
    if (user) {
      setEditName(user.displayName || "")
      setEditBio(user.bio || "Criador de conteúdo na Kwanza Stream")
      setEditLocation(user.location || "Luanda")

      // Generate sample posts
      const posts: UserPost[] = [
        { id: "1", image: "/post-.jpg?height=400&width=400&query=post-1", likes: 12000 },
        { id: "2", image: "/post-.jpg?height=400&width=400&query=post-2", likes: 8500 },
        { id: "3", image: "/post-.jpg?height=400&width=400&query=post-3", likes: 15200 },
        { id: "4", image: "/post-.jpg?height=400&width=400&query=post-4", likes: 9800 },
        { id: "5", image: "/post-.jpg?height=400&width=400&query=post-5", likes: 11400 },
        { id: "6", image: "/post-.jpg?height=400&width=400&query=post-6", likes: 7600 },
      ]
      setUserPosts(posts)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isLoggedIn || !user) {
    return null
  }

  const handleSaveProfile = async () => {
    await updateProfile({
      displayName: editName,
      bio: editBio,
      location: editLocation,
    })
    setIsEditDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header / Cover */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-linear-to-br from-primary via-secondary to-black">
        <div className="absolute inset-0 angola-pattern opacity-10" />
        <div className="absolute -bottom-16 left-4 md:left-8 flex items-end gap-4 md:gap-6">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl rounded-2xl ring-4 ring-white/5">
            <AvatarImage src={user?.avatar || "/abstract-profile.png"} alt={user?.displayName} />
            <AvatarFallback>{user?.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-black/40 backdrop-blur-md border-white/10 text-white"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10">
              <DialogHeader>
                <DialogTitle>Configurações da Conta</DialogTitle>
                <DialogDescription>Gerir segurança e preferências</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Button variant="outline" className="w-full border-white/10 bg-transparent" onClick={logout}>
                  Sair da Conta
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter">{user?.displayName}</h1>
              <CheckCircle2 className="h-6 w-6 text-primary fill-primary text-white" />
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold">
                CRIADOR
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg font-medium">
              @{user?.displayName?.toLowerCase().replace(/\s/g, "")}
            </p>
          </div>

          <p className="text-foreground/90 leading-relaxed">
            {user?.bio ||
              "Criador de conteúdo na Kwanza Stream. 🇦🇴 A construir pontes entre a criatividade e a economia digital."}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {user?.location || "Luanda"}, Angola
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              <a href="#" className="text-primary hover:underline font-bold">
                kwanzastream.ao
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Entrou em{" "}
              {new Date(user?.createdAt || Date.now()).toLocaleDateString("pt-AO", {
                year: "numeric",
                month: "long",
              })}
            </div>
          </div>

          <div className="flex gap-8 py-2">
            <div>
              <span className="text-xl font-black text-foreground">{(user?.followers || 0).toLocaleString()}</span>
              <span className="ml-1 text-muted-foreground text-sm uppercase tracking-widest font-bold">Seguidores</span>
            </div>
            <div>
              <span className="text-xl font-black text-foreground">{(user?.following || 0).toLocaleString()}</span>
              <span className="ml-1 text-muted-foreground text-sm uppercase tracking-widest font-bold">Seguindo</span>
            </div>
            <div>
              <span className="text-xl font-black text-foreground">{Math.floor((user?.followers || 0) * 0.1)}</span>
              <span className="ml-1 text-muted-foreground text-sm uppercase tracking-widest font-bold">Lives</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 md:flex-none bg-white text-black hover:bg-white/90 font-bold rounded-xl px-8 h-12">
                <Edit className="mr-2 h-4 w-4" /> Editar Perfil
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10">
              <DialogHeader>
                <DialogTitle>Editar Perfil</DialogTitle>
                <DialogDescription>Atualiza as informações do teu perfil</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="w-full bg-primary hover:bg-primary/90">
                  Guardar Alterações
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="flex-1 md:flex-none border-white/10 bg-white/5 font-bold rounded-xl px-8 h-12"
          >
            Partilhar
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Main Content Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none h-auto p-0 mb-6 space-x-8">
              <TabsTrigger
                value="posts"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-4 text-base font-bold transition-none"
              >
                <Grid className="mr-2 h-4 w-4" /> Posts ({userPosts.length})
              </TabsTrigger>
              <TabsTrigger
                value="lives"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-4 text-base font-bold transition-none"
              >
                <Video className="mr-2 h-4 w-4" /> Lives Passadas
              </TabsTrigger>
              <TabsTrigger
                value="sobre"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-4 text-base font-bold transition-none"
              >
                <Info className="mr-2 h-4 w-4" /> Sobre
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-0">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer relative"
                >
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-4 text-white font-bold">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4 fill-white" /> {(post.likes / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="lives" className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-0">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 group cursor-pointer">
                  <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10 bg-white/5">
                    <img
                      src={`/live-.jpg?height=300&width=533&query=live-${i}`}
                      alt="Past Live"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge className="bg-black/60 backdrop-blur-md border-none font-bold">45:20</Badge>
                      <Badge className="bg-black/60 backdrop-blur-md border-none font-bold">8.5K Views</Badge>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                    Transmissão ao Vivo {i}
                  </h4>
                  <p className="text-sm text-muted-foreground">Há 2 semanas • Categoria: Diversão</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="sobre" className="space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <Separator className="bg-white/10" />
                  <div>
                    <Label className="text-muted-foreground">Telefone</Label>
                    <p className="font-medium">{user?.telefone || "+244 9XX XXX XXX"}</p>
                  </div>
                  <Separator className="bg-white/10" />
                  <div>
                    <Label className="text-muted-foreground">Localização</Label>
                    <p className="font-medium">{user?.location || "Luanda, Angola"}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Monetization & Wallet */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-linear-to-br from-primary/10 to-transparent backdrop-blur-xl overflow-hidden relative group">
            <div className="absolute -right-8 -top-8 opacity-10 group-hover:scale-110 transition-transform">
              <Wallet className="w-32 h-32" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" /> Minha Carteira
              </CardTitle>
              <CardDescription>Ganhos acumulados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Saldo Disponível</p>
                <p className="text-4xl font-black text-foreground">
                  {(user?.balance || 0).toLocaleString()} <span className="text-primary">Kz</span>
                </p>
              </div>

              <Separator className="bg-white/10" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Gifts Recebidos</p>
                  <p className="text-lg font-bold">{((user?.balance || 0) * 0.36).toLocaleString()} Kz</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Subscrições</p>
                  <p className="text-lg font-bold">{((user?.balance || 0) * 0.64).toLocaleString()} Kz</p>
                </div>
              </div>

              <Link href="/wallet">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black h-12 shadow-lg shadow-primary/20">
                  Levantar via Multicaixa <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5 text-secondary" /> Enviar Presente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Apoia este creator enviando um presente digital.</p>
              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 5000].map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    className="border-white/10 bg-transparent hover:border-primary font-bold text-xs h-10"
                  >
                    {val} Kz
                  </Button>
                ))}
              </div>
              <Button variant="secondary" className="w-full bg-secondary text-black font-black">
                Outro Valor
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Badges & Conquistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 px-3 py-1">Top Creator</Badge>
                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1">Pioneer</Badge>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1">Verified</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
