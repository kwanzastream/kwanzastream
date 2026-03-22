import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/history/streams — watched streams/VODs
export const getStreamHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const type = (req.query.type as string) || undefined;
    const history = await prisma.viewHistory.findMany({
      where: { userId, ...(type ? { contentType: type } : {}) },
      orderBy: { watchedAt: 'desc' },
      take: 50,
    });
    res.json(history);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/history/streams — record view
export const recordView = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { contentId, contentType, watchedSecs, progress } = req.body;
    if (!contentId || !contentType) return res.status(400).json({ error: 'contentId, contentType required' });
    const entry = await prisma.viewHistory.upsert({
      where: { userId_contentId: { userId, contentId } },
      update: { watchedAt: new Date(), watchedSecs: watchedSecs || 0, progress: progress || 0 },
      create: { userId, contentId, contentType, watchedSecs: watchedSecs || 0, progress: progress || 0 },
    });
    res.json(entry);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/history/streams/:id
export const deleteViewItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.viewHistory.deleteMany({ where: { id: req.params.id, userId } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/history/searches
export const getSearchHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const history = await prisma.searchHistory.findMany({
      where: { userId }, orderBy: { searchedAt: 'desc' }, take: 100,
    });
    res.json(history);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/history/searches
export const clearSearchHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.searchHistory.deleteMany({ where: { userId } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/history/channels
export const getChannelVisits = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const visits = await prisma.channelVisitHistory.findMany({
      where: { userId }, orderBy: { visitedAt: 'desc' }, take: 50,
    });
    res.json(visits);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/history/channels
export const recordChannelVisit = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { channelId } = req.body;
    if (!channelId) return res.status(400).json({ error: 'channelId required' });
    const visit = await prisma.channelVisitHistory.upsert({
      where: { userId_channelId: { userId, channelId } },
      update: { visitedAt: new Date() },
      create: { userId, channelId },
    });
    res.json(visit);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/history/all
export const clearAllHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await Promise.all([
      prisma.viewHistory.deleteMany({ where: { userId } }),
      prisma.searchHistory.deleteMany({ where: { userId } }),
      prisma.channelVisitHistory.deleteMany({ where: { userId } }),
    ]);
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/history/streams/all
export const clearStreamHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.viewHistory.deleteMany({ where: { userId } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};
