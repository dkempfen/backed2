import { Router } from 'express';
import passport from 'passport';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';
import { authRole } from '../middlewares/auth.middleware.js';

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:productId', getProductById);

productsRouter.post( '/',
  passport.authenticate('jwt', { session: false }),
  authRole('admin'),
  createProduct
);

productsRouter.put('/:productId',
  passport.authenticate('jwt', { session: false }),
  authRole('admin'),
  updateProduct
);

productsRouter.delete('/:productId',
  passport.authenticate('jwt', { session: false }),
  authRole('admin'),
  deleteProduct
);

export default productsRouter;
