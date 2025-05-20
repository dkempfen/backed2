import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

export const handleLogin = async (req, res) => {
  try {
    const payload = { id: req.user._id };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    return res.json({
      message: 'Inicio de sesión correcto',
      authToken: token
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el token' });
  }
};

export const getUserInfo = (req, res) => {
  const user = req.user;
  const fullName = `${user.first_name} ${user.last_name}`;

  return res.json({
    id: user._id,
    email: user.email,
    fullName,
    role: user.role
  });
};
