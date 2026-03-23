import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const changelog = [
  { version: '1.0.0', date: '1 Maio 2026', title: 'Lançamento', features: ['Streaming ao vivo (720p)', 'Chat em tempo real', 'Salos e subscrições', 'Modo Rádio', 'Go-live pelo telemóvel', 'PWA Android e iOS'] },
];

// GET /api/app/version
export const getVersion = async (_req: Request, res: Response) => {
  res.json({ version: '1.0.0', minVersion: '1.0.0', updateUrl: '/app', forceUpdate: false });
};

// GET /api/app/download-url
export const getDownloadUrl = async (_req: Request, res: Response) => {
  res.json({ apk: 'https://cdn.kwanzastream.ao/releases/kwanzastream-v1.0.0.apk', pwa: 'https://kwanzastream.ao', playStore: null, appStore: null });
};

// POST /api/app/notify-ios
export const notifyIos = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    await prisma.iosWaitlist.upsert({ where: { email }, update: {}, create: { email } });
    res.json({ success: true, message: 'Vamos avisar-te quando a app iOS estiver disponível!' });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/app/changelog
export const getChangelog = async (_req: Request, res: Response) => {
  res.json(changelog);
};

// GET /api/app/changelog/:v
export const getVersionNotes = async (req: Request, res: Response) => {
  const v = changelog.find(c => c.version === req.params.v);
  if (!v) return res.status(404).json({ error: 'Version not found' });
  res.json(v);
};
