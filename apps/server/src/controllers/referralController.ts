import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function genRefCode(username: string): string {
  const base = (username || 'KS').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${base}${rand}`;
}

// GET /api/referral/my-link
export const getMyLink = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    let rc = await prisma.referralCode.findUnique({ where: { userId }, include: { _count: { select: { referrals: true } } } });
    if (!rc) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      rc = await prisma.referralCode.create({ data: { userId, code: genRefCode(user?.username || '') } }) as any;
    }
    const completed = await prisma.referral.count({ where: { referrerId: userId, status: 'completed' } });
    const totalSalos = completed * 200;
    res.json({ ...rc, completedReferrals: completed, totalSalos });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/referral/generate
export const generateNewLink = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    await prisma.referralCode.updateMany({ where: { userId }, data: { isActive: false } });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const rc = await prisma.referralCode.create({ data: { userId, code: genRefCode(user?.username || '') } });
    res.json(rc);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/referral/friends
export const getFriends = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const friends = await prisma.referral.findMany({
      where: { referrerId: userId },
      include: { referred: { select: { id: true, username: true, displayName: true, createdAt: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(friends);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/referral/rewards/history
export const getRewardsHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const rewards = await prisma.referral.findMany({
      where: { referrerId: userId, status: 'completed' },
      include: { referred: { select: { username: true } } },
      orderBy: { completedAt: 'desc' },
    });
    const totalSalos = rewards.reduce((s, r) => s + r.referrerSalos, 0);
    const bonuses = [];
    if (rewards.length >= 5) bonuses.push({ at: 5, salos: 500, label: 'Bónus 5 amigos' });
    if (rewards.length >= 10) bonuses.push({ at: 10, salos: 1500, label: 'Bónus 10 amigos' });
    if (rewards.length >= 25) bonuses.push({ at: 25, salos: 0, label: 'Badge Embaixador Comunitário' });
    res.json({ rewards, totalSalos, bonuses });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/referral/validate/:code (public)
export const validateCode = async (req: Request, res: Response) => {
  try {
    const rc = await prisma.referralCode.findUnique({
      where: { code: req.params.code.toUpperCase() },
      include: { user: { select: { username: true, displayName: true } } },
    });
    if (!rc || !rc.isActive) return res.status(404).json({ error: 'Invalid code' });
    await prisma.referralCode.update({ where: { id: rc.id }, data: { clicks: { increment: 1 } } });
    res.json({ valid: true, referrer: rc.user, code: rc.code });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/referral/register
export const registerReferral = async (req: Request, res: Response) => {
  try {
    const { referredUserId, code } = req.body;
    if (!referredUserId || !code) return res.status(400).json({ error: 'referredUserId, code required' });
    const rc = await prisma.referralCode.findUnique({ where: { code: code.toUpperCase() } });
    if (!rc || !rc.isActive) return res.status(404).json({ error: 'Invalid code' });
    if (rc.userId === referredUserId) return res.status(400).json({ error: 'Cannot refer yourself' });
    const existing = await prisma.referral.findUnique({ where: { referredId: referredUserId } });
    if (existing) return res.status(400).json({ error: 'Already referred' });
    const count = await prisma.referral.count({ where: { referrerId: rc.userId } });
    if (count >= 100) return res.status(400).json({ error: 'Max 100 referrals reached' });
    const ref = await prisma.referral.create({ data: { referrerId: rc.userId, referredId: referredUserId, codeId: rc.id } });
    res.json(ref);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};
