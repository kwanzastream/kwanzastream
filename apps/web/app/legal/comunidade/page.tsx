"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Heart, AlertTriangle, Ban, Clock, XCircle } from "lucide-react";

export default function ComunidadePage() {
    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Diretrizes da Comunidade</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    O Kwanza Stream é a casa dos creators angolanos. Estas regras existem para que todos
                    se sintam seguros, respeitados e bem-vindos. 🇦🇴
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-l-4 border-l-primary">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <Shield className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">Segurança em Primeiro Lugar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Violência, ameaças ou incitação ao ódio são proibidos.</li>
                            <li>Conteúdo sexualmente explícito é proibido.</li>
                            <li>Protege a tua privacidade e a dos outros. Nunca divulgues dados pessoais (doxxing).</li>
                            <li>Menores de 13 anos não podem criar contas.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-secondary">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="p-2 bg-secondary/10 rounded-full text-secondary-foreground">
                            <Users className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">Respeito Mútuo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Trata todos com respeito. Assédio e bullying não são tolerados.</li>
                            <li>Respeita a diversidade de opiniões, crenças e origens.</li>
                            <li>Spam, flood e conteúdo repetitivo no chat são proibidos.</li>
                            <li>Impersonar outro utilizador ou creator é proibido.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="p-2 bg-accent/10 rounded-full text-accent">
                            <Heart className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">Integridade</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Não uses bots ou trapaças para inflar números.</li>
                            <li>Respeita os direitos autorais e propriedade intelectual.</li>
                            <li>Não espalhas desinformação prejudicial.</li>
                            <li>Transacções fraudulentas com Salos resultam em ban permanente.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-destructive">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="p-2 bg-destructive/10 rounded-full text-destructive">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">Como Reportar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Usa o botão <strong>"Reportar"</strong> em qualquer stream, mensagem ou perfil.</li>
                            <li>Os streamers podem usar os comandos de moderação no chat.</li>
                            <li>A nossa equipa analisa cada denúncia e responde em até 24 horas.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Strikes System */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-center">Sistema de Strikes</h2>
                <p className="text-center text-muted-foreground max-w-xl mx-auto">
                    Violações das diretrizes resultam em strikes progressivos. Três strikes = conta suspensa.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="text-center">
                        <CardHeader className="pb-2">
                            <div className="mx-auto p-3 bg-yellow-500/10 rounded-full text-yellow-500 w-fit">
                                <Clock className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-lg">
                                Strike 1 <Badge variant="outline" className="ml-2 text-yellow-500 border-yellow-500/30">Aviso</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p>Aviso formal + conteúdo removido.</p>
                            <p className="mt-2">O utilizador mantém acesso total à plataforma.</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader className="pb-2">
                            <div className="mx-auto p-3 bg-orange-500/10 rounded-full text-orange-500 w-fit">
                                <Ban className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-lg">
                                Strike 2 <Badge variant="outline" className="ml-2 text-orange-500 border-orange-500/30">Suspensão</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p>Suspensão temporária de 7 dias.</p>
                            <p className="mt-2">Sem poder transmitir, enviar mensagens ou Salos.</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader className="pb-2">
                            <div className="mx-auto p-3 bg-red-500/10 rounded-full text-red-500 w-fit">
                                <XCircle className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-lg">
                                Strike 3 <Badge variant="outline" className="ml-2 text-red-500 border-red-500/30">Ban</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p>Conta suspensa permanentemente.</p>
                            <p className="mt-2">Saldo restante pode ser sacado dentro de 30 dias.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                    Última actualização: Março 2026 · Contacto: suporte@kwanzastream.com
                </p>
            </div>
        </div>
    );
}

