import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/saved/:type
export const getSavedItems = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const items = await prisma.savedItem.findMany({ where: { userId, contentType: req.params.type }, orderBy: { savedAt: 'desc' }, take: 50 });
    res.json(items);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/saved
export const saveItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { contentId, contentType } = req.body;
    if (!contentId || !contentType) return res.status(400).json({ error: 'contentId, contentType required' });
    const item = await prisma.savedItem.upsert({ where: { userId_contentId_contentType: { userId, contentId, contentType } }, update: { savedAt: new Date() }, create: { userId, contentId, contentType } });
    res.json(item);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/saved/:id
export const removeSavedItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.savedItem.deleteMany({ where: { id: req.params.id, userId } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/saved/type/:type
export const clearSavedByType = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.savedItem.deleteMany({ where: { userId, contentType: req.params.type } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/collections
export const getCollections = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const cols = await prisma.collection.findMany({ where: { userId }, include: { _count: { select: { items: true } } }, orderBy: { updatedAt: 'desc' } });
    res.json(cols);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/collections
export const createCollection = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { name, description, isPublic } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    const col = await prisma.collection.create({ data: { userId, name, description, isPublic: isPublic || false } });
    res.json(col);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/collections/:id
export const getCollection = async (req: Request, res: Response) => {
  try {
    const col = await prisma.collection.findUnique({ where: { id: req.params.id }, include: { items: { include: { savedItem: true }, orderBy: { addedAt: 'desc' } } } });
    if (!col) return res.status(404).json({ error: 'Not found' });
    res.json(col);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// PATCH /api/collections/:id
export const updateCollection = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { name, description, isPublic } = req.body;
    const col = await prisma.collection.updateMany({ where: { id: req.params.id, userId }, data: { ...(name && { name }), ...(description !== undefined && { description }), ...(isPublic !== undefined && { isPublic }) } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/collections/:id
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.collection.deleteMany({ where: { id: req.params.id, userId } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/collections/:id/items
export const addToCollection = async (req: Request, res: Response) => {
  try {
    const { savedItemId } = req.body;
    if (!savedItemId) return res.status(400).json({ error: 'savedItemId required' });
    const item = await prisma.collectionItem.create({ data: { collectionId: req.params.id, savedItemId } });
    res.json(item);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/collections/:id/items/:itemId
export const removeFromCollection = async (req: Request, res: Response) => {
  try {
    await prisma.collectionItem.deleteMany({ where: { id: req.params.itemId, collectionId: req.params.id } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/favorites/:type
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const favs = await prisma.favoriteItem.findMany({ where: { userId, targetType: req.params.type }, orderBy: { addedAt: 'desc' } });
    res.json(favs);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/favorites
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { targetId, targetType } = req.body;
    if (!targetId || !targetType) return res.status(400).json({ error: 'targetId, targetType required' });
    if (targetType === 'channel') {
      const count = await prisma.favoriteItem.count({ where: { userId, targetType: 'channel' } });
      if (count >= 20) return res.status(400).json({ error: 'Máximo 20 canais favoritos' });
    }
    const fav = await prisma.favoriteItem.upsert({ where: { userId_targetId_targetType: { userId, targetId, targetType } }, update: {}, create: { userId, targetId, targetType } });
    res.json(fav);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/favorites/:id
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.favoriteItem.deleteMany({ where: { id: req.params.id, userId } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};
