// ============================================================
// rbacMiddleware.ts — Role-Based Access Control for Admin Panel
// P0 Security: Granular permissions per admin role.
//
// Roles:
//   SUPER_ADMIN       → full access (everything)
//   FINANCIAL_ADMIN   → wallet/transactions/ledger + reconciliation
//   CONTENT_MODERATOR → streams/users/reports + banning
//   SUPPORT_AGENT     → read-only user info + password resets
// ============================================================

import { Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from './authMiddleware';

// ============== Permission Matrix ==============

type Permission =
    | 'admin.dashboard'
    | 'admin.users.list'
    | 'admin.users.update'
    | 'admin.users.ban'
    | 'admin.streams.list'
    | 'admin.streams.end'
    | 'admin.transactions.list'
    | 'admin.transactions.approve'
    | 'admin.transactions.reject'
    | 'admin.audit.view'
    | 'admin.audit.export'
    | 'admin.ledger.reconcile'
    | 'admin.reports.list'
    | 'admin.reports.review'
    | 'admin.kyc.review'
    | 'admin.kyc.approve';

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
    SUPER_ADMIN: [
        'admin.dashboard',
        'admin.users.list', 'admin.users.update', 'admin.users.ban',
        'admin.streams.list', 'admin.streams.end',
        'admin.transactions.list', 'admin.transactions.approve', 'admin.transactions.reject',
        'admin.audit.view', 'admin.audit.export',
        'admin.ledger.reconcile',
        'admin.reports.list', 'admin.reports.review',
        'admin.kyc.review', 'admin.kyc.approve',
    ],
    FINANCIAL_ADMIN: [
        'admin.dashboard',
        'admin.users.list',
        'admin.transactions.list', 'admin.transactions.approve', 'admin.transactions.reject',
        'admin.audit.view', 'admin.audit.export',
        'admin.ledger.reconcile',
        'admin.kyc.review', 'admin.kyc.approve',
    ],
    CONTENT_MODERATOR: [
        'admin.dashboard',
        'admin.users.list', 'admin.users.ban',
        'admin.streams.list', 'admin.streams.end',
        'admin.reports.list', 'admin.reports.review',
    ],
    SUPPORT_AGENT: [
        'admin.dashboard',
        'admin.users.list',
        'admin.reports.list',
    ],
};

// ============== Middleware ==============

/**
 * Check if the authenticated user has the ADMIN role AND the specific permission.
 *
 * Usage:
 *   router.post('/transactions/:id/approve', requirePermission('admin.transactions.approve'), handler);
 */
export function requirePermission(permission: Permission) {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ error: 'Não autenticado' });
                return;
            }

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { role: true, adminRole: true },
            });

            if (!user || user.role !== 'ADMIN') {
                res.status(403).json({ error: 'Acesso restrito a administradores' });
                return;
            }

            // If user is ADMIN but has no adminRole set, treat as SUPER_ADMIN for backward compat
            const adminRole = user.adminRole || 'SUPER_ADMIN';
            const permissions = ROLE_PERMISSIONS[adminRole] || [];

            if (!permissions.includes(permission)) {
                res.status(403).json({
                    error: 'Permissão insuficiente para esta operação',
                    code: 'INSUFFICIENT_PERMISSION',
                    required: permission,
                    currentRole: adminRole,
                });
                return;
            }

            // Attach admin info for downstream audit logging
            (req as any).adminRole = adminRole;

            next();
        } catch (error) {
            console.error('[RBAC] Error:', error);
            res.status(500).json({ error: 'Erro interno na verificação de permissões' });
        }
    };
}

/**
 * Simple admin check (any admin role).
 * Use this for endpoints where all admins should have access.
 */
export function requireAdmin() {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ error: 'Não autenticado' });
                return;
            }

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { role: true },
            });

            if (!user || user.role !== 'ADMIN') {
                res.status(403).json({ error: 'Acesso restrito a administradores' });
                return;
            }

            next();
        } catch (error) {
            console.error('[RBAC] Error checking admin:', error);
            res.status(500).json({ error: 'Erro interno' });
        }
    };
}

/**
 * Get permissions list for an admin role (useful for frontend UI rendering).
 */
export function getPermissionsForRole(role: string): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
}

/**
 * Get all available roles with their permissions (admin settings page).
 */
export function getAllRoles(): Record<string, Permission[]> {
    return { ...ROLE_PERMISSIONS };
}
