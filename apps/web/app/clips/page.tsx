"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreVertical, Play, Volume2 } from "lucide-react";

export default function ClipsPage() {
    const clips = [
        {
            id: 1,
            title: "Melhor jogada da partida!",
            streamer: "GamerPro_AO",
            views: "15k",
            thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            avatar: "https://github.com/shadcn.png",
            duration: "0:30",
        },
        {
            id: 2,
            title: "React engraçado ao vivo 😂",
            streamer: "AngolaLive",
            views: "8.2k",
            thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            avatar: "https://github.com/shadcn.png",
            duration: "0:45",
        },
        {
            id: 3,
            title: "Tutorial rápido de Redstone",
            streamer: "MineCrafter",
            views: "22k",
            thumbnail: "https://images.unsplash.com/photo-1574717435429-c6a8713d863c?w=800&q=80",
            avatar: "https://github.com/shadcn.png",
            duration: "0:59",
        },
        {
            id: 4,
            title: "Setup Tour 2026",
            streamer: "TechMaster",
            views: "5k",
            thumbnail: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
            avatar: "https://github.com/shadcn.png",
            duration: "0:15",
        },
    ];

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Clips em Alta</h1>
                <div className="flex gap-2">
                    <Button variant="outline">Populares</Button>
                    <Button variant="ghost">Novos</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clips.map((clip) => (
                    <Card key={clip.id} className="overflow-hidden group cursor-pointer hover:border-primary transition-all">
                        <div className="relative aspect-[9/16] bg-black">
                            <img
                                src={clip.thumbnail}
                                alt={clip.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                <div className="bg-primary/90 text-primary-foreground rounded-full p-3">
                                    <Play className="h-6 w-6 fill-current" />
                                </div>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-medium text-white">
                                {clip.duration}
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                                <h3 className="text-white font-bold leading-tight line-clamp-2 drop-shadow-md mb-1">{clip.title}</h3>
                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                    <Avatar className="h-5 w-5 border border-white/20">
                                        <AvatarImage src={clip.avatar} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="truncate">{clip.streamer}</span>
                                </div>
                            </div>
                        </div>
                        <CardFooter className="p-3 bg-card flex justify-between items-center text-muted-foreground">
                            <div className="text-xs font-medium flex items-center gap-1">
                                <Play className="h-3 w-3" /> {clip.views} visualizações
                            </div>
                            <div className="flex gap-3">
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
