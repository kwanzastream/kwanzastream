import { Router } from 'express';
import {
  createParty, getMyParties, getPartyHistory, getParty, endParty,
  joinParty, leaveParty, getParticipants, removeParticipant,
  inviteToParty, joinByCode,
} from '../controllers/watchPartyController';
import { authMiddleware as authenticate } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticate);

router.post('/', createParty);
router.get('/', getMyParties);
router.get('/history', getPartyHistory);
router.get('/join/:code', joinByCode);
router.get('/:id', getParty);
router.delete('/:id', endParty);

router.post('/:id/join', joinParty);
router.post('/:id/leave', leaveParty);
router.get('/:id/participants', getParticipants);
router.delete('/:id/participants/:userId', removeParticipant);
router.post('/:id/invite', inviteToParty);

export default router;
