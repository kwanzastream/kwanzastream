'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Home,
  Video,
  MessageCircle,
  User,
  Wallet,
  Settings,
  LogOut,
  Plus,
  Heart,
  Share2,
  MoreHorizontal,
  ImageIcon,
  Radio,
  Flame,
  TrendingUp,
  Globe,
  CheckCircle2,
  Gift,
  Users,
  Clock,
  Search,
  TrendingDown,
  Zap,
  Smartphone,
  BarChart3,
  Settings2,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { LiveFeed } from '@/components/live-feed'
import { SaloSystem } from '@/components/salo-system'
import { WalletSection } from '@/components/wallet-section'
import { streamService } from '@/lib/services'
import { NotificationBell } from '@/components/notification-bell'

interface Post {
  id: string
  author: string
  avatar: string
  handle: string
  timestamp: string
  location: string
  content: string
  image?: string
  isLive?: boolean
  viewers?: number
  likes: number
  comments: number
  shares: number
  liked?: boolean
  category?: string
}

interface LiveStream {
  id: string
  title: string
  description?: string
  category?: string
  status: string
  viewerCount: number
  startedAt?: string
  streamer: {
    id: string
    displayName?: string
    username?: string
    avatarUrl?: string
  }
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ')

function NavItem({ icon, label, active, badge, href }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string; href?: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => href && router.push(href)}
      className={cn(
        'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer',
        active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
      )}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
  )
}

export default function FeedPage() {
  const { user, isLoggedIn, isLoading, logout } = useAuth()
  const router = useRouter()
  const [pageLoaded, setPageLoaded] = React.useState(false)
  const [posts, setPosts] = React.useState<Post[]>([])
  const [liveStreams, setLiveStreams] = React.useState<LiveStream[]>([])
  const [postContent, setPostContent] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('para-ti')
  const [feedFilter, setFeedFilter] = React.useState<'all' | 'following'>('all')

  React.useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth")
    }
  }, [isLoggedIn, isLoading, router])

  // Fetch real data from API
  React.useEffect(() => {
    const fetchFeedData = async () => {
      try {
        // Fetch live streams from the real API
        const liveRes = await streamService.getLive(1, 20, undefined, feedFilter === 'following' ? 'following' : undefined)
        const streams: LiveStream[] = liveRes.data.streams || []
        setLiveStreams(streams)

        // Convert live streams to posts for the feed
        const streamPosts: Post[] = streams.map((s: LiveStream) => ({
          id: s.id,
          author: s.streamer?.displayName || s.streamer?.username || 'Streamer',
          avatar: s.streamer?.avatarUrl || '/abstract-profile.png',
          handle: `@${s.streamer?.username || s.streamer?.displayName?.toLowerCase().replace(/\s/g, '') || 'user'}`,
          timestamp: s.startedAt ? `Desde ${new Date(s.startedAt).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}` : 'Ao vivo',
          location: 'Angola',
          content: s.title || 'Live Stream',
          isLive: true,
          viewers: s.viewerCount || 0,
          likes: 0,
          comments: 0,
          shares: 0,
          category: s.category || 'Geral',
        }))

        setPosts(streamPosts)
      } catch (err) {
        console.error('Error fetching feed data:', err)
        setPosts([])
        setLiveStreams([])
      } finally {
        setPageLoaded(true)
      }
    }

    if (isLoggedIn) {
      fetchFeedData()
    }
  }, [isLoggedIn, feedFilter])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  const handleCreatePost = () => {
    if (!postContent.trim()) return

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: user?.displayName || 'Utilizador',
      avatar: user?.avatar || '/abstract-profile.png',
      handle: `@${user?.displayName?.toLowerCase().replace(/\s/g, '')}`,
      timestamp: 'Agora',
      location: user?.location || 'Luanda',
      content: postContent,
      likes: 0,
      comments: 0,
      shares: 0,
    }

    setPosts([newPost, ...posts])
    setPostContent('')
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
          : post,
      ),
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-dvh bg-background flex flex-col pb-mobile-nav">
      <Navbar />

      {/* Main Content */}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="sticky top-14 md:top-16 bg-background/80 backdrop-blur z-40 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-4">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div>
                <h1 className="text-xl md:text-3xl font-bold">Feed Kwanza</h1>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">A tua comunidade criativa angolana</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Procurar..."
                    className="bg-transparent outline-none text-sm w-40 placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
            <TabsList className="scroll-tabs w-full justify-start bg-transparent border-b border-white/10 rounded-none h-auto p-0 gap-0">
              <TabsTrigger value="para-ti" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs md:text-sm px-3 md:px-4">
                <Home className="w-4 h-4 mr-1 md:mr-2" />
                Para Ti
              </TabsTrigger>
              <TabsTrigger value="lives" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs md:text-sm px-3 md:px-4">
                <Flame className="w-4 h-4 mr-1 md:mr-2" />
                Lives
              </TabsTrigger>
              <TabsTrigger value="salos" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs md:text-sm px-3 md:px-4">
                <Gift className="w-4 h-4 mr-1 md:mr-2" />
                Salo
              </TabsTrigger>
              <TabsTrigger value="wallet" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs md:text-sm px-3 md:px-4">
                <Wallet className="w-4 h-4 mr-1 md:mr-2" />
                Wallet
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 p-6 shrink-0 overflow-y-auto">
            {/* User Profile Card */}
            <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={user?.avatar || '/abstract-profile.png'} alt={user?.displayName} />
                  <AvatarFallback>{user?.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold truncate">{user?.displayName}</h3>
                  <p className="text-xs text-muted-foreground">@{user?.displayName?.toLowerCase().replace(/\s/g, '')}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-white/10">
                <div>
                  <div className="text-lg font-black text-primary">{user?.followers || 0}</div>
                  <div className="text-[10px] text-muted-foreground">Seguidores</div>
                </div>
                <div>
                  <div className="text-lg font-black text-secondary">{user?.following || 0}</div>
                  <div className="text-[10px] text-muted-foreground">Seguindo</div>
                </div>
                <div>
                  <div className="text-lg font-black text-accent">12</div>
                  <div className="text-[10px] text-muted-foreground">Lives</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 mb-8">
              <NavItem icon={<Home className="h-5 w-5" />} label="Início" active href="/feed" />
              <NavItem icon={<Flame className="h-5 w-5" />} label="Lives" href="/explore" />
              <NavItem icon={<Users className="h-5 w-5" />} label="Descobrir Creators" href="/explore" />
              <NavItem icon={<TrendingUp className="h-5 w-5" />} label="Tendências" href="/explore" />
              <NavItem icon={<User className="h-5 w-5" />} label="Meu Perfil" href={`/profile/${user?.id}`} />
              <NavItem icon={<BarChart3 className="h-5 w-5" />} label="Dashboard" href="/dashboard" />
              <NavItem icon={<Wallet className="h-5 w-5" />} label="Carteira" badge={`${((user?.balance || 0) / 1000).toFixed(0)}K Kz`} href="/wallet" />
            </nav>

            <Separator className="bg-white/10 mb-8" />

            {/* Create Live Button */}
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold h-12 mb-4 shadow-lg shadow-primary/20 gap-2">
              <Video className="h-5 w-5" />
              Começar Live
            </Button>

            {/* Settings */}
            <Button variant="outline" className="w-full gap-2 border-white/10 mb-4 bg-transparent">
              <Settings2 className="h-4 w-4" />
              Configurações
            </Button>

            {/* Logout */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 mt-auto bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </aside>

          {/* Center Feed */}
          <main className="flex-1 overflow-y-auto scroll-area-viewport border-r border-white/10">
            <TabsContent value="para-ti" className="mt-0 space-y-0">
              <div className="max-w-3xl mx-auto p-3 md:p-6 space-y-4 md:space-y-6">
                {/* Feed filter: Todos / Seguindo */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setFeedFilter('all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${feedFilter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFeedFilter('following')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${feedFilter === 'following'
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                  >
                    <Users className="w-3 h-3 inline mr-1" />
                    Seguindo
                  </button>
                </div>
                {/* Post Composer */}
                <div className="sticky top-0 p-4 rounded-lg bg-gradient-to-b from-background via-background/80 to-transparent border-b border-white/10 space-y-4 z-40">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || '/abstract-profile.png'} alt={user?.displayName} />
                      <AvatarFallback>{user?.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder={`O que estás a pensar, ${user?.displayName}?`}
                      className="bg-white/5 border border-white/10 focus-visible:border-primary rounded-lg"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-1">
                        <ImageIcon className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs">Foto</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary hover:bg-secondary/10 gap-1">
                        <Video className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs">Vídeo</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 gap-1">
                        <Radio className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs">Direto</span>
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white px-6 font-bold gap-2"
                      disabled={!postContent.trim()}
                      onClick={handleCreatePost}
                    >
                      <Zap className="h-3 w-3" />
                      Postar
                    </Button>
                  </div>
                </div>

                {/* Feed Section */}
                {!pageLoaded ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                        <div className="flex gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <div className="flex gap-4">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center mb-6">
                      <Radio className="h-10 w-10 text-primary/60" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Nenhuma live agora</h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                      Ainda não há streams ao vivo. Sê o primeiro a transmitir para a comunidade angolana! 🇦🇴
                    </p>
                    <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold gap-2 shadow-lg shadow-primary/20">
                      <Video className="h-4 w-4" />
                      Começar uma Live
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className={`p-4 rounded-xl border transition-all ${post.isLive ? "bg-white/5 border-primary/30" : "bg-white/5 border-white/10"}`}
                      >
                        {post.isLive && (
                          <div className="absolute top-4 right-4 z-10">
                            <Badge variant="destructive" className="animate-pulse bg-red-600">
                              <Radio className="h-3 w-3 mr-1" /> AO VIVO
                            </Badge>
                          </div>
                        )}
                        <div className="flex gap-3 mb-4">
                          <Avatar className={post.isLive ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}>
                            <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                            <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm font-bold flex items-center gap-1">
                              {post.author}{" "}
                              {post.isLive && <CheckCircle2 className="h-3 w-3 text-primary fill-primary text-white" />}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {post.timestamp} • {post.location}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
                        {post.image && (
                          <div
                            className={`rounded-lg overflow-hidden mb-4 ${post.isLive ? "aspect-video" : "aspect-square md:aspect-video"}`}
                          >
                            <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
                            {post.isLive && (
                              <div className="absolute bottom-3 left-3 flex gap-2">
                                <Badge className="bg-black/60 backdrop-blur-md border-none">
                                  {post.viewers} Espectadores
                                </Badge>
                                <Badge className="bg-black/60 backdrop-blur-md border-none">{post.category}</Badge>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-muted-foreground border-t border-white/5 pt-4">
                          <div className="flex gap-6">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className={`flex items-center gap-2 transition-colors ${post.liked ? "text-primary font-bold" : "hover:text-primary"}`}
                            >
                              <Heart className={`h-5 w-5 ${post.liked ? "fill-primary" : ""}`} />{" "}
                              <span className="text-xs">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-secondary transition-colors">
                              <MessageCircle className="h-5 w-5" /> <span className="text-xs">{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-white transition-colors">
                              <Share2 className="h-5 w-5" /> <span className="text-xs">{post.shares}</span>
                            </button>
                          </div>
                          <button className="hover:text-white">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lives" className="mt-0">
              <div className="max-w-3xl mx-auto p-4 md:p-6">
                <LiveFeed />
              </div>
            </TabsContent>

            <TabsContent value="salos" className="mt-0">
              <div className="max-w-3xl mx-auto p-4 md:p-6">
                <SaloSystem receiverId="" />
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="mt-0">
              <div className="max-w-3xl mx-auto p-4 md:p-6">
                <WalletSection isCreator={false} balance={user?.balance || 0} />
              </div>
            </TabsContent>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden xl:flex w-80 flex-col gap-6 p-6 border-l border-white/10 overflow-y-auto scroll-area-viewport bg-white/2">
            {/* Active Lives */}
            <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/10">
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-primary animate-pulse" />
                <span>Lives Agora</span>
                <Badge className="ml-auto bg-red-500/20 text-red-300 border-red-500/30">{liveStreams.length}</Badge>
              </h3>
              <div className="space-y-3">
                {liveStreams.length > 0 ? (
                  liveStreams.slice(0, 5).map((stream) => (
                    <div key={stream.id} className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex-shrink-0 relative">
                          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border border-background animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{stream.title}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{stream.streamer?.displayName || stream.streamer?.username || 'Streamer'}</p>
                          <p className="text-[10px] text-accent font-semibold">{stream.viewerCount} espectadores</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">Nenhuma live no momento</p>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs border-white/10 bg-transparent">
                Ver todas as lives
              </Button>
            </div>

            {/* Suggestions */}
            <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-accent/5 to-primary/5 border border-white/10">
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-accent" />
                Quem Seguir
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'C4 Pedro', handle: '@c4pedro_official', followers: '234K' },
                  { name: 'Yola Semedo', handle: '@yolasemedo', followers: '156K' },
                  { name: 'Gilmário Vemba', handle: '@gilmariovemba', followers: '89K' },
                ].map((creator) => (
                  <div key={creator.name} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                          {creator.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{creator.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{creator.followers}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs border-white/10 h-7 bg-transparent">
                      Seguir
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-secondary/5 to-accent/5 border border-white/10">
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Tendências
              </h3>
              <div className="space-y-4">
                {[
                  { tag: '#UnitelMoney', posts: '15K', category: 'Finanças' },
                  { tag: '#KuduroAngolano', posts: '42K', category: 'Música' },
                  { tag: '#SelecaoNacional', posts: '8.5K', category: 'Desporto' },
                  { tag: '#FreeFireTournament', posts: '12K', category: 'Gaming' },
                ].map((trend) => (
                  <div key={trend.tag} className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{trend.tag}</p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{trend.posts} posts</span>
                      <Badge variant="outline" className="text-[9px] bg-white/5 border-white/10">{trend.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-center text-xs text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-3 h-3 text-primary" />
                <span>Kwanza Stream &copy; 2025</span>
              </div>
              <p>A primeira plataforma de streaming social de Angola</p>
            </div>
          </aside>
        </div>
      </Tabs>
    </div>
  )
}
