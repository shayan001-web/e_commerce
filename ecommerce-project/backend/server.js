import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ensureDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;
  await connectDB();
};

const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ success: true, message: 'Nexa Market API is running', data: { status: 'ok' } }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

if (process.env.VERCEL) {
  await ensureDatabase();
} else {
  const port = process.env.PORT || 5000;
  connectDB()
    .then(() => app.listen(port, () => console.log(`API listening on http://localhost:${port}`)))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default app;
