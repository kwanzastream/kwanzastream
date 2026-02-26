import NodeMediaServer from 'node-media-server';
import prisma from '../config/prisma';
import { io } from '../index';

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
                // Multiple quality variants
                // mp4: false,
                // mp4Flags: '[movflags=frag_keyframe+empty_moov]',
            },
        ],
    },
    auth: {
        play: false,
        publish: true,
        secret: process.env.RTMP_SECRET || '',
    },
};

let nms: NodeMediaServer | null = null;

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
            });

            console.log(`[RTMP] Stream ${stream.id} is now LIVE`);
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

        // End user's live stream
        const stream = await prisma.stream.findFirst({
            where: { streamerId: user.id, status: 'LIVE' },
        });

        if (stream) {
            await prisma.stream.update({
                where: { id: stream.id },
                data: {
                    status: 'ENDED',
                    endedAt: new Date(),
                },
            });

            io.to(`stream:${stream.id}`).emit('stream-ended', { streamId: stream.id });
            console.log(`[RTMP] Stream ${stream.id} has ENDED`);
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
🌐 HLS: http://localhost:8000/live/{streamKey}/index.m3u8
  `);
};

export const stopMediaServer = () => {
    if (nms) {
        nms.stop();
        nms = null;
    }
};

export const getMediaServer = () => nms;
