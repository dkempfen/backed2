export const checkRole = (requiredRole) => {
    return (req, res, next) => {
      const user = req.user;
      if (!user || user.role !== requiredRole) {
        return res.status(403).json({ error: 'No tienes permiso para acceder' });
      }
      next();
    };
  };
  