import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { connectDB } from './config/db.js';
import './config/passport.config.js';
import userRoutes from './routes/users.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import sessionRoutes from './routes/sessions.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes);


// Iniciar server
const init = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Servidor disponible en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error al iniciar la app:', err);
  }
};

init();
