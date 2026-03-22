import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    getSession, getDashboard, getUsers, getUser, suspendUser, banUser, verifyUser,
    getConfig, updateConfig, toggleMaintenance,
    getFeatureFlags, toggleFeatureFlag,
    broadcastNotification, getAuditLog,
    getApplications, reviewApplication,
    getPendingWithdrawals, approveWithdrawal, rejectWithdrawal,
    getAdmins, inviteAdmin,
} from '../controllers/adminController';

const router = Router();
router.use(authMiddleware as any);

// Auth
router.get('/auth/session', getSession as any);

// Dashboard
router.get('/dashboard', getDashboard as any);

// Users
router.get('/users', getUsers as any);
router.get('/users/:id', getUser as any);
router.patch('/users/:id/suspend', suspendUser as any);
router.patch('/users/:id/ban', banUser as any);
router.patch('/users/:id/verify', verifyUser as any);

// Streamers
router.get('/streamers/applications/:type', getApplications as any);
router.patch('/streamers/applications/:id', reviewApplication as any);

// Payments
router.get('/payments/withdrawals/pending', getPendingWithdrawals as any);
router.patch('/payments/withdrawals/:id/approve', approveWithdrawal as any);
router.patch('/payments/withdrawals/:id/reject', rejectWithdrawal as any);

// Config
router.get('/config', getConfig as any);
router.patch('/config/:key', updateConfig as any);
router.post('/config/maintenance/toggle', toggleMaintenance as any);

// Feature Flags
router.get('/feature-flags', getFeatureFlags as any);
router.patch('/feature-flags/:name/toggle', toggleFeatureFlag as any);

// Notifications
router.post('/notifications/broadcast', broadcastNotification as any);

// Logs
router.get('/logs/:type', getAuditLog as any);
router.get('/audit', getAuditLog as any);

// Admins
router.get('/admins', getAdmins as any);
router.post('/admins/invite', inviteAdmin as any);

export default router;
