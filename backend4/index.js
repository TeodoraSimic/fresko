import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dns from 'dns';

dns.setServers(['1.1.1.1', '1.0.0.1']);
dotenv.config();

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Body parser — da bismo čitali req.body (email, lozinka...)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser — da bismo čitali JWT iz kolačića
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API radi...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server radi na portu ${port}`));