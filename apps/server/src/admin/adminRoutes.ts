import { Router, Request, Response } from 'express';
import {
    getDashboardStats,
    listUsers,
    updateUser,
    banUser,
    listStreams,
    forceEndStream,
    listTransactions,
    approveWithdrawal,
    rejectWithdrawal,
} from './adminController';
import { authMiddleware, requireRole } from '../middleware/authMiddleware';
import { requirePermission } from '../middleware/rbacMiddleware';
import { reconcileAllAccounts, getAccountLedger } from '../services/ledgerService';
import prisma from '../config/prisma';

const router = Router();

// All admin routes require authentication and ADMIN role
router.use(authMiddleware);
router.use(requireRole('ADMIN'));

// Dashboard — all admin roles
router.get('/stats', requirePermission('admin.dashboard'), getDashboardStats);

// User management — requires specific permissions
router.get('/users', requirePermission('admin.users.list'), listUsers);
router.put('/users/:id', requirePermission('admin.users.update'), updateUser);
router.post('/users/:id/ban', requirePermission('admin.users.ban'), banUser);

// Stream management — CONTENT_MODERATOR or SUPER_ADMIN
router.get('/streams', requirePermission('admin.streams.list'), listStreams);
router.post('/streams/:id/end', requirePermission('admin.streams.end'), forceEndStream);

// Transaction management — FINANCIAL_ADMIN or SUPER_ADMIN
router.get('/transactions', requirePermission('admin.transactions.list'), listTransactions);
router.post('/transactions/:id/approve', requirePermission('admin.transactions.approve'), approveWithdrawal);
router.post('/transactions/:id/reject', requirePermission('admin.transactions.reject'), rejectWithdrawal);

// P0: Ledger reconciliation — FINANCIAL_ADMIN or SUPER_ADMIN
router.get('/ledger/reconcile', requirePermission('admin.ledger.reconcile'), async (_req: Request, res: Response) => {
    try {
        const result = await reconcileAllAccounts();
        // Serialize BigInt for JSON
        const serialized = {
            ok: result.ok,
            discrepancies: result.discrepancies.map(d => ({
                accountId: d.accountId,
                walletBalance: Number(d.walletBalance) / 100,
                ledgerBalance: Number(d.ledgerBalance) / 100,
                diff: Number(d.diff) / 100,
            })),
        };
        res.json(serialized);
    } catch (error) {
        console.error('Ledger reconciliation error:', error);
        res.status(500).json({ error: 'Reconciliation failed' });
    }
});

// P0: Audit log export — FINANCIAL_ADMIN or SUPER_ADMIN
router.get('/audit-logs', requirePermission('admin.audit.view'), async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
        const action = req.query.action as string;

        const where: any = {};
        if (action) where.action = action;

        const [logs, total] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: { admin: { select: { id: true, username: true, displayName: true } } },
            }),
            prisma.auditLog.count({ where }),
        ]);

        res.json({
            logs,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Audit logs error:', error);
        res.status(500).json({ error: 'Failed to fetch audit logs' });
    }
});

// P0: Audit log CSV export — FINANCIAL_ADMIN or SUPER_ADMIN
router.get('/audit-logs/export', requirePermission('admin.audit.export'), async (req: Request, res: Response) => {
    try {
        const from = req.query.from ? new Date(req.query.from as string) : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        const to = req.query.to ? new Date(req.query.to as string) : new Date();

        const logs = await prisma.auditLog.findMany({
            where: { createdAt: { gte: from, lte: to } },
            orderBy: { createdAt: 'desc' },
            include: { admin: { select: { username: true } } },
        });

        const csv = [
            'id,timestamp,admin_id,admin_username,action,target_id,target_type,ip_address',
            ...logs.map(l =>
                `${l.id},${l.createdAt.toISOString()},${l.adminId},${l.admin.username || ''},${l.action},${l.targetId},${l.targetType},${l.ipAddress || ''}`
            ),
        ].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=audit-logs-${from.toISOString().split('T')[0]}-${to.toISOString().split('T')[0]}.csv`);
        res.send(csv);
    } catch (error) {
        console.error('Audit export error:', error);
        res.status(500).json({ error: 'Export failed' });
    }
});

export default router;
