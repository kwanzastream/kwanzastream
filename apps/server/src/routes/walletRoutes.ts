import { Router } from 'express';
import {
    getWallet,
    requestDeposit,
    requestWithdrawal,
    getTransactionHistory,
    checkPaymentStatus,
} from '../controllers/walletController';
import { authMiddleware } from '../middleware/authMiddleware';
import { kycGate, getTierLimits } from '../middleware/kycGate';

const router = Router();

// All wallet routes are protected
router.use(authMiddleware);

router.get('/', getWallet);

// P0: KYC gate enforces tier limits on financial operations
router.post('/deposit', kycGate('deposit'), requestDeposit);
router.post('/withdraw', kycGate('withdraw'), requestWithdrawal);
router.get('/transactions', getTransactionHistory);

// Sprint 1: Payment status polling (Multicaixa)
router.get('/payment-status/:transactionId', checkPaymentStatus);

// P0: Expose tier limits for frontend display
router.get('/kyc-tiers', (_req, res) => {
    res.json({ tiers: getTierLimits() });
});

export default router;

