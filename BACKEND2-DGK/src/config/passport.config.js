import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/User.model.js';
import { CartModel } from '../models/Cart.model.js';


const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecretKey';

const registerStrategy = new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return done(null, false, { message: 'El correo ya está registrado' });
      }

      const cart = await CartModel.create({ products: [] });
      const { first_name, last_name, role } = req.body;

      const newUser = await UserModel.create({
        first_name,
        last_name,
        email,
        password,
        role,
        cart: cart._id
      });

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
);

const loginStrategy = new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const foundUser = await UserModel.findOne({ email });
      if (!foundUser || foundUser.password !== password) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos' });
      }
      return done(null, foundUser);
    } catch (error) {
      return done(error);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
  },
  async (jwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);
passport.use('jwt', jwtStrategy);
