import { Router } from 'express';
import {
  getSavedItems, saveItem, removeSavedItem, clearSavedByType,
  getCollections, createCollection, getCollection, updateCollection, deleteCollection,
  addToCollection, removeFromCollection,
  getFavorites, addFavorite, removeFavorite,
} from '../controllers/savedController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

// Saved items
router.get('/saved/:type', getSavedItems);
router.post('/saved', saveItem);
router.delete('/saved/type/:type', clearSavedByType);
router.delete('/saved/:id', removeSavedItem);

// Collections
router.get('/collections', getCollections);
router.post('/collections', createCollection);
router.get('/collections/:id', getCollection);
router.patch('/collections/:id', updateCollection);
router.delete('/collections/:id', deleteCollection);
router.post('/collections/:id/items', addToCollection);
router.delete('/collections/:id/items/:itemId', removeFromCollection);

// Favorites
router.get('/favorites/:type', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:id', removeFavorite);

export default router;
