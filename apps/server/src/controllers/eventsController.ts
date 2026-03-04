// ============================================================
// eventsController.ts — Events System API
// P2: Scheduled events with RSVP, CRUD, and listing
// ============================================================

import { Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// ============== Validation ==============

const createEventSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(1000).optional(),
    coverUrl: z.string().url().optional(),
    category: z.string().max(50).optional(),
    scheduledAt: z.string().datetime(),
    endsAt: z.string().datetime().optional(),
});

const updateEventSchema = createEventSchema.partial();

// ============== CRUD ==============

/** POST /api/events — Create event */
export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const data = createEventSchema.parse(req.body);

        const event = await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                coverUrl: data.coverUrl,
                category: data.category,
                scheduledAt: new Date(data.scheduledAt),
                endsAt: data.endsAt ? new Date(data.endsAt) : undefined,
                organizerId: userId,
            },
            include: {
                organizer: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
            },
        });

        res.status(201).json({ event });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation failed', details: error.errors });
        }
        console.error('Create event error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/** GET /api/events — List upcoming events */
export const listEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
        const { category, status } = req.query;

        const where: any = {};

        if (category) where.category = category;
        if (status) {
            where.status = status;
        } else {
            // Default: show upcoming and live events
            where.status = { in: ['SCHEDULED', 'LIVE'] };
        }

        const [events, total] = await Promise.all([
            prisma.event.findMany({
                where,
                orderBy: { scheduledAt: 'asc' },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    organizer: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                    _count: { select: { rsvps: true } },
                },
            }),
            prisma.event.count({ where }),
        ]);

        // Check if requesting user has RSVP'd
        const userId = req.user?.userId;
        let userRsvps = new Set<string>();
        if (userId && events.length > 0) {
            const rsvps = await prisma.eventRSVP.findMany({
                where: { userId, eventId: { in: events.map(e => e.id) } },
                select: { eventId: true },
            });
            userRsvps = new Set(rsvps.map(r => r.eventId));
        }

        res.json({
            events: events.map(e => ({
                id: e.id,
                title: e.title,
                description: e.description,
                coverUrl: e.coverUrl,
                category: e.category,
                scheduledAt: e.scheduledAt.toISOString(),
                endsAt: e.endsAt?.toISOString(),
                status: e.status,
                rsvpCount: e._count.rsvps,
                organizer: e.organizer,
                hasRsvp: userRsvps.has(e.id),
            })),
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('List events error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/** GET /api/events/:id — Get event detail */
export const getEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const event = await prisma.event.findUnique({
            where: { id: req.params.id },
            include: {
                organizer: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                _count: { select: { rsvps: true } },
                rsvps: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
                    },
                },
            },
        });

        if (!event) return res.status(404).json({ error: 'Event not found' });

        // Check if current user has RSVP'd
        const userId = req.user?.userId;
        let hasRsvp = false;
        if (userId) {
            const rsvp = await prisma.eventRSVP.findUnique({
                where: { userId_eventId: { userId, eventId: event.id } },
            });
            hasRsvp = !!rsvp;
        }

        res.json({
            event: {
                ...event,
                scheduledAt: event.scheduledAt.toISOString(),
                endsAt: event.endsAt?.toISOString(),
                rsvpCount: event._count.rsvps,
                hasRsvp,
                recentRsvps: event.rsvps.map(r => r.user),
            },
        });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/** PUT /api/events/:id — Update event (organizer only) */
export const updateEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const existing = await prisma.event.findUnique({ where: { id: req.params.id }, select: { organizerId: true } });
        if (!existing) return res.status(404).json({ error: 'Event not found' });
        if (existing.organizerId !== userId) return res.status(403).json({ error: 'Not the organizer' });

        const data = updateEventSchema.parse(req.body);

        const event = await prisma.event.update({
            where: { id: req.params.id },
            data: {
                ...data,
                scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
                endsAt: data.endsAt ? new Date(data.endsAt) : undefined,
            },
        });

        res.json({ event });
    } catch (error) {
        if (error instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: error.errors });
        console.error('Update event error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/** DELETE /api/events/:id — Cancel event (organizer only) */
export const cancelEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const existing = await prisma.event.findUnique({ where: { id: req.params.id }, select: { organizerId: true } });
        if (!existing) return res.status(404).json({ error: 'Event not found' });
        if (existing.organizerId !== userId) return res.status(403).json({ error: 'Not the organizer' });

        await prisma.event.update({
            where: { id: req.params.id },
            data: { status: 'CANCELLED' },
        });

        res.json({ message: 'Event cancelled' });
    } catch (error) {
        console.error('Cancel event error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============== RSVP ==============

/** POST /api/events/:id/rsvp — Toggle RSVP */
export const toggleRsvp = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const eventId = req.params.id;
        const event = await prisma.event.findUnique({ where: { id: eventId }, select: { status: true } });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        if (event.status === 'ENDED' || event.status === 'CANCELLED') {
            return res.status(400).json({ error: 'Event is no longer active' });
        }

        // Check existing RSVP
        const existing = await prisma.eventRSVP.findUnique({
            where: { userId_eventId: { userId, eventId } },
        });

        if (existing) {
            // Remove RSVP
            await prisma.$transaction([
                prisma.eventRSVP.delete({ where: { id: existing.id } }),
                prisma.event.update({ where: { id: eventId }, data: { rsvpCount: { decrement: 1 } } }),
            ]);
            res.json({ rsvp: false, message: 'RSVP removed' });
        } else {
            // Add RSVP
            await prisma.$transaction([
                prisma.eventRSVP.create({ data: { userId, eventId } }),
                prisma.event.update({ where: { id: eventId }, data: { rsvpCount: { increment: 1 } } }),
            ]);
            res.json({ rsvp: true, message: 'RSVP confirmed' });
        }
    } catch (error) {
        console.error('Toggle RSVP error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/** GET /api/events/my — Get user's events (organized) */
export const getMyEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Authentication required' });

        const events = await prisma.event.findMany({
            where: { organizerId: userId },
            orderBy: { scheduledAt: 'desc' },
            include: { _count: { select: { rsvps: true } } },
        });

        res.json({ events: events.map(e => ({ ...e, rsvpCount: e._count.rsvps })) });
    } catch (error) {
        console.error('My events error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
