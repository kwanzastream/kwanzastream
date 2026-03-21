// ============================================================
// featuredController.ts — Dashboard Featured & Shelf Settings
// ============================================================

import { Request, Response } from 'express';
import prisma from '../../config/prisma';

/**
 * GET /api/creator/featured
 * Returns all featured settings for the authenticated creator
 */
export const getFeaturedSettings = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                featuredMode: true,
                featuredChannels: true,
                shelfType: true,
                shelfChannels: true,
                offlineBannerUrl: true,
                trailerUrl: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilizador não encontrado' });
        }

        // Resolve channel details for featured channels
        const channelIds = user.featuredChannels || [];
        const shelfIds = user.shelfChannels || [];
        const allIds = [...new Set([...channelIds, ...shelfIds])];

        const channels = allIds.length > 0
            ? await prisma.user.findMany({
                where: { id: { in: allIds } },
                select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true,
                    isLive: true,
                },
            })
            : [];

        const channelMap = new Map(channels.map(c => [c.id, c]));

        res.json({
            suggestedChannels: {
                mode: user.featuredMode || 'auto',
                channels: channelIds.map(id => channelMap.get(id)).filter(Boolean),
            },
            shelf: {
                type: user.shelfType || 'disabled',
                channels: shelfIds.map(id => channelMap.get(id)).filter(Boolean),
            },
            offlineBannerUrl: user.offlineBannerUrl || null,
            trailerUrl: user.trailerUrl || null,
        });
    } catch (error) {
        console.error('Get featured settings error:', error);
        res.status(500).json({ error: 'Erro ao carregar configurações' });
    }
};

/**
 * PATCH /api/creator/featured/suggested-channels
 * Update suggested channels mode and list
 */
export const updateSuggestedChannels = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { mode, channelIds } = req.body;

        if (mode && !['auto', 'manual'].includes(mode)) {
            return res.status(400).json({ error: 'Modo inválido. Usa "auto" ou "manual".' });
        }

        if (channelIds) {
            if (!Array.isArray(channelIds) || channelIds.length > 10) {
                return res.status(400).json({ error: 'Máximo 10 canais permitidos.' });
            }
            // Don't allow adding self
            if (channelIds.includes(userId)) {
                return res.status(400).json({ error: 'Não podes adicionar o teu próprio canal.' });
            }
        }

        const updateData: any = {};
        if (mode) updateData.featuredMode = mode;
        if (channelIds) updateData.featuredChannels = channelIds;

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: { featuredMode: true, featuredChannels: true },
        });

        res.json({
            success: true,
            suggestedChannels: { mode: user.featuredMode, channelIds: user.featuredChannels },
        });
    } catch (error) {
        console.error('Update suggested channels error:', error);
        res.status(500).json({ error: 'Erro ao actualizar canais sugeridos' });
    }
};

/**
 * PATCH /api/creator/featured/shelf
 * Update shelf type and channel list
 */
export const updateShelf = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { type, channelIds } = req.body;

        if (type && !['channels', 'team', 'disabled'].includes(type)) {
            return res.status(400).json({ error: 'Tipo inválido. Usa "channels", "team" ou "disabled".' });
        }

        if (channelIds) {
            if (!Array.isArray(channelIds) || channelIds.length > 6) {
                return res.status(400).json({ error: 'Máximo 6 canais na shelf.' });
            }
        }

        const updateData: any = {};
        if (type) updateData.shelfType = type;
        if (channelIds) updateData.shelfChannels = channelIds;

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: { shelfType: true, shelfChannels: true },
        });

        res.json({
            success: true,
            shelf: { type: user.shelfType, channelIds: user.shelfChannels },
        });
    } catch (error) {
        console.error('Update shelf error:', error);
        res.status(500).json({ error: 'Erro ao actualizar shelf' });
    }
};

/**
 * PATCH /api/creator/featured/banner
 * Update offline banner URL
 */
export const updateBanner = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { bannerUrl } = req.body;

        await prisma.user.update({
            where: { id: userId },
            data: { offlineBannerUrl: bannerUrl || null },
        });

        res.json({ success: true, offlineBannerUrl: bannerUrl || null });
    } catch (error) {
        console.error('Update banner error:', error);
        res.status(500).json({ error: 'Erro ao actualizar banner' });
    }
};

/**
 * PATCH /api/creator/featured/trailer
 * Update trailer URL
 */
export const updateTrailer = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { trailerUrl } = req.body;

        await prisma.user.update({
            where: { id: userId },
            data: { trailerUrl: trailerUrl || null },
        });

        res.json({ success: true, trailerUrl: trailerUrl || null });
    } catch (error) {
        console.error('Update trailer error:', error);
        res.status(500).json({ error: 'Erro ao actualizar trailer' });
    }
};
