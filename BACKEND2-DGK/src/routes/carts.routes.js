import { Router } from 'express';
import passport from 'passport';
import { authRole } from '../middlewares/auth.middleware.js';
import { createTicket } from '../services/ticket.service.js';
import { CartModel } from '../models/Cart.model.js';
import { ProductModel } from '../models/Product.model.js';

const cartsRouter = Router();

cartsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authRole('user'),
  async (req, res) => {
    try {
      const cart = await CartModel.create({
        products: [],
        userEmail: req.user.email,
      });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo crear el carrito' });
    }
  }
);

cartsRouter.post('/:cartId/product/:productId',
  passport.authenticate('jwt', { session: false }),
  authRole('user'),
  async (req, res) => {
    try {
      const { cartId, productId } = req.params;

      const cart = await CartModel.findById(cartId);
      if (!cart) return res.status(404).json({ error: 'Carrito no existe' });

      const product = await ProductModel.findById(productId);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

      const productIndex = cart.products.findIndex(p => p.product.equals(productId));
      if (productIndex >= 0) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: 'Error al añadir producto' });
    }
  }
);


cartsRouter.get('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartModel.findById(cartId).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});


cartsRouter.post(
  '/:cartId/checkout',
  passport.authenticate('jwt', { session: false }),
  authRole('user'),
  async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await CartModel.findById(cartId).populate('products.product');
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

      let totalAmount = 0;
      const failedProducts = [];

      for (const item of cart.products) {
        const prod = item.product;
        if (item.quantity <= prod.stock) {
          totalAmount += prod.price * item.quantity;
          prod.stock -= item.quantity;
          await prod.save();
        } else {
          failedProducts.push(prod._id.toString());
        }
      }

      let purchaseTicket = null;
      if (totalAmount > 0) {
        purchaseTicket = await createTicket(totalAmount, req.user.email);
      }

      cart.products = cart.products.filter(p => failedProducts.includes(p.product._id.toString()));
      await cart.save();

      res.json({
        ticket: purchaseTicket,
        productosNoProcesados: failedProducts,
        carritoActualizado: cart.products,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al procesar compra' });
    }
  }
);

export default cartsRouter;
