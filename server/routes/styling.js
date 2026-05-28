import express from 'express';
import { analyzeOutfit, getProfileRecommendations } from '../controllers/stylingController.js';
import upload from '../middleware/upload.js';
import { stylingLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Multi-part image uploader with rate-limiting protection
router.post('/analyze', stylingLimiter, upload.single('outfit'), analyzeOutfit);

// Get direct profile recommended outfits
router.post('/profile-recommendations', getProfileRecommendations);

export default router;
