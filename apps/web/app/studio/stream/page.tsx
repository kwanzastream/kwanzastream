'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import {
    ArrowLeft, Copy, Check, Play, Square, Key,
    Upload, Monitor, Radio
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const RTMP_SERVER = 'rtmp://stream.kwanza.ao/live'

export default function StudioStreamConfigPage() {
    const { user, isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const [streamKey] = useState(() => 'kwanza_sk_' + Math.random().toString(36).substring(2, 15))
    const [copied, setCopied] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [isStreaming, setIsStreaming] = useState(false)
    const [toast, setToast] = useState<string | null>(null)
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
    const [starting, setStarting] = useState(false)

    useEffect(() => {
        if (!isLoading && !isLoggedIn) router.push('/auth')
    }, [isLoggedIn, isLoading, router])

    const handleCopyKey = () => {
        navigator.clipboard.writeText((user as any)?.streamKey || streamKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleThumbnailUpload = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/png,image/jpeg,image/webp'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = () => setThumbnailPreview(reader.result as string)
                reader.readAsDataURL(file)
            }
        }
        input.click()
    }

    const handleToggleStream = async () => {
        if (isStreaming) {
            setIsStreaming(false)
            setToast('Stream terminada.')
            setTimeout(() => setToast(null), 3000)
            return
        }
        if (!title.trim()) {
            setToast('Adiciona um título para a tua stream.')
            setTimeout(() => setToast(null), 3000)
            return
        }
        setStarting(true)
        try {
            const res = await fetch(`${API_URL}/api/streams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title: title.trim(), category: category || undefined }),
            })
            if (res.ok) {
                setIsStreaming(true)
                setToast('Stream criada! Configura o OBS com a chave acima.')
            } else {
                setToast('Erro ao criar stream. Tenta novamente.')
            }
        } catch {
            setToast('Erro de rede. Verifica a conexão.')
        }
        setStarting(false)
        setTimeout(() => setToast(null), 4000)
    }

    if (isLoading || !isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20 border-t-primary" />
            </div>
        )
    }

    const displayStreamKey = (user as any)?.streamKey || streamKey

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in bg-green-500/90 text-white">
                    {toast}
                </div>
            )}
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/studio')} className="rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configuração de Stream</h1>
                            <p className="text-sm text-muted-foreground">Configura a tua transmissão ao vivo</p>
                        </div>
                    </div>
                    <Badge className={isStreaming ? 'bg-red-600 animate-pulse border-none' : 'bg-muted border-border text-muted-foreground'}>
                        <Radio className="h-3 w-3 mr-1" />
                        {isStreaming ? 'AO VIVO' : 'OFFLINE'}
                    </Badge>
                </div>

                {/* RTMP Config */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Key className="h-5 w-5 text-primary" />
                            Configuração RTMP
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>URL do Servidor</Label>
                            <div className="flex gap-2">
                                <Input value={RTMP_SERVER} readOnly className="surface-4 border-border rounded-xl font-mono text-sm" />
                                <Button variant="outline" size="icon" className="shrink-0 rounded-xl border-border bg-transparent" onClick={() => navigator.clipboard.writeText(RTMP_SERVER)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Chave de Stream</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="password"
                                    value={displayStreamKey}
                                    readOnly
                                    className="surface-4 border-border rounded-xl font-mono text-sm"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 rounded-xl border-border bg-transparent"
                                    onClick={handleCopyKey}
                                >
                                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Nunca partilhes a tua chave de stream com ninguém.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Stream Details */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Monitor className="h-5 w-5 text-accent" />
                            Detalhes da Stream
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título da Stream</Label>
                            <Input
                                id="title"
                                placeholder="Ex: Sessão de Gaming com a Galera 🎮"
                                className="surface-4 border-border rounded-xl"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="surface-4 border-border rounded-xl">
                                    <SelectValue placeholder="Seleciona uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gaming">🎮 Gaming</SelectItem>
                                    <SelectItem value="musica">🎵 Música</SelectItem>
                                    <SelectItem value="futebol">⚽ Futebol</SelectItem>
                                    <SelectItem value="kuduro">💃 Kuduro & Semba</SelectItem>
                                    <SelectItem value="comedia">😂 Comédia</SelectItem>
                                    <SelectItem value="educacao">📚 Educação</SelectItem>
                                    <SelectItem value="culinaria">🍳 Culinária</SelectItem>
                                    <SelectItem value="conversa">💬 Conversa & IRL</SelectItem>
                                    <SelectItem value="tech">💻 Tech & Programação</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="space-y-2">
                            <Label>Thumbnail</Label>
                            <div onClick={handleThumbnailUpload} className="aspect-video max-w-sm rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/40 transition-colors cursor-pointer group overflow-hidden relative">
                                {thumbnailPreview ? (
                                    <img src={thumbnailPreview} alt="Thumbnail preview" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <p className="text-xs text-muted-foreground">1280×720px recomendado</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Start/Stop Stream */}
                <Button
                    className={`w-full h-14 rounded-2xl text-lg font-bold gap-3 ${isStreaming
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-primary hover:bg-primary/90'
                        }`}
                    onClick={handleToggleStream}
                    disabled={starting}
                    style={{ boxShadow: isStreaming ? '0 0 30px rgba(220, 50, 50, 0.3)' : 'var(--shadow-glow)' }}
                >
                    {starting ? (
                        <>A criar stream...</>
                    ) : isStreaming ? (
                        <><Square className="h-5 w-5" /> Parar Stream</>
                    ) : (
                        <><Play className="h-5 w-5" /> Iniciar Stream</>
                    )}
                </Button>
            </div>
        </div>
    )
}
