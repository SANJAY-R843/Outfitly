import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import stylingRouter from './routes/styling.js';
import wardrobeRouter from './routes/wardrobe.js';
import trendsRouter from './routes/trends.js';
import visualizeRouter from './routes/visualize.js';

// Load environmental parameters
dotenv.config({ path: '../.env' }); // Root env config

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Enable canvas images load in browser
  contentSecurityPolicy: false
}));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(generalLimiter);

// Core API pipelines
app.use('/api/style', stylingRouter);
app.use('/api/wardrobe', wardrobeRouter);
app.use('/api/trends', trendsRouter);
app.use('/api/visualize', visualizeRouter);

// Base route for health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'active', platform: 'AURA AI', timestamp: new Date() });
});

// Central Error Interceptor
app.use(errorHandler);

// Listen on configured port
app.listen(PORT, () => {
  console.log(`[AURA Server] Active and running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});
