import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const authRouter = Router();
const SECRET_KEY = process.env.JWT_SECRET || 'key';

const handleLogin = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Ingreso exitoso', token });
};

const getCurrentUser = (req, res) => {
  const { _id, email, first_name, last_name, role } = req.user;
  res.json({ id: _id, email, fullName: `${first_name} ${last_name}`, role });
};

authRouter.post(
  '/register',
  passport.authenticate('register', { session: false }),
  (req, res) => {
    res.json({ message: 'Registro completado con éxito' });
  }
);

authRouter.post('/login', passport.authenticate('login', { session: false }), handleLogin);

authRouter.get('/me', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default authRouter;
