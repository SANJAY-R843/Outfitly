import express from 'express';
import { resolveOutfitVisualization } from '../controllers/visualizeController.js';

const router = express.Router();

router.post('/outfit', resolveOutfitVisualization);

export default router;
