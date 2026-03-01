"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function ConvitesPage() {
    const [email, setEmail] = useState("");
    const availableInvites = 3;

    const invitations = [
        {
            id: 1,
            email: "amigo@exemplo.com",
            status: "Aceito",
            date: "10/01/2026",
        },
        {
            id: 2,
            email: "colega@trabalho.ao",
            status: "Pendente",
            date: "14/01/2026",
        },
        {
            id: 3,
            email: "familia@email.com",
            status: "Expirado",
            date: "20/12/2025",
        },
    ];

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Mock invitation logic
        toast.success(`Convite enviado para ${email}`);
        setEmail("");
    };

    const copyLink = () => {
        navigator.clipboard.writeText("https://kwanzastream.ao/invite/USER123");
        toast.success("Link de convite copiado!");
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Convide Amigos</h1>
                <p className="text-muted-foreground">
                    Compartilhe a experiência Kwanza Stream e ganhe recompensas exclusivas.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Seus Convites</CardTitle>
                        <CardDescription>Você tem <span className="font-bold text-primary">{availableInvites}</span> convites disponíveis.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input value="https://kwanzastream.ao/invite/USER123" readOnly />
                            <Button size="icon" variant="outline" onClick={copyLink}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Ou envie por email</span>
                            </div>
                        </div>
                        <form onSubmit={handleInvite} className="flex gap-2">
                            <Input
                                placeholder="email@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                            <Button type="submit">
                                <Mail className="h-4 w-4 mr-2" />
                                Enviar
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Como funciona</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                1
                            </div>
                            <div>
                                <h4 className="font-medium">Envie um convite</h4>
                                <p className="text-sm text-muted-foreground">Compartilhe seu link exclusivo ou envie diretamente por email.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                2
                            </div>
                            <div>
                                <h4 className="font-medium">Amigos se cadastram</h4>
                                <p className="text-sm text-muted-foreground">Seus amigos criam uma conta usando seu convite.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                3
                            </div>
                            <div>
                                <h4 className="font-medium">Todos ganham</h4>
                                <p className="text-sm text-muted-foreground">Vocês recebem emblemas exclusivos e acesso antecipado a recursos.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Convites</CardTitle>
                    <CardDescription>Acompanhe o status dos convites enviados.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Data de Envio</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invitations.map((invite) => (
                                <TableRow key={invite.id}>
                                    <TableCell>{invite.email}</TableCell>
                                    <TableCell>{invite.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            invite.status === "Aceito" ? "default" :
                                                invite.status === "Pendente" ? "outline" : "destructive"
                                        } className={invite.status === "Aceito" ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                                            {invite.status === "Aceito" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                            {invite.status === "Pendente" && <Mail className="h-3 w-3 mr-1" />}
                                            {invite.status === "Expirado" && <AlertCircle className="h-3 w-3 mr-1" />}
                                            {invite.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
