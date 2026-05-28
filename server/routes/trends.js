import express from 'express';
import { getTrendsForecasting } from '../controllers/trendsController.js';

const router = express.Router();

router.get('/', getTrendsForecasting);

export default router;
