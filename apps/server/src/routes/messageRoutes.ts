import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const router = Router()
const prisma = new PrismaClient()

// Auth middleware helper
const getUser = (req: Request) => (req as any).userId as string | undefined

// GET /api/messages — List conversations
router.get('/', async (req: Request, res: Response) => {
    try {
        const userId = getUser(req)
        if (!userId) return res.status(401).json({ error: 'Não autenticado' })

        const conversations = await prisma.conversation.findMany({
            where: {
                OR: [{ participantA: userId }, { participantB: userId }],
            },
            include: {
                userA: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                userB: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    select: { content: true, createdAt: true, senderId: true, read: true },
                },
            },
            orderBy: { lastMessageAt: 'desc' },
        })

        // Calculate unread count per conversation
        const withUnread = await Promise.all(
            conversations.map(async (conv) => {
                const unreadCount = await prisma.directMessage.count({
                    where: {
                        conversationId: conv.id,
                        senderId: { not: userId },
                        read: false,
                    },
                })
                const otherUser = conv.participantA === userId ? conv.userB : conv.userA
                const lastMessage = conv.messages[0] || null
                return {
                    id: conv.id,
                    otherUser,
                    lastMessage,
                    unreadCount,
                    lastMessageAt: conv.lastMessageAt,
                }
            })
        )

        res.json({ conversations: withUnread })
    } catch (error) {
        console.error('List conversations error:', error)
        res.status(500).json({ error: 'Erro ao carregar conversas' })
    }
})

// GET /api/messages/:conversationId — Get messages
router.get('/:conversationId', async (req: Request, res: Response) => {
    try {
        const userId = getUser(req)
        if (!userId) return res.status(401).json({ error: 'Não autenticado' })

        const { conversationId } = req.params
        const page = parseInt(req.query.page as string) || 1
        const limit = 50

        // Verify user is participant
        const conv = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                OR: [{ participantA: userId }, { participantB: userId }],
            },
            include: {
                userA: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                userB: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
            },
        })

        if (!conv) return res.status(404).json({ error: 'Conversa não encontrada' })

        const messages = await prisma.directMessage.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                sender: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
            },
        })

        // Mark unread messages as read
        await prisma.directMessage.updateMany({
            where: {
                conversationId,
                senderId: { not: userId },
                read: false,
            },
            data: { read: true },
        })

        const otherUser = conv.participantA === userId ? conv.userB : conv.userA

        res.json({
            conversationId,
            otherUser,
            messages: messages.reverse(), // oldest first
            page,
            hasMore: messages.length === limit,
        })
    } catch (error) {
        console.error('Get messages error:', error)
        res.status(500).json({ error: 'Erro ao carregar mensagens' })
    }
})

// POST /api/messages/send — Send message
router.post('/send', async (req: Request, res: Response) => {
    try {
        const userId = getUser(req)
        if (!userId) return res.status(401).json({ error: 'Não autenticado' })

        const { recipientId, content } = req.body
        if (!recipientId || !content?.trim()) {
            return res.status(400).json({ error: 'recipientId e content são obrigatórios' })
        }

        if (recipientId === userId) {
            return res.status(400).json({ error: 'Não podes enviar mensagem a ti próprio' })
        }

        // Find or create conversation (normalize order to avoid duplicates)
        const [a, b] = [userId, recipientId].sort()

        let conversation = await prisma.conversation.findUnique({
            where: { participantA_participantB: { participantA: a, participantB: b } },
        })

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: { participantA: a, participantB: b },
            })
        }

        // Create message and update conversation timestamp
        const [message] = await prisma.$transaction([
            prisma.directMessage.create({
                data: {
                    content: content.trim().slice(0, 1000),
                    senderId: userId,
                    conversationId: conversation.id,
                },
                include: {
                    sender: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                },
            }),
            prisma.conversation.update({
                where: { id: conversation.id },
                data: { lastMessageAt: new Date() },
            }),
        ])

        res.json({
            conversationId: conversation.id,
            message,
        })
    } catch (error) {
        console.error('Send message error:', error)
        res.status(500).json({ error: 'Erro ao enviar mensagem' })
    }
})

// GET /api/messages/unread/count — Total unread DMs
router.get('/unread/count', async (req: Request, res: Response) => {
    try {
        const userId = getUser(req)
        if (!userId) return res.status(401).json({ error: 'Não autenticado' })

        const conversations = await prisma.conversation.findMany({
            where: { OR: [{ participantA: userId }, { participantB: userId }] },
            select: { id: true },
        })

        const count = await prisma.directMessage.count({
            where: {
                conversationId: { in: conversations.map(c => c.id) },
                senderId: { not: userId },
                read: false,
            },
        })

        res.json({ unreadCount: count })
    } catch (error) {
        res.status(500).json({ error: 'Erro' })
    }
})

export default router
