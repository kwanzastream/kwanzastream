import { Router } from 'express';
import {
    getWallet,
    requestDeposit,
    requestWithdrawal,
    getTransactionHistory,
} from '../controllers/walletController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All wallet routes are protected
router.use(authMiddleware);

router.get('/', getWallet);
router.post('/deposit', requestDeposit);
router.post('/withdraw', requestWithdrawal);
router.get('/transactions', getTransactionHistory);

export default router;
