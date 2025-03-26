import express from 'express';
import { searchDestinationGuides, getDestinationGuide } from '../controllers/destinationGuidesController.js';

const router = express.Router();

router.get('/destination-guides/search', searchDestinationGuides);
router.get('/destination-guides/:id', getDestinationGuide);

export default router;