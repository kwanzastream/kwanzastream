'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
    ArrowLeft,
    Users,
    Heart,
    Share2,
    Send,
    Gift,
    Flame,
    MessageCircle,
    UserPlus,
    CheckCircle2,
} from 'lucide-react';
import { HlsPlayer } from '@/components/hls-player';
import { useChat, type ChatMessage } from '@/hooks/use-chat';
import { useAuth } from '@/lib/auth-context';
import { streamService, userService } from '@/lib/services';
import { SaloSystem } from '@/components/salo-system';
import { shareStream } from '@/lib/whatsapp-share';
import { DonationAlertOverlay } from '@/components/donation-alert-overlay';
import { ChatModerationPanel } from '@/components/chat-moderation-panel';

interface StreamData {
    id: string;
    title: string;
    description?: string;
    category?: string;
    status: string;
    viewerCount: number;
    startedAt?: string;
    streamKey?: string;
    streamer: {
        id: string;
        displayName?: string;
        username?: string;
        avatarUrl?: string;
        isVerified?: boolean;
        _count?: { followers: number };
    };
}

export default function WatchPage() {
    const params = useParams();
    const router = useRouter();
    const streamId = params.id as string;
    const { user, isLoggedIn } = useAuth();

    const [stream, setStream] = React.useState<StreamData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [chatInput, setChatInput] = React.useState('');
    const [isFollowing, setIsFollowing] = React.useState(false);
    const [showSalo, setShowSalo] = React.useState(false);
    const [donationAnim, setDonationAnim] = React.useState<{ emoji: string; name: string; amount: number } | null>(null);
    const [copied, setCopied] = React.useState(false);
    const chatEndRef = React.useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        const url = `${window.location.origin}/watch/${streamId}`;
        const title = stream?.title || 'Kwanza Stream';
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch { /* user cancelled */ }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const { messages, viewerCount, isConnected, sendMessage } = useChat({
        streamId,
        enabled: !!stream && stream.status === 'LIVE',
    });

    // Fetch stream data
    React.useEffect(() => {
        const fetchStream = async () => {
            try {
                const res = await streamService.getById(streamId);
                setStream(res.data);
            } catch (err) {
                console.error('Failed to load stream:', err);
            } finally {
                setLoading(false);
            }
        };

        if (streamId) fetchStream();
    }, [streamId]);

    // Auto-scroll chat
    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        sendMessage(chatInput);
        setChatInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFollow = async () => {
        if (!stream?.streamer?.id) return;
        // Optimistic update — instant feedback on slow networks
        const wasFollowing = isFollowing;
        setIsFollowing(!wasFollowing);
        setStream(prev => prev ? {
            ...prev,
            streamer: {
                ...prev.streamer,
                _count: {
                    ...prev.streamer._count!,
                    followers: (prev.streamer._count?.followers || 0) + (wasFollowing ? -1 : 1),
                },
            },
        } : null);
        try {
            if (wasFollowing) {
                await userService.unfollow(stream.streamer.id);
            } else {
                await userService.follow(stream.streamer.id);
            }
        } catch (err) {
            // Rollback on error
            setIsFollowing(wasFollowing);
            setStream(prev => prev ? {
                ...prev,
                streamer: {
                    ...prev.streamer,
                    _count: {
                        ...prev.streamer._count!,
                        followers: (prev.streamer._count?.followers || 0) + (wasFollowing ? 1 : -1),
                    },
                },
            } : null);
            console.error('Follow error:', err);
        }
    };

    const handleDonationSent = (donation: any) => {
        setShowSalo(false);
        setDonationAnim({
            emoji: donation.saloEmoji || '🎁',
            name: donation.saloName || 'Salo',
            amount: donation.amount || 0,
        });
        setTimeout(() => setDonationAnim(null), 4000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row">
                <div className="flex-1 flex flex-col">
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-8 w-2/3" />
                        <div className="flex gap-3">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-80 border-l border-white/10 p-4">
                    <Skeleton className="h-6 w-32 mb-4" />
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-10 w-full mb-3" />
                    ))}
                </div>
            </div>
        );
    }

    if (!stream) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-xl font-bold">Stream não encontrada</p>
                    <p className="text-muted-foreground">Esta transmissão não existe ou foi removida.</p>
                    <Button onClick={() => router.push('/feed')} variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao Feed
                    </Button>
                </div>
            </div>
        );
    }

    const hlsUrl = stream.streamKey
        ? `http://localhost:8000/live/${stream.streamKey}/index.m3u8`
        : '';

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Back Button */}
                <div className="h-12 flex items-center px-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
                    <Button variant="ghost" size="sm" onClick={() => router.push('/feed')} className="gap-2 text-muted-foreground hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Voltar
                    </Button>
                </div>

                {/* HLS Player */}
                <div className="relative">
                    <HlsPlayer
                        src={hlsUrl}
                        viewerCount={viewerCount || stream.viewerCount}
                        autoPlay
                    />

                    {/* Socket.io Real-time Donation Alert Overlay */}
                    <DonationAlertOverlay streamId={stream.id} position="top" />

                    {/* Local Donation Animation (sender feedback) */}
                    {donationAnim && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-in fade-in zoom-in duration-500">
                            <div className="text-center bg-black/60 backdrop-blur-md rounded-2xl px-10 py-8 border border-primary/30">
                                <div className="text-7xl mb-3 animate-bounce">{donationAnim.emoji}</div>
                                <p className="text-xl font-black text-primary">{donationAnim.name}</p>
                                <p className="text-2xl font-black text-white mt-1">{donationAnim.amount.toLocaleString()} Kz</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stream Info */}
                <div className="p-4 md:p-6 space-y-4 border-b border-white/10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl md:text-2xl font-bold truncate">{stream.title}</h1>
                            {stream.category && (
                                <Badge variant="outline" className="mt-2 text-xs border-white/20">
                                    {stream.category}
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-400">
                                <Heart className="h-5 w-5" />
                            </Button>
                            {/* WhatsApp — #1 in Angola */}
                            <Button
                                variant="ghost" size="icon"
                                className="text-muted-foreground hover:text-green-400"
                                onClick={() => window.open(shareStream(stream.title, stream.streamer.id, streamId), '_blank')}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.29-1.24l-.29-.18-3.12.82.84-3.04-.2-.3A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white" onClick={handleShare}>
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Streamer Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 ring-2 ring-primary ring-offset-2 ring-offset-background">
                                <AvatarImage src={stream.streamer?.avatarUrl || '/abstract-profile.png'} />
                                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                                    {(stream.streamer?.displayName || stream.streamer?.username || 'S')[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold flex items-center gap-1.5">
                                    {stream.streamer?.displayName || stream.streamer?.username || 'Streamer'}
                                    {stream.streamer?.isVerified && (
                                        <CheckCircle2 className="h-4 w-4 text-primary fill-primary" />
                                    )}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {stream.streamer?._count?.followers || 0} seguidores
                                </p>
                            </div>
                        </div>
                        {isLoggedIn && stream.streamer?.id !== user?.id && (
                            <Button
                                onClick={handleFollow}
                                variant={isFollowing ? 'outline' : 'default'}
                                size="sm"
                                className={isFollowing ? 'border-white/20 bg-transparent' : 'bg-primary hover:bg-primary/90 gap-2'}
                            >
                                <UserPlus className="h-4 w-4" />
                                {isFollowing ? 'A Seguir' : 'Seguir'}
                            </Button>
                        )}
                    </div>

                    {stream.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {stream.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Chat Sidebar */}
            <aside className="w-full lg:w-80 border-l border-white/10 flex flex-col bg-black/20 h-[50vh] lg:h-screen">
                {/* Chat Header */}
                <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-primary" /> Chat da Live
                    </h3>
                    <div className="flex items-center gap-2">
                        {/* Chat Moderation Panel for streamers/mods */}
                        <div className="relative">
                            <ChatModerationPanel
                                streamId={stream.id}
                                isStreamer={stream.streamer?.id === user?.id}
                            />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-[10px] text-muted-foreground">
                                {isConnected ? 'Conectado' : 'Desconectado'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                        {messages.length === 0 && (
                            <div className="text-center py-8">
                                <MessageCircle className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground">
                                    Sem mensagens ainda. Sé o primeiro!
                                </p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} msg={msg} isStreamer={msg.userId === stream?.streamer?.id} />
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                </ScrollArea>

                {/* Salo Donation Panel */}
                {showSalo && isLoggedIn && stream?.streamer?.id && stream.streamer.id !== user?.id && (
                    <div className="p-3 border-t border-white/10 bg-black/60 backdrop-blur shrink-0 animate-in slide-in-from-bottom-2">
                        <SaloSystem
                            receiverId={stream.streamer.id}
                            streamId={stream.id}
                            receiverName={stream.streamer?.displayName || stream.streamer?.username}
                            onDonationSent={handleDonationSent}
                            onClose={() => setShowSalo(false)}
                            compact
                        />
                    </div>
                )}

                {/* Chat Input */}
                <div className="p-4 border-t border-white/10 bg-black/40 shrink-0">
                    {isLoggedIn ? (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Input
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escreve algo..."
                                    className="bg-white/5 border-white/10 pr-10 rounded-full h-10 text-sm"
                                    maxLength={300}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`absolute right-1 top-1 h-8 w-8 ${showSalo ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary'}`}
                                    onClick={() => setShowSalo(!showSalo)}
                                >
                                    <Gift className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button
                                onClick={handleSendMessage}
                                size="icon"
                                className="bg-primary hover:bg-primary/90 rounded-full h-10 w-10 shrink-0"
                                disabled={!chatInput.trim() || !isConnected}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => router.push('/auth')}
                            variant="outline"
                            className="w-full border-white/10 bg-transparent text-sm"
                        >
                            Faz login para participar do chat
                        </Button>
                    )}
                </div>
            </aside>

            {/* Copied Toast */}
            {copied && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2">
                    ✓ Link copiado!
                </div>
            )}
        </div>
    );
}

function ChatBubble({ msg, isStreamer }: { msg: ChatMessage; isStreamer: boolean }) {
    if (msg.type === 'donation') {
        return (
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 space-y-1 animate-in fade-in slide-in-from-right-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-primary uppercase flex items-center gap-1">
                        <Gift className="h-3 w-3" /> Salo
                    </span>
                    {msg.amount && (
                        <span className="text-[10px] font-bold text-primary">{msg.amount} Kz</span>
                    )}
                </div>
                <p className="text-xs font-bold">{msg.message}</p>
                <p className="text-[10px] text-muted-foreground">
                    Por: {msg.displayName || msg.username}
                </p>
            </div>
        );
    }

    if (msg.type === 'system') {
        return (
            <div className="text-center py-1">
                <span className="text-[10px] text-muted-foreground italic">{msg.message}</span>
            </div>
        );
    }

    return (
        <div className="flex gap-2 text-sm items-start">
            <Avatar className="h-6 w-6 shrink-0 mt-0.5">
                <AvatarImage src={msg.avatarUrl} />
                <AvatarFallback className="text-[10px] bg-white/10">
                    {(msg.displayName || msg.username || '?')[0]}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
                <p className="leading-tight">
                    <span className={`font-black mr-1.5 ${isStreamer ? 'text-primary' : 'text-muted-foreground'}`}>
                        {msg.displayName || msg.username}
                    </span>
                    <span className="text-foreground/90">{msg.message}</span>
                </p>
            </div>
        </div>
    );
}
