import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/support/tickets — create ticket
export const createTicket = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const { category, subject, message, priority } = req.body;
    if (!category || !subject || !message) return res.status(400).json({ error: 'category, subject, message required' });
    const count = await prisma.supportTicket.count();
    const reference = `SUP-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
    const ticket = await prisma.supportTicket.create({
      data: {
        userId, reference, category, subject, priority: priority || 'normal',
        messages: { create: { authorId: userId, content: message, isAdmin: false } },
      },
      include: { messages: true },
    });
    res.status(201).json(ticket);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/support/tickets — list user's tickets
export const listTickets = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const tickets = await prisma.supportTicket.findMany({
      where: { userId }, orderBy: { updatedAt: 'desc' },
      include: { _count: { select: { messages: true } } },
    });
    res.json(tickets);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/support/tickets/:id — ticket detail
export const getTicket = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: req.params.id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!ticket) return res.status(404).json({ error: 'Not found' });
    if (ticket.userId !== userId) return res.status(403).json({ error: 'Forbidden' });
    res.json(ticket);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// POST /api/support/tickets/:id/reply — reply to ticket
export const replyTicket = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const ticket = await prisma.supportTicket.findUnique({ where: { id: req.params.id } });
    if (!ticket) return res.status(404).json({ error: 'Not found' });
    if (ticket.userId !== userId) return res.status(403).json({ error: 'Forbidden' });
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content required' });
    const msg = await prisma.ticketMessage.create({
      data: { ticketId: ticket.id, authorId: userId, content, isAdmin: false },
    });
    await prisma.supportTicket.update({ where: { id: ticket.id }, data: { status: 'open' } });
    res.status(201).json(msg);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// GET /api/support/articles — mock knowledge base
export const listArticles = async (_req: Request, res: Response) => {
  res.json([
    { slug: 'como-criar-conta', title: 'Como criar conta no Kwanza Stream', category: 'conta', excerpt: 'Guia passo a passo para criar a tua conta.' },
    { slug: 'multicaixa-express', title: 'Como funciona o Multicaixa Express', category: 'pagamentos', excerpt: 'Compra Salos com referência Multicaixa.' },
    { slug: 'como-transmitir', title: 'Como transmitir no Kwanza Stream', category: 'streaming', excerpt: 'Configura o OBS e começa a transmitir.' },
    { slug: 'regras-chat', title: 'Regras do chat', category: 'chat', excerpt: 'Comportamento esperado no chat.' },
    { slug: 'programa-afiliado', title: 'Programa Afiliado', category: 'criadores', excerpt: 'Requisitos e benefícios do programa.' },
    { slug: 'resolucao-problemas-video', title: 'Problemas com o vídeo', category: 'tecnico', excerpt: 'Soluções para buffering e qualidade.' },
    { slug: 'salos-explicados', title: 'O que são Salos?', category: 'pagamentos', excerpt: 'A moeda virtual do Kwanza Stream.' },
    { slug: 'verificacao-kyc', title: 'Verificação KYC', category: 'conta', excerpt: 'Como verificar a tua identidade.' },
  ]);
};

// GET /api/support/articles/:slug
export const getArticle = async (req: Request, res: Response) => {
  const articles: Record<string, any> = {
    'como-criar-conta': { slug: 'como-criar-conta', title: 'Como criar conta no Kwanza Stream', category: 'conta', content: '## 1. Acede a kwanzastream.ao\n\nClica em \"Registar\" no canto superior direito.\n\n## 2. Preenche os dados\n\nNome, email, telefone (+244), password.\n\n## 3. Verifica o email\n\nConfirma o link no email.\n\n## 4. Pronto!\n\nJá podes ver streams e interagir.', helpful: 89, notHelpful: 3 },
    'multicaixa-express': { slug: 'multicaixa-express', title: 'Como funciona o Multicaixa Express', category: 'pagamentos', content: '## Gerar referência\n\nVai a /wallet e selecciona Multicaixa Express.\n\n## Pagar\n\nUsa o ATM, app do banco, ou USSD.\n\n## Confirmação\n\nOs Salos são creditados em 1-5 minutos.', helpful: 67, notHelpful: 5 },
  };
  const a = articles[req.params.slug];
  if (!a) return res.status(404).json({ error: 'Article not found' });
  res.json(a);
};

// POST /api/support/articles/:slug/rate
export const rateArticle = async (req: Request, res: Response) => {
  const { helpful } = req.body;
  res.json({ success: true, helpful });
};

// GET /api/system/status
export const systemStatus = async (_req: Request, res: Response) => {
  res.json({
    lastUpdated: new Date().toISOString(),
    services: [
      { name: 'Plataforma Web', status: 'operational', latency: '45ms' },
      { name: 'Streaming (RTMP)', status: 'operational', latency: '12ms' },
      { name: 'Pagamentos', status: 'operational', latency: '89ms' },
      { name: 'Chat / WebSocket', status: 'operational', latency: '8ms' },
      { name: 'CDN (Bunny.net)', status: 'operational', latency: '23ms' },
      { name: 'SMS OTP', status: 'operational', latency: '340ms' },
    ],
    incidents: [],
  });
};

// POST /api/contact
export const submitContact = async (req: Request, res: Response) => {
  const { name, email, subject, message, type } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email, message required' });
  // In production: send email, create CRM entry
  res.json({ success: true, message: 'Mensagem recebida. Respondemos em 24-48h.' });
};
