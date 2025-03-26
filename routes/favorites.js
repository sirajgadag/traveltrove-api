import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoritesController.js';

const router = express.Router();

router.use(authenticate);

router.post('/favorites', addFavorite);
router.get('/favorites', getFavorites);
router.delete('/favorites/:id', removeFavorite);

export default router;