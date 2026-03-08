'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft, Settings, Flag, DollarSign, Shield,
    AlertTriangle, Save, Bell
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminSettingsPage() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState<string | null>(null)

    // Feature Flags
    const [features, setFeatures] = useState({
        clips: true,
        events: true,
        directMessages: false,
        kizombaMode: false,
        betaFeedback: true,
        pushNotifications: true,
        multicaixaPayments: true,
        eKwanzaPayments: false,
    })

    // Platform Settings
    const [commissionRate, setCommissionRate] = useState('20')
    const [maintenanceMode, setMaintenanceMode] = useState(false)

    const toggleFeature = (key: keyof typeof features) => {
        setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleSave = () => {
        setSaving(true)
        setTimeout(() => {
            setSaving(false)
            setToast('Configurações guardadas com sucesso!')
            setTimeout(() => setToast(null), 3000)
        }, 800)
    }

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in bg-green-500/90 text-white">
                    {toast}
                </div>
            )}
            <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configurações</h1>
                            <p className="text-sm text-muted-foreground">Configurações globais da plataforma</p>
                        </div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2" onClick={handleSave} disabled={saving}>
                        <Save className="h-4 w-4" />
                        {saving ? 'A guardar...' : 'Guardar'}
                    </Button>
                </div>

                {/* Maintenance Mode */}
                <Card className={`rounded-2xl mb-6 ${maintenanceMode ? 'border-amber-500/50 border-2' : 'card-surface'}`}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${maintenanceMode ? 'bg-amber-500/10' : 'bg-muted'}`}>
                                    <AlertTriangle className={`h-6 w-6 ${maintenanceMode ? 'text-amber-400' : 'text-muted-foreground'}`} />
                                </div>
                                <div>
                                    <p className="font-semibold">Modo Manutenção</p>
                                    <p className="text-xs text-muted-foreground">Quando ativo, apenas admins podem aceder à plataforma</p>
                                </div>
                            </div>
                            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                        </div>
                    </CardContent>
                </Card>

                {/* Feature Flags */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Flag className="h-5 w-5 text-primary" />
                            Feature Flags
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {Object.entries(features).map(([key, enabled]) => (
                            <div key={key} className="flex items-center justify-between p-3 rounded-xl hover:surface-3 transition-colors">
                                <div>
                                    <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className={`text-[10px] ${enabled ? 'bg-green-500/10 text-green-400' : 'bg-muted text-muted-foreground'} border-transparent`}>
                                        {enabled ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                    <Switch checked={enabled} onCheckedChange={() => toggleFeature(key as keyof typeof features)} />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Financial Settings */}
                <Card className="card-surface rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-400" />
                            Configurações Financeiras
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Taxa da Plataforma (%)</Label>
                            <div className="flex gap-3 items-center">
                                <Input
                                    type="number"
                                    min="0"
                                    max="50"
                                    value={commissionRate}
                                    onChange={(e) => setCommissionRate(e.target.value)}
                                    className="w-24 surface-4 border-border rounded-xl text-center"
                                />
                                <span className="text-sm text-muted-foreground">% sobre cada Salo</span>
                            </div>
                        </div>

                        <div className="divider" />

                        <div>
                            <p className="text-sm font-semibold mb-3">Tiers de Salos</p>
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                {[
                                    { label: 'Bronze', value: '50' },
                                    { label: 'Prata', value: '200' },
                                    { label: 'Ouro', value: '1000' },
                                    { label: 'Diamante', value: '5000' },
                                    { label: 'Lendário', value: '10000' },
                                ].map((tier) => (
                                    <div key={tier.label} className="space-y-1.5">
                                        <Label className="text-xs">{tier.label}</Label>
                                        <div className="flex items-center gap-1">
                                            <Input
                                                type="number"
                                                defaultValue={tier.value}
                                                className="surface-4 border-border rounded-xl text-sm text-center"
                                            />
                                            <span className="text-xs text-muted-foreground shrink-0">Kz</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="card-surface rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Bell className="h-5 w-5 text-accent" />
                            Anúncios Globais
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label>Mensagem de Anúncio</Label>
                            <Input
                                placeholder="Ex: Bem-vindos ao Beta da Kwanza Stream! 🎉"
                                className="surface-4 border-border rounded-xl"
                            />
                            <p className="text-xs text-muted-foreground">Será mostrada como banner no topo do site para todos os utilizadores</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
