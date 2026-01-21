import { Router } from 'express';
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

const router = Router();

// All admin routes require authentication and ADMIN role
router.use(authMiddleware);
router.use(requireRole('ADMIN'));

// Dashboard
router.get('/stats', getDashboardStats);

// User management
router.get('/users', listUsers);
router.put('/users/:id', updateUser);
router.post('/users/:id/ban', banUser);

// Stream management
router.get('/streams', listStreams);
router.post('/streams/:id/end', forceEndStream);

// Transaction management
router.get('/transactions', listTransactions);
router.post('/transactions/:id/approve', approveWithdrawal);
router.post('/transactions/:id/reject', rejectWithdrawal);

export default router;
