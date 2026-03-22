import { Router } from 'express';
import {
  getStreamHistory, recordView, deleteViewItem,
  getSearchHistory, clearSearchHistory,
  getChannelVisits, recordChannelVisit,
  clearAllHistory, clearStreamHistory,
} from '../controllers/historyController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All history routes require auth
router.use(authenticate);

router.get('/streams', getStreamHistory);
router.post('/streams', recordView);
router.delete('/streams/all', clearStreamHistory);
router.delete('/streams/:id', deleteViewItem);

router.get('/searches', getSearchHistory);
router.delete('/searches', clearSearchHistory);

router.get('/channels', getChannelVisits);
router.post('/channels', recordChannelVisit);

router.delete('/all', clearAllHistory);

export default router;
