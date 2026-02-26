'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Badge } from '@/components/ui/badge';
import { Users, Radio, WifiOff, Loader2 } from 'lucide-react';

interface HlsPlayerProps {
    src: string;
    streamKey?: string;
    viewerCount?: number;
    autoPlay?: boolean;
    className?: string;
}

export function HlsPlayer({
    src,
    streamKey,
    viewerCount = 0,
    autoPlay = true,
    className = '',
}: HlsPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [status, setStatus] = useState<'loading' | 'playing' | 'error' | 'offline'>('loading');
    const [retryCount, setRetryCount] = useState(0);

    const hlsUrl = src || (streamKey
        ? `http://localhost:8000/live/${streamKey}/index.m3u8`
        : '');

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !hlsUrl) {
            setStatus('offline');
            return;
        }

        // Safari native HLS
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = hlsUrl;
            video.addEventListener('loadeddata', () => setStatus('playing'));
            video.addEventListener('error', () => setStatus('offline'));
            if (autoPlay) video.play().catch(() => { });
            return;
        }

        if (!Hls.isSupported()) {
            setStatus('error');
            return;
        }

        const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: 6,
            liveDurationInfinity: true,
            manifestLoadingMaxRetry: 10,
            manifestLoadingRetryDelay: 2000,
            levelLoadingMaxRetry: 10,
            fragLoadingMaxRetry: 10,
        });

        hlsRef.current = hls;
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setStatus('playing');
            if (autoPlay) video.play().catch(() => { });
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        if (retryCount < 15) {
                            setTimeout(() => {
                                hls.loadSource(hlsUrl);
                                setRetryCount(prev => prev + 1);
                            }, 3000);
                            setStatus('loading');
                        } else {
                            setStatus('offline');
                        }
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hls.recoverMediaError();
                        break;
                    default:
                        setStatus('error');
                        hls.destroy();
                        break;
                }
            }
        });

        return () => {
            hls.destroy();
            hlsRef.current = null;
        };
    }, [hlsUrl, autoPlay, retryCount]);

    return (
        <div className={`relative bg-black aspect-video overflow-hidden ${className}`}>
            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls={status === 'playing'}
                playsInline
                muted={autoPlay}
            />

            {status === 'playing' && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge className="bg-red-600 border-none animate-pulse font-bold gap-1.5">
                        <Radio className="h-3 w-3" /> AO VIVO
                    </Badge>
                    <Badge className="bg-black/60 backdrop-blur-md border-none gap-1.5">
                        <Users className="h-3 w-3" /> {viewerCount}
                    </Badge>
                </div>
            )}

            {status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="text-center space-y-4">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
                        <p className="text-sm text-muted-foreground font-medium">
                            A conectar à transmissão...
                        </p>
                    </div>
                </div>
            )}

            {status === 'offline' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                            <WifiOff className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-bold">Transmissão Offline</p>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Esta transmissão ainda não começou ou já terminou.
                        </p>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-950/30 to-black">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                            <WifiOff className="h-10 w-10 text-red-400" />
                        </div>
                        <p className="text-lg font-bold">Erro de Reprodução</p>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Não foi possível carregar o stream. Tente recarregar a página.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
