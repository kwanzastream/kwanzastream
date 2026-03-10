"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Loader2, Plus, Target, Users, TrendingUp } from "lucide-react";

export default function AdsPage() {
    const activeCampaigns = [
        {
            id: 1,
            name: "Promoção de Verão",
            status: "Ativo",
            budget: "50,000 Kz",
            spent: "12,500 Kz",
            impressions: "15k",
            clicks: "450",
        },
        {
            id: 2,
            name: "Lançamento de Produto",
            status: "Pausado",
            budget: "100,000 Kz",
            spent: "80,000 Kz",
            impressions: "95k",
            clicks: "2,300",
        },
    ];

    const data = [
        { name: "Seg", clicks: 400 },
        { name: "Ter", clicks: 300 },
        { name: "Qua", clicks: 550 },
        { name: "Qui", clicks: 450 },
        { name: "Sex", clicks: 600 },
        { name: "Sab", clicks: 700 },
        { name: "Dom", clicks: 500 },
    ];

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kwanza Ads</h1>
                    <p className="text-muted-foreground mt-1">Gerencie suas campanhas publicitárias e alcance mais pessoas.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Campanha
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impressões Totais</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+235k</div>
                        <p className="text-xs text-muted-foreground">+180.1% em relação ao mês passado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cliques (CTR)</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% em relação ao mês passado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Custo Médio</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">25 Kz</div>
                        <p className="text-xs text-muted-foreground">-4% em relação ao mês passado</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Desempenho Geral</CardTitle>
                        <CardDescription>Visualização de cliques nos últimos 7 dias</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        itemStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Bar dataKey="clicks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Campanhas Ativas</CardTitle>
                        <CardDescription>Suas campanhas em execução no momento.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeCampaigns.map((campaign) => (
                                <div key={campaign.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{campaign.name}</p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Badge variant={campaign.status === "Ativo" ? "default" : "secondary"} className="mr-2 text-[10px] px-1 py-0 h-5">
                                                {campaign.status}
                                            </Badge>
                                            <span>{campaign.spent} / {campaign.budget}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{campaign.clicks} Cliques</p>
                                        <p className="text-xs text-muted-foreground">{campaign.impressions} Impressões</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Ver Todas as Campanhas</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
