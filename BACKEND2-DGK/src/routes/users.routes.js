import { Router } from 'express';
import { UserDAO } from '../dao/User.dao.js';
import { UserDTO } from '../dto/User.dto.js';

const userRouter = Router();
const users = new UserDAO();

userRouter.get('/profile', async (req, res) => {
  try {
    const sampleUser = await users.getById(''); 

    if (!sampleUser) {
      return res.status(404).json({ message: 'No se encontró el usuario' });
    }

    const publicUser = new UserDTO(sampleUser);
    res.json(publicUser);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al buscar el usuario' });
  }
});

export default userRouter;
