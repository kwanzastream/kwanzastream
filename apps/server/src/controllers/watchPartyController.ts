import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function genCode(): string { return Math.random().toString(36).substring(2, 8).toUpperCase(); }

// POST /api/watch-parties — create
export const createParty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { streamId, name, isPublic, maxParticipants } = req.body;
    const party = await prisma.watchParty.create({
      data: { code: genCode(), hostId: userId, streamId, name, isPublic: isPublic || false, maxParticipants: Math.min(Math.max(maxParticipants || 10, 2), 50),
        participants: { create: { userId, isOnline: true } }
      }
    });
    res.json(party);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/watch-parties — user's active parties
export const getMyParties = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const parties = await prisma.watchParty.findMany({
      where: { OR: [{ hostId: userId }, { participants: { some: { userId } } }], status: 'active' },
      include: { _count: { select: { participants: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(parties);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/watch-parties/history — past parties
export const getPartyHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const parties = await prisma.watchParty.findMany({
      where: { OR: [{ hostId: userId }, { participants: { some: { userId } } }], status: 'ended' },
      include: { _count: { select: { participants: true } } },
      orderBy: { endedAt: 'desc' },
      take: 20,
    });
    res.json(parties);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/watch-parties/:id — detail
export const getParty = async (req: Request, res: Response) => {
  try {
    const party = await prisma.watchParty.findUnique({
      where: { id: req.params.id },
      include: { participants: { include: { user: { select: { id: true, username: true, displayName: true } } } }, host: { select: { id: true, username: true, displayName: true } } },
    });
    if (!party) return res.status(404).json({ error: 'Not found' });
    res.json(party);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/watch-parties/:id — end party (host only)
export const endParty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const party = await prisma.watchParty.findUnique({ where: { id: req.params.id } });
    if (!party || party.hostId !== userId) return res.status(403).json({ error: 'Host only' });
    await prisma.watchParty.update({ where: { id: req.params.id }, data: { status: 'ended', endedAt: new Date() } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/watch-parties/:id/join — join
export const joinParty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const party = await prisma.watchParty.findUnique({ where: { id: req.params.id }, include: { _count: { select: { participants: true } } } });
    if (!party || party.status !== 'active') return res.status(404).json({ error: 'Party not found or ended' });
    if (party._count.participants >= party.maxParticipants) return res.status(400).json({ error: 'Party cheia' });
    const p = await prisma.watchPartyParticipant.upsert({
      where: { partyId_userId: { partyId: req.params.id, userId } },
      update: { isOnline: true, leftAt: null },
      create: { partyId: req.params.id, userId },
    });
    res.json(p);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/watch-parties/:id/leave — leave
export const leaveParty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.watchPartyParticipant.updateMany({ where: { partyId: req.params.id, userId }, data: { isOnline: false, leftAt: new Date() } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/watch-parties/:id/participants
export const getParticipants = async (req: Request, res: Response) => {
  try {
    const participants = await prisma.watchPartyParticipant.findMany({
      where: { partyId: req.params.id },
      include: { user: { select: { id: true, username: true, displayName: true } } },
      orderBy: { joinedAt: 'asc' },
    });
    res.json(participants);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// DELETE /api/watch-parties/:id/participants/:userId — remove (host only)
export const removeParticipant = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const party = await prisma.watchParty.findUnique({ where: { id: req.params.id } });
    if (!party || party.hostId !== userId) return res.status(403).json({ error: 'Host only' });
    await prisma.watchPartyParticipant.deleteMany({ where: { partyId: req.params.id, userId: req.params.userId } });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/watch-parties/:id/invite
export const inviteToParty = async (req: Request, res: Response) => {
  try {
    // In production, send notification to user
    res.json({ success: true, message: 'Convite enviado' });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/watch-parties/join/:code — join by short code
export const joinByCode = async (req: Request, res: Response) => {
  try {
    const party = await prisma.watchParty.findUnique({ where: { code: req.params.code.toUpperCase() } });
    if (!party || party.status !== 'active') return res.status(404).json({ error: 'Party não encontrada ou já terminou' });
    res.json(party);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};
