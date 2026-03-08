import NodeMediaServer from 'node-media-server';
import prisma from '../config/prisma';
import { io } from '../index';

// CDN URL for stream playback (used by frontend)
const STREAM_CDN_URL = process.env.STREAM_CDN_URL || 'http://localhost:8000';
const STREAM_RECORDING_ENABLED = process.env.STREAM_RECORDING_ENABLED === 'true';

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
    },
    http: {
        port: 8000,
        mediaroot: './media',
        allow_origin: '*',
    },
    trans: {
        ffmpeg: process.env.FFMPEG_PATH || 'ffmpeg',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                hlsKeep: false,
                dash: false,
                // Multi-quality variants — Angola bandwidth optimization
                // 720p: 2500kbps (good connection)
                // 480p: 1200kbps (standard mobile)
                // 360p: 600kbps (low bandwidth / data saving)
            },
            // Recording task — generates MP4 for VOD (if enabled)
            ...(STREAM_RECORDING_ENABLED ? [{
                app: 'live',
                mp4: true,
                mp4Flags: '[movflags=frag_keyframe+empty_moov]',
            }] : []),
        ],
    },
    auth: {
        play: false,
        publish: true,
        secret: process.env.RTMP_SECRET || '',
    },
};

let nms: NodeMediaServer | null = null;

// Track active streams for health monitoring
const activeStreams = new Map<string, { startTime: Date; streamId: string; bitrate?: number }>();

export const startMediaServer = () => {
    nms = new NodeMediaServer(config);

    // Stream publish event - when streamer starts broadcasting
    nms.on('prePublish', async (id: string, streamPath: string, args: any) => {
        console.log('[RTMP] prePublish:', streamPath, args);

        // Extract stream key from path: /live/streamKey
        const streamKey = streamPath.split('/')[2];

        if (!streamKey) {
            console.log('[RTMP] No stream key provided, rejecting');
            const session = (nms as any)?.getSession(id);
            session?.reject();
            return;
        }

        // Validate stream key
        const user = await prisma.user.findUnique({
            where: { streamKey },
        });

        if (!user) {
            console.log('[RTMP] Invalid stream key, rejecting');
            const session = (nms as any)?.getSession(id);
            session?.reject();
            return;
        }

        console.log(`[RTMP] User ${user.displayName || user.id} authenticated`);

        // Find user's pending stream and set it to LIVE
        const stream = await prisma.stream.findFirst({
            where: { streamerId: user.id, status: 'OFFLINE' },
            orderBy: { createdAt: 'desc' },
        });

        if (stream) {
            await prisma.stream.update({
                where: { id: stream.id },
                data: {
                    status: 'LIVE',
                    startedAt: new Date(),
                },
            });

            // Track active stream for health monitoring
            activeStreams.set(streamKey, { startTime: new Date(), streamId: stream.id });

            // Notify clients via WebSocket
            io.emit('stream-live', {
                streamId: stream.id,
                streamer: {
                    id: user.id,
                    displayName: user.displayName,
                    username: user.username,
                    avatarUrl: user.avatarUrl,
                },
                title: stream.title,
                hlsUrl: `${STREAM_CDN_URL}/live/${streamKey}/index.m3u8`,
            });

            console.log(`[RTMP] Stream ${stream.id} is now LIVE`);
            console.log(`[RTMP] HLS URL: ${STREAM_CDN_URL}/live/${streamKey}/index.m3u8`);
        }
    });

    // Stream unpublish event - when streamer stops
    nms.on('donePublish', async (id: string, streamPath: string, args: any) => {
        console.log('[RTMP] donePublish:', streamPath);

        const streamKey = streamPath.split('/')[2];

        if (!streamKey) return;

        const user = await prisma.user.findUnique({
            where: { streamKey },
        });

        if (!user) return;

        // Get active stream data for duration calculation
        const activeStream = activeStreams.get(streamKey);
        activeStreams.delete(streamKey);

        // End user's live stream
        const stream = await prisma.stream.findFirst({
            where: { streamerId: user.id, status: 'LIVE' },
        });

        if (stream) {
            // Calculate peak viewers from Socket.io room
            const room = io.sockets.adapter.rooms.get(`stream:${stream.id}`);
            const finalViewerCount = room?.size || 0;

            await prisma.stream.update({
                where: { id: stream.id },
                data: {
                    status: 'ENDED',
                    endedAt: new Date(),
                    peakViewers: Math.max(stream.peakViewers || 0, finalViewerCount),
                },
            });

            io.to(`stream:${stream.id}`).emit('stream-ended', { streamId: stream.id });
            console.log(`[RTMP] Stream ${stream.id} has ENDED (duration: ${activeStream ? Math.round((Date.now() - activeStream.startTime.getTime()) / 1000) : 'unknown'}s)`);
        }
    });

    // Player connects to watch
    nms.on('prePlay', (id: string, streamPath: string, args: any) => {
        console.log('[RTMP] prePlay:', streamPath);
    });

    // Player disconnects
    nms.on('donePlay', (id: string, streamPath: string, args: any) => {
        console.log('[RTMP] donePlay:', streamPath);
    });

    nms.run();
    console.log(`
📹 RTMP Media Server Started
🎬 RTMP: rtmp://localhost:1935/live/{streamKey}
🌐 HLS: ${STREAM_CDN_URL}/live/{streamKey}/index.m3u8
📼 Recording: ${STREAM_RECORDING_ENABLED ? 'ENABLED' : 'DISABLED'}
  `);
};

export const stopMediaServer = () => {
    if (nms) {
        nms.stop();
        nms = null;
    }
};

export const getMediaServer = () => nms;

/** Get health info for active streams — used by stream health endpoint */
export const getActiveStreamInfo = (streamKey: string) => {
    return activeStreams.get(streamKey) || null;
};

/** Get CDN URL for stream playback */
export const getStreamCdnUrl = () => STREAM_CDN_URL;
