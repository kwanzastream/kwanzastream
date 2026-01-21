"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, Video, MessageCircle, Home } from "lucide-react"
import Link from "next/link"

export default function LiteModePage() {
  // Mock data
  const liveStreams = [
    { id: "1", title: "Live 1", creator: "Criador 1", listeners: 1250 },
    { id: "2", title: "Live 2", creator: "Criador 2", listeners: 890 }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="flex h-12 items-center justify-between px-4">
          <Link href="/" className="font-bold text-lg">
            Kwanza Stream <span className="text-primary">Lite</span>
          </Link>
          <Link href="/feed">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Versão Completa
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Info Banner */}
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-sm text-center">
                <strong>Modo Baixo Consumo</strong> - Versão otimizada para conexões lentas e economia de dados
              </p>
            </CardContent>
          </Card>

          {/* Live Streams */}
          <section>
            <h2 className="text-xl font-bold mb-4">Lives ao Vivo</h2>
            <div className="space-y-2">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="hover:border-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Radio className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold truncate">{stream.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{stream.creator}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {stream.listeners} ouvintes
                        </Badge>
                        <Link href={`/stream/${stream.id}?mode=lite`}>
                          <Button size="sm">Ouvir</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Simple Chat */}
          <section>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat Simples
                </h3>
                <div className="space-y-2 mb-4 h-48 overflow-y-auto">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium">Usuário {i}:</span>
                      <span className="text-muted-foreground ml-2">Mensagem de exemplo {i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escrever mensagem..."
                    className="flex-1 bg-muted px-3 py-2 rounded-lg border border-border text-sm"
                  />
                  <Button size="sm">Enviar</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Features Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Sobre o Modo Lite</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Otimizado para conexões 2G/3G</li>
                <li>Economia de dados até 80%</li>
                <li>Carregamento rápido</li>
                <li>Foco em áudio e chat simples</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
