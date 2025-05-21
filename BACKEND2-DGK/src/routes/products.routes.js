import { Router } from 'express';
import passport from 'passport';
import {
  fetchAllProducts,
  fetchProductById,
  addProduct,
  modifyProduct,
  removeProduct,
} from '../controllers/products.controller.js';
import { checkRole } from '../middlewares/auth.middleware.js';

const productsRouter = Router();

productsRouter.get('/', fetchAllProducts);
productsRouter.get('/:productId', fetchProductById);

productsRouter.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  addProduct
);

productsRouter.put('/:productId',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  modifyProduct
);

productsRouter.delete('/:productId',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  removeProduct
);

export default productsRouter;
