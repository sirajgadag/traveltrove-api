import express from 'express';
import { createTripItinerary, getTripItinerary } from '../controllers/tripItinerariesController.js';

const router = express.Router();

router.post('/trip-itineraries', createTripItinerary);
router.get('/trip-itineraries/:id', getTripItinerary);

export default router;