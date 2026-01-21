"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransparenciaPage() {
    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Relatório de Transparência</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Nosso compromisso com a segurança e a integridade da comunidade Kwanza Stream.
                    Aqui compartilhamos dados sobre como aplicamos nossas diretrizes.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Segurança da Comunidade</CardTitle>
                        <CardDescription>Ações tomadas no último semestre (Jul - Dez 2025)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm font-medium">Contas removidas</span>
                            <span className="font-bold">1,234</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm font-medium">Conteúdo removido</span>
                            <span className="font-bold">5,678</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm font-medium">Denúncias recebidas</span>
                            <span className="font-bold">12,450</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-sm font-medium">Taxa de ação proativa</span>
                            <span className="font-bold text-success">92%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Solicitações Governamentais</CardTitle>
                        <CardDescription>Pedidos de informação ou remoção recebidos</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm font-medium">Total de solicitações</span>
                            <span className="font-bold">15</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm font-medium">Solicitações de dados do usuário</span>
                            <span className="font-bold">10</span>
                        </div>
                        <div className="flex justify-between items-center  pt-2">
                            <span className="text-sm font-medium">Cumprimento de solicitações</span>
                            <span className="font-bold">100%</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Relatórios</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium">Relatório Semestral 2025.2</span>
                            <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" /> PDF
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium">Relatório Semestral 2025.1</span>
                            <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" /> PDF
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
