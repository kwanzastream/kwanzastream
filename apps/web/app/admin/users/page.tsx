'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatCard } from '@/components/stat-card'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Users, Search, Shield, Ban, Eye, ArrowLeft,
    MoreHorizontal, UserCheck, UserX, Crown
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface UserItem {
    id: string
    username?: string
    displayName?: string
    email?: string
    phone: string
    role: string
    isBanned: boolean
    kycTier: number
    avatarUrl?: string
    createdAt: string
}

export default function AdminUsersPage() {
    const router = useRouter()
    const [users, setUsers] = useState<UserItem[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState<string>('all')
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type })
        setTimeout(() => setToast(null), 3000)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`${API_URL}/api/users?limit=50`, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                })
                if (res.ok) {
                    const data = await res.json()
                    setUsers(data.data?.users || data.users || [])
                }
            } catch (err) {
                console.error('Erro ao carregar utilizadores:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleBanToggle = async (u: UserItem) => {
        const action = u.isBanned ? 'desbanir' : 'banir'
        if (!confirm(`Tens a certeza que queres ${action} ${u.displayName || u.username || u.phone}?`)) return

        try {
            const res = await fetch(`${API_URL}/api/users/${u.id}/ban`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ isBanned: !u.isBanned, reason: u.isBanned ? undefined : 'Banido pelo admin' }),
            })
            if (res.ok) {
                setUsers(prev => prev.map(x => x.id === u.id ? { ...x, isBanned: !x.isBanned } : x))
                showToast(`${u.displayName || u.username} foi ${u.isBanned ? 'desbanido' : 'banido'}.`)
            } else {
                showToast(`Erro ao ${action} utilizador.`, 'error')
            }
        } catch {
            showToast(`Erro de rede ao ${action}.`, 'error')
        }
    }

    const filteredUsers = users.filter(u => {
        const matchesSearch = !search ||
            u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
            u.username?.toLowerCase().includes(search.toLowerCase()) ||
            u.phone?.includes(search)
        const matchesRole = roleFilter === 'all' || u.role === roleFilter
        return matchesSearch && matchesRole
    })

    const roleColor: Record<string, string> = {
        USER: 'bg-muted text-muted-foreground',
        STREAMER: 'bg-primary/10 text-primary',
        ADMIN: 'bg-purple-500/10 text-purple-400',
    }

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in ${toast.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                    {toast.msg}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Gestão de Utilizadores</h1>
                        <p className="text-sm text-muted-foreground">Administra contas, roles e acessos</p>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    <StatCard icon={<Users className="h-5 w-5" />} label="Total de Utilizadores" value={users.length} accentColor="bg-primary/10" iconColor="text-primary" />
                    <StatCard icon={<Crown className="h-5 w-5" />} label="Streamers" value={users.filter(u => u.role === 'STREAMER').length} accentColor="bg-secondary/10" iconColor="text-secondary" />
                    <StatCard icon={<UserCheck className="h-5 w-5" />} label="Verificados (KYC)" value={users.filter(u => u.kycTier > 0).length} accentColor="bg-green-500/10" iconColor="text-green-400" />
                    <StatCard icon={<UserX className="h-5 w-5" />} label="Banidos" value={users.filter(u => u.isBanned).length} accentColor="bg-red-500/10" iconColor="text-red-400" />
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Pesquisar por nome, username ou telefone..."
                            className="pl-10 surface-4 border-border rounded-xl"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[160px] surface-4 border-border rounded-xl">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="USER">Utilizador</SelectItem>
                            <SelectItem value="STREAMER">Streamer</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Users Table */}
                <Card className="card-surface rounded-2xl">
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-6 space-y-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="flex items-center gap-4">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-40" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="py-16 text-center">
                                <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">Nenhum utilizador encontrado.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border">
                                {filteredUsers.map((u) => (
                                    <div key={u.id} className="flex items-center gap-4 p-4 hover:surface-3 transition-colors">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={u.avatarUrl || undefined} />
                                            <AvatarFallback className="bg-primary/20 text-xs font-bold">
                                                {(u.displayName || u.username || 'U')[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-semibold truncate">{u.displayName || u.username || 'Sem nome'}</p>
                                                {u.isBanned && <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">Banido</Badge>}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {u.phone} · Desde {new Date(u.createdAt).toLocaleDateString('pt-AO')}
                                            </p>
                                        </div>
                                        <Badge className={`${roleColor[u.role] || roleColor.USER} border-transparent text-xs`}>
                                            {u.role}
                                        </Badge>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                                                onClick={() => router.push(`/profile/${u.id}`)} title="Ver perfil">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon"
                                                className={`h-8 w-8 rounded-lg ${u.isBanned ? 'text-green-400 hover:text-green-300' : 'text-muted-foreground hover:text-red-400'}`}
                                                onClick={() => handleBanToggle(u)} title={u.isBanned ? 'Desbanir' : 'Banir'}>
                                                <Ban className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
