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
        'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer',
        active ? 'surface-3 text-primary font-semibold' : 'text-muted-foreground hover:surface-3 hover:text-foreground'
      )}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className="text-[11px] bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">{badge}</span>}
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
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20 border-t-primary" />
          <p className="text-sm text-muted-foreground">A carregar...</p>
        </div>
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
        {/* Header & Tabs */}
        <div className="sticky top-14 md:top-16 bg-background/90 backdrop-blur-xl z-40 border-b border-border">
          <div className="max-w-[1600px] mx-auto px-4 md:px-6">
            {/* Page Title */}
            <div className="pt-4 md:pt-6 pb-3 md:pb-4">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Feed Kwanza</h1>
              <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block">A tua comunidade criativa angolana</p>
            </div>
            {/* Tab Navigation */}
            <TabsList className="scroll-tabs w-full justify-start bg-transparent rounded-none h-auto p-0 gap-0">
              <TabsTrigger value="para-ti" className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground text-xs md:text-sm px-4 md:px-5 py-3 transition-all">
                <Home className="w-4 h-4 mr-1.5 md:mr-2" />
                Para Ti
              </TabsTrigger>
              <TabsTrigger value="lives" className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground text-xs md:text-sm px-4 md:px-5 py-3 transition-all">
                <Flame className="w-4 h-4 mr-1.5 md:mr-2" />
                Lives
              </TabsTrigger>
              <TabsTrigger value="salos" className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground text-xs md:text-sm px-4 md:px-5 py-3 transition-all">
                <Gift className="w-4 h-4 mr-1.5 md:mr-2" />
                Salo
              </TabsTrigger>
              <TabsTrigger value="wallet" className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground text-xs md:text-sm px-4 md:px-5 py-3 transition-all">
                <Wallet className="w-4 h-4 mr-1.5 md:mr-2" />
                Wallet
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden max-w-[1600px] mx-auto w-full">
          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="hidden lg:flex w-[260px] flex-col p-5 shrink-0 overflow-y-auto custom-scrollbar border-r border-border">
            {/* User Profile Card */}
            <div className="mb-6 p-4 rounded-2xl card-surface">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-11 w-11 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage src={user?.avatar || '/abstract-profile.png'} alt={user?.displayName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">{user?.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate">{user?.displayName}</h3>
                  <p className="text-xs text-muted-foreground">@{user?.displayName?.toLowerCase().replace(/\s/g, '')}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-border">
                <div>
                  <div className="text-base font-bold text-primary">{user?.followers || 0}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Seguidores</div>
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">{user?.following || 0}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Seguindo</div>
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">12</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Lives</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 mb-6">
              <NavItem icon={<Home className="h-[18px] w-[18px]" />} label="Início" active href="/feed" />
              <NavItem icon={<Flame className="h-[18px] w-[18px]" />} label="Lives" href="/explore" />
              <NavItem icon={<Users className="h-[18px] w-[18px]" />} label="Descobrir Creators" href="/explore" />
              <NavItem icon={<TrendingUp className="h-[18px] w-[18px]" />} label="Tendências" href="/explore" />
              <NavItem icon={<User className="h-[18px] w-[18px]" />} label="Meu Perfil" href={`/profile/${user?.id}`} />
              <NavItem icon={<BarChart3 className="h-[18px] w-[18px]" />} label="Dashboard" href="/dashboard" />
              <NavItem icon={<Wallet className="h-[18px] w-[18px]" />} label="Carteira" badge={`${((user?.balance || 0) / 1000).toFixed(0)}K Kz`} href="/wallet" />
            </nav>

            <div className="divider mb-6" />

            {/* Create Live Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11 mb-3 rounded-xl gap-2" style={{ boxShadow: 'var(--shadow-glow)' }}>
              <Video className="h-4 w-4" />
              Começar Live
            </Button>

            {/* Settings */}
            <Button variant="outline" className="w-full gap-2 border-border mb-3 bg-transparent rounded-xl h-10 font-medium text-muted-foreground hover:text-foreground">
              <Settings2 className="h-4 w-4" />
              Configurações
            </Button>

            {/* Logout */}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full gap-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 mt-auto rounded-xl h-10 font-medium"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </aside>

          {/* ===== CENTER FEED ===== */}
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <TabsContent value="para-ti" className="mt-0 space-y-0">
              <div className="max-w-2xl mx-auto px-4 md:px-6 py-4 md:py-6 space-y-5">
                {/* Feed filter: Todos / Seguindo */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFeedFilter('all')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${feedFilter === 'all'
                      ? 'bg-primary text-white'
                      : 'surface-3 text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFeedFilter('following')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${feedFilter === 'following'
                      ? 'bg-primary text-white'
                      : 'surface-3 text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Users className="w-3 h-3" />
                    Seguindo
                  </button>
                </div>

                {/* Post Composer */}
                <div className="p-4 rounded-2xl card-surface space-y-3">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={user?.avatar || '/abstract-profile.png'} alt={user?.displayName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">{user?.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder={`O que estás a pensar, ${user?.displayName}?`}
                      className="surface-4 border-border focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-1.5 rounded-lg h-8">
                        <ImageIcon className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs">Foto</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary hover:bg-secondary/10 gap-1.5 rounded-lg h-8">
                        <Video className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs">Vídeo</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 gap-1.5 rounded-lg h-8">
                        <Radio className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs">Direto</span>
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white px-5 font-semibold gap-1.5 rounded-xl h-8"
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
                  <div className="space-y-5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-5 rounded-2xl card-surface space-y-4 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="flex gap-4">
                          <Skeleton className="h-8 w-16 rounded-lg" />
                          <Skeleton className="h-8 w-16 rounded-lg" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center mb-6">
                      <Radio className="h-9 w-9 text-primary/60" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Nenhuma live agora</h3>
                    <p className="text-muted-foreground text-sm mb-8 max-w-sm leading-relaxed">
                      Ainda não há streams ao vivo. Sê o primeiro a transmitir para a comunidade angolana! 🇦🇴
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-white font-semibold gap-2 rounded-xl h-11 px-6" style={{ boxShadow: 'var(--shadow-glow)' }}>
                      <Video className="h-4 w-4" />
                      Começar uma Live
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className={`p-5 rounded-2xl transition-all card-surface ${post.isLive ? "!border-primary/25" : ""}`}
                      >
                        {post.isLive && (
                          <div className="absolute top-4 right-4 z-10">
                            <Badge variant="destructive" className="animate-pulse bg-red-600 font-semibold text-[11px] px-2 py-0.5 rounded-md">
                              <Radio className="h-3 w-3 mr-1" /> AO VIVO
                            </Badge>
                          </div>
                        )}
                        <div className="flex gap-3 mb-4">
                          <Avatar className={cn("h-10 w-10", post.isLive && "ring-2 ring-primary ring-offset-2 ring-offset-background")}>
                            <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">{post.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm font-semibold flex items-center gap-1.5">
                              {post.author}{" "}
                              {post.isLive && <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary text-white" />}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {post.timestamp} · {post.location}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
                        {post.image && (
                          <div
                            className={`rounded-xl overflow-hidden mb-4 ${post.isLive ? "aspect-video" : "aspect-square md:aspect-video"}`}
                          >
                            <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
                            {post.isLive && (
                              <div className="absolute bottom-3 left-3 flex gap-2">
                                <Badge className="bg-black/60 backdrop-blur-md border-none text-xs">
                                  {post.viewers} Espectadores
                                </Badge>
                                <Badge className="bg-black/60 backdrop-blur-md border-none text-xs">{post.category}</Badge>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-muted-foreground border-t border-border pt-3">
                          <div className="flex gap-4 md:gap-6">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className={`flex items-center gap-1.5 transition-all rounded-lg px-2 py-1 -ml-2 ${post.liked ? "text-primary font-semibold" : "hover:text-primary hover:bg-primary/10"}`}
                            >
                              <Heart className={`h-[18px] w-[18px] ${post.liked ? "fill-primary" : ""}`} />{" "}
                              <span className="text-xs">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-foreground transition-all rounded-lg px-2 py-1 hover:bg-white/5">
                              <MessageCircle className="h-[18px] w-[18px]" /> <span className="text-xs">{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-foreground transition-all rounded-lg px-2 py-1 hover:bg-white/5">
                              <Share2 className="h-[18px] w-[18px]" /> <span className="text-xs">{post.shares}</span>
                            </button>
                          </div>
                          <button className="hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/5">
                            <MoreHorizontal className="h-[18px] w-[18px]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lives" className="mt-0">
              <div className="max-w-2xl mx-auto px-4 md:px-6 py-6">
                <LiveFeed />
              </div>
            </TabsContent>

            <TabsContent value="salos" className="mt-0">
              <div className="max-w-2xl mx-auto px-4 md:px-6 py-6">
                <SaloSystem receiverId="" />
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="mt-0">
              <div className="max-w-2xl mx-auto px-4 md:px-6 py-6">
                <WalletSection isCreator={false} balance={user?.balance || 0} />
              </div>
            </TabsContent>
          </main>

          {/* ===== RIGHT SIDEBAR ===== */}
          <aside className="hidden xl:flex w-[300px] flex-col gap-5 p-5 overflow-y-auto custom-scrollbar border-l border-border">
            {/* Active Lives */}
            <div className="p-4 rounded-2xl card-surface">
              <h3 className="font-semibold flex items-center gap-2 text-sm mb-4">
                <Flame className="h-4 w-4 text-primary" />
                <span>Lives Agora</span>
                <Badge className="ml-auto bg-red-500/15 text-red-400 border-red-500/20 text-[10px] px-1.5 font-semibold">{liveStreams.length}</Badge>
              </h3>
              <div className="space-y-2">
                {liveStreams.length > 0 ? (
                  liveStreams.slice(0, 5).map((stream) => (
                    <div key={stream.id} className="p-2.5 rounded-xl hover:surface-3 transition-all cursor-pointer group">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 relative flex items-center justify-center">
                          <Radio className="w-4 h-4 text-primary/70" />
                          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">{stream.title}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{stream.streamer?.displayName || stream.streamer?.username || 'Streamer'}</p>
                          <p className="text-[11px] text-primary/70 font-medium">{stream.viewerCount} espectadores</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-6">Nenhuma live no momento</p>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs border-border bg-transparent rounded-xl mt-3 h-8 font-medium">
                Ver todas as lives
              </Button>
            </div>

            {/* Suggestions */}
            <div className="p-4 rounded-2xl card-surface">
              <h3 className="font-semibold flex items-center gap-2 text-sm mb-4">
                <Users className="h-4 w-4 text-accent" />
                Quem Seguir
              </h3>
              <div className="space-y-1">
                {[
                  { name: 'C4 Pedro', handle: '@c4pedro_official', followers: '234K' },
                  { name: 'Yola Semedo', handle: '@yolasemedo', followers: '156K' },
                  { name: 'Gilmário Vemba', handle: '@gilmariovemba', followers: '89K' },
                ].map((creator) => (
                  <div key={creator.name} className="flex items-center justify-between gap-2 p-2.5 rounded-xl hover:surface-3 transition-all">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground text-xs font-semibold">
                          {creator.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{creator.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{creator.followers}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-[11px] border-border h-7 px-3 rounded-lg bg-transparent font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                      Seguir
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="p-4 rounded-2xl card-surface">
              <h3 className="font-semibold flex items-center gap-2 text-sm mb-4">
                <TrendingUp className="h-4 w-4 text-secondary" />
                Tendências
              </h3>
              <div className="space-y-1">
                {[
                  { tag: '#UnitelMoney', posts: '15K', category: 'Finanças' },
                  { tag: '#KuduroAngolano', posts: '42K', category: 'Música' },
                  { tag: '#SelecaoNacional', posts: '8.5K', category: 'Desporto' },
                  { tag: '#FreeFireTournament', posts: '12K', category: 'Gaming' },
                ].map((trend) => (
                  <div key={trend.tag} className="p-2.5 rounded-xl hover:surface-3 transition-all cursor-pointer group">
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{trend.tag}</p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-0.5">
                      <span>{trend.posts} posts</span>
                      <span className="text-[10px] surface-3 px-1.5 py-0.5 rounded-md">{trend.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 mt-auto space-y-2 text-center text-[11px] text-muted-foreground">
              <div className="divider mb-3" />
              <p className="font-medium">Kwanza Stream &copy; 2026</p>
              <p>A primeira plataforma de streaming<br />social de Angola</p>
            </div>
          </aside>
        </div>
      </Tabs>
    </div>
  )
}
