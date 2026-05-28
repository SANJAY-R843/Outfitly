import rateLimit from 'express-rate-limit';

// Rate limiting for styling consultation requests
export const stylingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many luxury stylings requested from this IP. Please wait 15 minutes before scanning another outfit.'
  }
});

// General rate limiter for base routes
export const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per 5 minutes
  message: {
    error: 'Too many requests. Please slow down.'
  }
});
