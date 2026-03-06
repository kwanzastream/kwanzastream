"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Download, Settings, Key, Play, Monitor,
    Smartphone, Wifi, Users, Heart, ArrowRight
} from "lucide-react";
import Link from "next/link";

const steps = [
    {
        number: 1,
        title: "Cria a tua conta",
        description: "Regista-te com o teu número angolano. Vais receber um SMS com um código para verificar.",
        icon: Smartphone,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        number: 2,
        title: "Instala o OBS Studio",
        description: "Faz download do OBS Studio (gratuito). É o software mais usado para transmitir ao vivo.",
        icon: Download,
        color: "text-green-500",
        bg: "bg-green-500/10",
        link: { url: "https://obsproject.com/download", label: "Descarregar OBS" },
    },
    {
        number: 3,
        title: "Copia a tua Stream Key",
        description: "Vai a Studio → Criar Live → Copia o URL do Stream e a Chave de Stream. NUNCA partilhes a chave!",
        icon: Key,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        link: { url: "/studio/live/criar", label: "Ir para Studio" },
    },
    {
        number: 4,
        title: "Configura o OBS",
        description: "No OBS: Settings → Stream → Seleciona 'Custom' → Cola o URL e a Chave. Em Output, usa: Bitrate 2500 kbps, Encoder x264, Preset veryfast.",
        icon: Settings,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        number: 5,
        title: "Começa a transmitir!",
        description: "Clica 'Start Streaming' no OBS. A tua live aparece automaticamente no Kwanza Stream!",
        icon: Play,
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
];

const tips = [
    {
        icon: Wifi,
        title: "Internet estável",
        description: "Usa Wi-Fi se possível. Com dados móveis, 3G funciona mas 4G é melhor. Bitrate recomendado: 1500-2500 kbps.",
    },
    {
        icon: Monitor,
        title: "Resolução certa",
        description: "720p (1280x720) é ideal para Angola. Consome menos dados que 1080p e funciona bem em mobile.",
    },
    {
        icon: Users,
        title: "Interage com o chat",
        description: "Os viewers ficam quando te sentem presente. Lê e responde ao chat durante a live.",
    },
    {
        icon: Heart,
        title: "Consistência",
        description: "Transmite no mesmo horário. Os teus fans vão saber quando estás online.",
    },
];

export default function ComoTransmitirPage() {
    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-10">
            {/* Header */}
            <div className="text-center space-y-4">
                <Badge className="bg-primary/20 text-primary border-none text-sm px-4 py-1">
                    Guia para Streamers
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight">
                    Como Começar a Transmitir 🎬
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Em 5 passos simples, ficas pronto para fazer a tua primeira live no Kwanza Stream.
                    Não precisas de equipamento caro — um computador ou telemóvel basta!
                </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
                {steps.map((step) => (
                    <Card key={step.number} className="overflow-hidden">
                        <CardContent className="flex items-start gap-6 py-6">
                            <div className={`flex-shrink-0 p-4 rounded-2xl ${step.bg}`}>
                                <step.icon className={`h-8 w-8 ${step.color}`} />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-xs font-bold">{step.number}/5</Badge>
                                    <h3 className="text-lg font-bold">{step.title}</h3>
                                </div>
                                <p className="text-muted-foreground">{step.description}</p>
                                {step.link && (
                                    <Link href={step.link.url} target={step.link.url.startsWith('http') ? '_blank' : undefined}>
                                        <Button variant="link" className="p-0 h-auto text-primary font-bold">
                                            {step.link.label} <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* OBS Config Quick Reference */}
            <Card className="border-primary/30">
                <CardHeader>
                    <CardTitle className="text-xl">⚙️ Configuração OBS Rápida</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2 p-4 rounded-xl bg-muted/50">
                            <p className="font-bold">Stream</p>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>Service: <code className="text-foreground">Custom</code></li>
                                <li>Server: <code className="text-foreground">rtmp://stream.kwanza-stream.ao/live</code></li>
                                <li>Stream Key: <code className="text-foreground">(copia do Studio)</code></li>
                            </ul>
                        </div>
                        <div className="space-y-2 p-4 rounded-xl bg-muted/50">
                            <p className="font-bold">Output</p>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>Video Bitrate: <code className="text-foreground">2500 kbps</code></li>
                                <li>Encoder: <code className="text-foreground">x264</code></li>
                                <li>Preset: <code className="text-foreground">veryfast</code></li>
                                <li>Keyframe Interval: <code className="text-foreground">2</code></li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tips */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">💡 Dicas para Streamers Angolanos</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {tips.map((tip, i) => (
                        <Card key={i}>
                            <CardContent className="flex items-start gap-4 py-4">
                                <div className="p-2 bg-primary/10 rounded-full text-primary flex-shrink-0">
                                    <tip.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{tip.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4 py-6">
                <h2 className="text-2xl font-bold">Pronto para começar? 🇦🇴</h2>
                <div className="flex gap-4 justify-center">
                    <Link href="/studio/live/criar">
                        <Button size="lg" className="font-bold rounded-full px-8">
                            Criar a Minha Live
                        </Button>
                    </Link>
                    <Link href="/explore">
                        <Button size="lg" variant="outline" className="font-bold rounded-full px-8">
                            Ver Lives Agora
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
