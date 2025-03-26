import express from 'express';
import { setupDatabase } from '../controllers/setupDbController.js';

const router = express.Router();
router.get('/setup-db', setupDatabase);

export default router;