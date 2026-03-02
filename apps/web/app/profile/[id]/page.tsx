'use client'

import * as React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
    ArrowLeft,
    Users,
    Heart,
    Radio,
    Calendar,
    Edit3,
    Check,
    X,
    UserPlus,
    UserCheck,
    Play,
    Wallet,
    Gift,
    Loader2,
    Camera,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { userService, streamService } from '@/lib/services'

interface UserProfile {
    id: string
    username?: string
    displayName?: string
    bio?: string
    avatarUrl?: string
    bannerUrl?: string
    isVerified?: boolean
    role?: string
    createdAt: string
    isFollowing?: boolean
    _count?: { followers: number; following: number }
}

interface StreamRecord {
    id: string
    title: string
    category?: string
    status: string
    viewerCount: number
    startedAt?: string
    endedAt?: string
}

export default function ProfilePage() {
    const params = useParams()
    const router = useRouter()
    const userId = params.id as string
    const { user: currentUser, isLoggedIn } = useAuth()

    const [profile, setProfile] = React.useState<UserProfile | null>(null)
    const [streams, setStreams] = React.useState<StreamRecord[]>([])
    const [loading, setLoading] = React.useState(true)
    const [isFollowing, setIsFollowing] = React.useState(false)
    const [followLoading, setFollowLoading] = React.useState(false)
    const [isEditing, setIsEditing] = React.useState(false)
    const [editName, setEditName] = React.useState('')
    const [editBio, setEditBio] = React.useState('')
    const [isSaving, setIsSaving] = React.useState(false)
    const [avatarUploading, setAvatarUploading] = React.useState(false)
    const [bannerUploading, setBannerUploading] = React.useState(false)
    const avatarInputRef = React.useRef<HTMLInputElement>(null)
    const bannerInputRef = React.useRef<HTMLInputElement>(null)

    const isOwnProfile = currentUser?.id === userId

    React.useEffect(() => {
        const load = async () => {
            try {
                const [profileRes, streamsRes] = await Promise.all([
                    userService.getProfile(userId),
                    streamService.getUserStreams(userId, 1, 10),
                ])
                const p = profileRes.data
                setProfile(p)
                setIsFollowing(p.isFollowing || false)
                setEditName(p.displayName || '')
                setEditBio(p.bio || '')
                setStreams(streamsRes.data.streams || streamsRes.data || [])
            } catch (err) {
                console.error('Failed to load profile:', err)
            } finally {
                setLoading(false)
            }
        }
        if (userId) load()
    }, [userId])

    const handleFollow = async () => {
        if (!profile) return
        setFollowLoading(true)
        try {
            if (isFollowing) {
                await userService.unfollow(profile.id)
            } else {
                await userService.follow(profile.id)
            }
            setIsFollowing(!isFollowing)
            setProfile(prev => prev ? {
                ...prev,
                _count: {
                    ...prev._count!,
                    followers: (prev._count?.followers || 0) + (isFollowing ? -1 : 1),
                },
            } : null)
        } catch (err) {
            console.error('Follow error:', err)
        } finally {
            setFollowLoading(false)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const res = await userService.updateProfile({
                displayName: editName.trim(),
                bio: editBio.trim(),
            })
            setProfile(prev => prev ? { ...prev, displayName: res.data.displayName, bio: res.data.bio } : null)
            setIsEditing(false)
        } catch (err) {
            console.error('Update error:', err)
        } finally {
            setIsSaving(false)
        }
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setAvatarUploading(true)
        try {
            const { data } = await userService.uploadAvatar(file)
            setProfile(prev => prev ? { ...prev, avatarUrl: data.avatarUrl } : null)
        } catch (err) {
            console.error('Avatar upload error:', err)
        } finally {
            setAvatarUploading(false)
            if (avatarInputRef.current) avatarInputRef.current.value = ''
        }
    }

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setBannerUploading(true)
        try {
            const { data } = await userService.uploadBanner(file)
            setProfile(prev => prev ? { ...prev, bannerUrl: data.bannerUrl } : null)
        } catch (err) {
            console.error('Banner upload error:', err)
        } finally {
            setBannerUploading(false)
            if (bannerInputRef.current) bannerInputRef.current.value = ''
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white max-w-3xl mx-auto p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <div className="flex gap-4">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 flex-1 rounded-xl" />)}
                </div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-xl font-bold">Utilizador não encontrado</p>
                    <Button onClick={() => router.push('/feed')} variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao Feed
                    </Button>
                </div>
            </div>
        )
    }

    const joinDate = new Date(profile.createdAt).toLocaleDateString('pt-AO', { month: 'long', year: 'numeric' })

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Hero */}
            <div
                className={`relative h-48 bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent bg-cover bg-center group ${isOwnProfile ? 'cursor-pointer' : ''}`}
                style={profile.bannerUrl ? { backgroundImage: `url(${profile.bannerUrl})` } : undefined}
                onClick={() => isOwnProfile && bannerInputRef.current?.click()}
            >
                <div className="absolute inset-0 bg-black/20" />
                {isOwnProfile && (
                    <>
                        <input ref={bannerInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleBannerUpload} />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            {bannerUploading ? (
                                <Loader2 className="h-8 w-8 text-white animate-spin" />
                            ) : (
                                <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                    <Camera className="h-5 w-5" /> Alterar capa
                                </div>
                            )}
                        </div>
                    </>
                )}
                <div className="absolute top-4 left-4 z-10">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); router.back() }} className="text-white/70 hover:text-white bg-black/30 backdrop-blur">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-16 relative z-10">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    <div className="relative group">
                        <Avatar className="h-28 w-28 ring-4 ring-[#050505] shadow-2xl">
                            <AvatarImage src={profile.avatarUrl || '/abstract-profile.png'} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
                                {(profile.displayName || profile.username || 'U')[0]}
                            </AvatarFallback>
                        </Avatar>
                        {isOwnProfile && (
                            <>
                                <input ref={avatarInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarUpload} />
                                <button
                                    onClick={() => avatarInputRef.current?.click()}
                                    className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50"
                                >
                                    {avatarUploading ? (
                                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                                    ) : (
                                        <Camera className="h-6 w-6 text-white" />
                                    )}
                                </button>
                            </>
                        )}
                    </div>

                    <div className="flex-1 space-y-3">
                        {isEditing ? (
                            <div className="space-y-3">
                                <Input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Nome de exibição"
                                    className="bg-white/5 border-white/10 text-lg font-bold h-12"
                                />
                                <Input
                                    value={editBio}
                                    onChange={(e) => setEditBio(e.target.value)}
                                    placeholder="Bio..."
                                    className="bg-white/5 border-white/10"
                                    maxLength={500}
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleSave} size="sm" className="bg-primary gap-2" disabled={isSaving}>
                                        {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                                        Guardar
                                    </Button>
                                    <Button onClick={() => setIsEditing(false)} size="sm" variant="ghost" className="gap-2 text-muted-foreground">
                                        <X className="h-3 w-3" /> Cancelar
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl md:text-3xl font-black">
                                        {profile.displayName || profile.username || 'Utilizador'}
                                    </h1>
                                    {profile.isVerified && (
                                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Verificado</Badge>
                                    )}
                                    {profile.role === 'ADMIN' && (
                                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">Admin</Badge>
                                    )}
                                </div>
                                {profile.username && (
                                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                                )}
                                {profile.bio && (
                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{profile.bio}</p>
                                )}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    Membro desde {joinDate}
                                </div>
                            </>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-1">
                            {isOwnProfile ? (
                                <>
                                    {!isEditing && (
                                        <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="border-white/20 bg-transparent gap-2">
                                            <Edit3 className="h-3 w-3" /> Editar Perfil
                                        </Button>
                                    )}
                                    <Button onClick={() => router.push('/stream')} size="sm" className="bg-primary gap-2">
                                        <Radio className="h-3 w-3" /> Ir ao Vivo
                                    </Button>
                                </>
                            ) : isLoggedIn ? (
                                <>
                                    <Button
                                        onClick={handleFollow}
                                        disabled={followLoading}
                                        size="sm"
                                        className={isFollowing
                                            ? 'border-white/20 bg-transparent text-white gap-2'
                                            : 'bg-primary hover:bg-primary/90 gap-2'
                                        }
                                        variant={isFollowing ? 'outline' : 'default'}
                                    >
                                        {followLoading ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : isFollowing ? (
                                            <UserCheck className="h-3 w-3" />
                                        ) : (
                                            <UserPlus className="h-3 w-3" />
                                        )}
                                        {isFollowing ? 'A Seguir' : 'Seguir'}
                                    </Button>
                                    <Button variant="outline" size="sm" className="border-white/20 bg-transparent gap-2">
                                        <Gift className="h-3 w-3" /> Enviar Salo
                                    </Button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <Card className="border-white/10 bg-card/50">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-black">{(profile._count?.followers || 0).toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground font-medium">Seguidores</p>
                        </CardContent>
                    </Card>
                    <Card className="border-white/10 bg-card/50">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-black">{(profile._count?.following || 0).toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground font-medium">A Seguir</p>
                        </CardContent>
                    </Card>
                    <Card className="border-white/10 bg-card/50">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-black">{streams.length}</p>
                            <p className="text-xs text-muted-foreground font-medium">Transmissões</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Stream History */}
                <div className="space-y-4 pb-12">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Radio className="h-5 w-5 text-primary" /> Transmissões
                    </h2>
                    {streams.length === 0 ? (
                        <Card className="border-white/10 bg-card/50">
                            <CardContent className="py-12 text-center">
                                <Radio className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                                <p className="text-sm text-muted-foreground">
                                    {isOwnProfile ? 'Ainda não fizeste nenhuma transmissão.' : 'Sem transmissões ainda.'}
                                </p>
                                {isOwnProfile && (
                                    <Button onClick={() => router.push('/stream')} size="sm" className="mt-4 bg-primary gap-2">
                                        <Play className="h-3 w-3" /> Começar a Transmitir
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-3">
                            {streams.map((s) => (
                                <Card
                                    key={s.id}
                                    className="border-white/10 bg-card/50 hover:border-primary/30 transition-colors cursor-pointer"
                                    onClick={() => s.status === 'LIVE' ? router.push(`/watch/${s.id}`) : undefined}
                                >
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.status === 'LIVE'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-white/5 text-muted-foreground'
                                                }`}>
                                                {s.status === 'LIVE' ? <Radio className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{s.title}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    {s.category && <span>{s.category}</span>}
                                                    {s.startedAt && <span>• {new Date(s.startedAt).toLocaleDateString('pt-AO')}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {s.status === 'LIVE' ? (
                                                <Badge className="bg-red-500 border-none text-white text-xs animate-pulse">AO VIVO</Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-white/20 text-xs">Terminada</Badge>
                                            )}
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Users className="h-3 w-3" />
                                                {s.viewerCount}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
