// ============================================================
// tournamentController.ts — Creator Tournament Management
// ============================================================

import { Request, Response } from 'express';
import prisma from '../../config/prisma';

// Mock tournament data for dashboard
const MOCK_TOURNAMENTS = [
    {
        id: 'tourn-1',
        title: 'Angola Gaming Cup 2026',
        game: 'CS2',
        bannerUrl: null,
        status: 'ACTIVE',
        format: 'individual',
        currentPhase: 'Quartos-de-final',
        prize: '50.000 Kz',
        participantCount: 16,
        maxParticipants: 32,
        viewerCount: 890,
        startDate: '2026-03-20T18:00:00Z',
        organizer: { username: 'kwanzastream', displayName: 'Kwanza Stream' },
    },
    {
        id: 'tourn-2',
        title: 'Girabola Gaming League',
        game: 'FIFA 26',
        bannerUrl: null,
        status: 'REGISTERING',
        format: 'individual',
        currentPhase: null,
        prize: '30.000 Kz',
        participantCount: 8,
        maxParticipants: 16,
        viewerCount: 0,
        startDate: '2026-03-28T18:00:00Z',
        organizer: { username: 'girabola', displayName: 'Girabola Esports' },
    },
    {
        id: 'tourn-3',
        title: 'Kuduro Battle 2026',
        game: 'Just Dance',
        bannerUrl: null,
        status: 'COMPLETED',
        format: 'individual',
        currentPhase: null,
        prize: '20.000 Kz',
        participantCount: 32,
        maxParticipants: 32,
        viewerCount: 0,
        startDate: '2026-03-01T18:00:00Z',
        winner: { username: 'dancequeen', displayName: 'Dance Queen AO' },
        organizer: { username: 'kwanzastream', displayName: 'Kwanza Stream' },
    },
];

const MOCK_PARTICIPANTS = [
    { id: 'p1', username: 'player1', displayName: 'Player One', avatarUrl: null, seed: 1, status: 'confirmed' },
    { id: 'p2', username: 'player2', displayName: 'Player Two', avatarUrl: null, seed: 2, status: 'confirmed' },
    { id: 'p3', username: 'player3', displayName: 'Player Three', avatarUrl: null, seed: 3, status: 'confirmed' },
    { id: 'p4', username: 'player4', displayName: 'Player Four', avatarUrl: null, seed: null, status: 'pending' },
    { id: 'p5', username: 'player5', displayName: 'Player Five', avatarUrl: null, seed: null, status: 'pending' },
];

const MOCK_MATCHES = [
    { id: 'm1', round: 1, matchNumber: 1, player1: MOCK_PARTICIPANTS[0], player2: MOCK_PARTICIPANTS[1], score1: 3, score2: 1, winnerId: 'p1' },
    { id: 'm2', round: 1, matchNumber: 2, player1: MOCK_PARTICIPANTS[2], player2: MOCK_PARTICIPANTS[3], score1: null, score2: null, winnerId: null },
    { id: 'm3', round: 2, matchNumber: 1, player1: null, player2: null, score1: null, score2: null, winnerId: null },
];

/**
 * GET /api/creator/tournaments
 */
export const getCreatorTournaments = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        res.json({
            organized: MOCK_TOURNAMENTS.filter(t => t.organizer.username === 'kwanzastream'),
            participating: MOCK_TOURNAMENTS,
            inscriptions: MOCK_TOURNAMENTS.slice(0, 2).map(t => ({
                ...t,
                inscriptionId: `insc-${t.id}`,
                inscriptionDate: '2026-03-15T10:00:00Z',
                inscriptionStatus: 'confirmed',
                type: 'individual',
                result: t.status === 'COMPLETED' ? { position: 2, prize: '20.000 Kz' } : null,
            })),
            stats: {
                active: 1,
                upcoming: 1,
                organized: 2,
            },
        });
    } catch (error) {
        console.error('Get creator tournaments error:', error);
        res.status(500).json({ error: 'Erro ao carregar torneios' });
    }
};

/**
 * GET /api/creator/tournaments/:id
 */
export const getCreatorTournament = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tournament = MOCK_TOURNAMENTS.find(t => t.id === id) || MOCK_TOURNAMENTS[0];

        res.json({
            ...tournament,
            participants: MOCK_PARTICIPANTS,
            matches: MOCK_MATCHES,
            streams: 4,
            combinedViewers: 890,
        });
    } catch (error) {
        console.error('Get creator tournament error:', error);
        res.status(500).json({ error: 'Erro ao carregar torneio' });
    }
};

/**
 * PATCH /api/creator/tournaments/:id/participants/:userId
 */
export const updateParticipant = async (req: Request, res: Response) => {
    try {
        const { action, seed } = req.body;
        res.json({ success: true, action });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao actualizar participante' });
    }
};

/**
 * PATCH /api/creator/tournaments/:id/matches/:matchId
 */
export const updateMatchResult = async (req: Request, res: Response) => {
    try {
        const { winnerId, score1, score2 } = req.body;
        res.json({ success: true, winnerId, score1, score2 });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao guardar resultado' });
    }
};

/**
 * GET /api/creator/tournaments/:id/inscriptions
 */
export const getInscriptionDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tournament = MOCK_TOURNAMENTS.find(t => `insc-${t.id}` === id || t.id === id) || MOCK_TOURNAMENTS[0];

        res.json({
            id: `insc-${tournament.id}`,
            tournament,
            type: 'individual',
            status: 'confirmed',
            inscriptionDate: '2026-03-15T10:00:00Z',
            fee: 'Gratuito',
            format: 'Single elimination',
            streamRequired: true,
            nextMatch: {
                opponent: { username: 'adversario', displayName: 'Adversário' },
                date: '2026-03-25T20:00:00Z',
            },
            canWithdraw: true,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar inscrição' });
    }
};
