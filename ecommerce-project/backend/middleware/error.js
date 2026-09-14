export function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Route not found', error: `${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || (err.name === 'ValidationError' ? 400 : 500);
  res.status(status).json({ success: false, message: err.message || 'Something went wrong', error: process.env.NODE_ENV === 'production' ? undefined : err.stack });
}
