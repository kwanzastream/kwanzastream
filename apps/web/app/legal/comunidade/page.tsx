"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Heart, AlertTriangle } from "lucide-react";

export default function ComunidadePage() {
    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Diretrizes da Comunidade</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    O Kwanza Stream é um lugar para todos. Estas diretrizes ajudam a manter nossa comunidade
                    segura, acolhedora e divertida.
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
                            <li>Não permitimos violência, ameaças ou incitação ao ódio.</li>
                            <li>Conteúdo sexualmente explícito é proibido.</li>
                            <li>Proteja sua privacidade e a dos outros. Não divulgue dados pessoais.</li>
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
                            <li>Trate todos com respeito. Assédio e bullying não são tolerados.</li>
                            <li>Respeite a diversidade de opiniões, crenças e origens.</li>
                            <li>Seja gentil, mesmo em discussões acaloradas.</li>
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
                            <li>Não use bots ou trapaças para inflar números ou prejudicar outros.</li>
                            <li>Respeite os direitos autorais e propriedade intelectual.</li>
                            <li>Não espalhe desinformação prejudicial.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-destructive">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="p-2 bg-destructive/10 rounded-full text-destructive">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">Consequências</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Violações destas diretrizes podem resultar em ações que variam desde avisos até a suspensão permanente da conta.
                        </p>
                        <p className="text-muted-foreground">
                            Nossa equipe de moderação analisa denúncias 24/7 para garantir o cumprimento destas regras.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
