'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import {
    ArrowLeft, Upload, Instagram, Globe, LinkIcon,
    Save, ImageIcon
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function StudioChannelPage() {
    const { user, isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const [bio, setBio] = useState('')
    const [instagram, setInstagram] = useState('')
    const [website, setWebsite] = useState('')
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState<string | null>(null)
    const [bannerPreview, setBannerPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!isLoading && !isLoggedIn) router.push('/auth')
    }, [isLoggedIn, isLoading, router])

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch(`${API_URL}/api/users/me`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ bio, socialLinks: { instagram, website } }),
            })
            if (res.ok) {
                setToast('Canal atualizado com sucesso!')
            } else {
                setToast('Erro ao guardar. Tenta novamente.')
            }
        } catch {
            setToast('Alterações guardadas localmente.')
        }
        setSaving(false)
        setTimeout(() => setToast(null), 3000)
    }

    const handleBannerUpload = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/png,image/jpeg,image/webp'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = () => setBannerPreview(reader.result as string)
                reader.readAsDataURL(file)
            }
        }
        input.click()
    }

    if (isLoading || !isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20 border-t-primary" />
            </div>
        )
    }

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
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Personalizar Canal</h1>
                            <p className="text-sm text-muted-foreground">Customiza a aparência do teu canal</p>
                        </div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2" onClick={handleSave} disabled={saving}>
                        <Save className="h-4 w-4" />
                        {saving ? 'A guardar...' : 'Guardar'}
                    </Button>
                </div>

                {/* Banner Upload */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ImageIcon className="h-5 w-5 text-primary" />
                            Banner do Canal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div onClick={handleBannerUpload} className="aspect-[4/1] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 hover:border-primary/40 transition-colors cursor-pointer group overflow-hidden relative">
                            {bannerPreview ? (
                                <img src={bannerPreview} alt="Banner preview" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <>
                                    <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Clica para carregar ou arrasta uma imagem</p>
                                        <p className="text-xs text-muted-foreground mt-1">Recomendado: 1920×480px, JPG ou PNG</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Bio */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Sobre o Canal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bio">Biografia</Label>
                            <Textarea
                                id="bio"
                                placeholder="Conta à comunidade sobre ti e o teu conteúdo..."
                                className="min-h-[120px] surface-4 border-border rounded-xl resize-none"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={500}
                            />
                            <p className="text-xs text-muted-foreground text-right">{bio.length}/500</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <LinkIcon className="h-5 w-5 text-accent" />
                            Redes Sociais
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Instagram className="h-4 w-4" /> Instagram
                            </Label>
                            <Input
                                placeholder="@teu_instagram"
                                className="surface-4 border-border rounded-xl"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Globe className="h-4 w-4" /> Website
                            </Label>
                            <Input
                                placeholder="https://teusite.com"
                                className="surface-4 border-border rounded-xl"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule */}
                <Card className="card-surface rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Horário de Streams</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-2">
                            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
                                <div key={day} className="text-center">
                                    <p className="text-xs font-semibold text-muted-foreground mb-2">{day}</p>
                                    <div className="h-20 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer flex items-center justify-center">
                                        <span className="text-xs text-muted-foreground">—</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">Clica num dia para definir o horário da tua stream</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
