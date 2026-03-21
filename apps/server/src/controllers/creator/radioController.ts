// ============================================================
// radioController.ts — Creator Radio Dashboard Management
// ============================================================

import { Request, Response } from 'express';
import prisma from '../../config/prisma';
import crypto from 'crypto';

const DAYS_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

/**
 * GET /api/creator/radio
 * Returns radio config + weekly stats
 */
export const getRadioOverview = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        let config = await prisma.radioConfig.findUnique({ where: { userId } });
        const schedule = await prisma.radioSchedule.findMany({
            where: { userId },
            orderBy: [{ dayOfWeek: 'asc' }, { startHour: 'asc' }],
        });

        // Mock weekly stats
        const stats = {
            transmissions: 3,
            totalMinutes: 270,
            uniqueListeners: 567,
            salosReceived: 1200,
        };

        res.json({
            config: config || null,
            schedule,
            stats,
            isNew: !config,
        });
    } catch (error) {
        console.error('Get radio overview error:', error);
        res.status(500).json({ error: 'Erro ao carregar rádio' });
    }
};

/**
 * PATCH /api/creator/radio/config
 * Update radio configuration
 */
export const updateRadioConfig = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { programName, description, primaryGenre, extraGenres, quality } = req.body;

        if (quality && ![64, 128, 320].includes(quality)) {
            return res.status(400).json({ error: 'Qualidade inválida. Usa 64, 128 ou 320.' });
        }

        if (extraGenres && extraGenres.length > 3) {
            return res.status(400).json({ error: 'Máximo 3 géneros adicionais.' });
        }

        const config = await prisma.radioConfig.upsert({
            where: { userId },
            create: {
                userId,
                programName,
                description,
                primaryGenre,
                extraGenres: extraGenres || [],
                quality: quality || 128,
                isEnabled: true,
            },
            update: {
                ...(programName !== undefined && { programName }),
                ...(description !== undefined && { description }),
                ...(primaryGenre !== undefined && { primaryGenre }),
                ...(extraGenres !== undefined && { extraGenres }),
                ...(quality !== undefined && { quality }),
                isEnabled: true,
            },
        });

        res.json({ success: true, config });
    } catch (error) {
        console.error('Update radio config error:', error);
        res.status(500).json({ error: 'Erro ao guardar configuração' });
    }
};

/**
 * PATCH /api/creator/radio/artwork
 */
export const updateRadioArtwork = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { artworkUrl } = req.body;

        const config = await prisma.radioConfig.upsert({
            where: { userId },
            create: { userId, artworkUrl },
            update: { artworkUrl },
        });

        res.json({ success: true, artworkUrl: config.artworkUrl });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao guardar artwork' });
    }
};

/**
 * POST /api/creator/radio/schedule
 */
export const addScheduleSlot = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { dayOfWeek, startHour, durationMin, notifyFollowers } = req.body;

        if (dayOfWeek < 0 || dayOfWeek > 6) {
            return res.status(400).json({ error: 'Dia inválido (0-6).' });
        }
        if (startHour < 0 || startHour > 23) {
            return res.status(400).json({ error: 'Hora inválida (0-23).' });
        }

        const slot = await prisma.radioSchedule.create({
            data: {
                userId,
                dayOfWeek,
                startHour,
                durationMin: durationMin || 120,
                notifyFollowers: notifyFollowers !== false,
            },
        });

        res.json({ success: true, slot });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao agendar' });
    }
};

/**
 * DELETE /api/creator/radio/schedule/:id
 */
export const removeScheduleSlot = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        await prisma.radioSchedule.deleteMany({
            where: { id, userId },
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover slot' });
    }
};

/**
 * GET /api/creator/radio/analytics
 */
export const getRadioAnalytics = async (req: Request, res: Response) => {
    try {
        // Mock analytics
        res.json({
            period: '30d',
            uniqueListeners: 567,
            totalHours: 18,
            peakListeners: 234,
            peakTime: 'Sábado 21h',
            salosReceived: 1200,
            genreBreakdown: [
                { genre: 'Kuduro', percentage: 78 },
                { genre: 'Afrohouse', percentage: 15 },
                { genre: 'Kizomba', percentage: 7 },
            ],
            deviceBreakdown: [
                { device: 'Mobile', percentage: 89 },
                { device: 'Desktop', percentage: 11 },
            ],
            bestTimes: 'Sextas e Sábados entre 20h–23h WAT',
            dailyListeners: [
                { day: 'Seg', count: 45 }, { day: 'Ter', count: 38 },
                { day: 'Qua', count: 89 }, { day: 'Qui', count: 42 },
                { day: 'Sex', count: 156 }, { day: 'Sáb', count: 234 },
                { day: 'Dom', count: 167 },
            ],
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar analytics' });
    }
};

/**
 * GET /api/creator/radio/stream-key
 */
export const getRadioStreamKey = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        let config = await prisma.radioConfig.findUnique({
            where: { userId },
            select: { streamKey: true },
        });

        if (!config) {
            config = await prisma.radioConfig.create({
                data: { userId },
                select: { streamKey: true },
            });
        }

        res.json({
            streamKey: config.streamKey,
            rtmpUrl: 'rtmp://live.kwanzastream.ao/radio',
            recommended: {
                bitrate: '128 kbps',
                sampleRate: '44.1 kHz',
                codec: 'AAC',
                channels: 'Stereo',
            },
        });
    } catch (error) {
        console.error('Get radio stream key error:', error);
        // Fallback: return mock data if DB fails
        const fallbackKey = crypto.randomBytes(16).toString('hex');
        res.json({
            streamKey: fallbackKey,
            rtmpUrl: 'rtmp://live.kwanzastream.ao/radio',
            recommended: {
                bitrate: '128 kbps',
                sampleRate: '44.1 kHz',
                codec: 'AAC',
                channels: 'Stereo',
            },
        });
    }
};

/**
 * POST /api/creator/radio/stream-key/rotate
 */
export const rotateRadioStreamKey = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const newKey = crypto.randomBytes(16).toString('hex');

        const config = await prisma.radioConfig.upsert({
            where: { userId },
            create: { userId, streamKey: newKey },
            update: { streamKey: newKey },
        });

        res.json({ success: true, streamKey: config.streamKey });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao rotacionar key' });
    }
};
