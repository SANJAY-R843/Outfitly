export const errorHandler = (err, req, res, next) => {
  console.error('[AURA Server Error]:', err.stack || err.message || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected luxury error occurred. Our styling servers are refining the canvas.';

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
