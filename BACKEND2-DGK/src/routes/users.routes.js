
import { Router } from 'express';
import { UserRepository } from '../dao/User.dao.js'; 
import { UserDTO } from '../dto/User.dto.js';

const router = Router();
const userDao = new UserRepository(); 

router.get('/current', async (req, res) => {
    try {
   
        const user = await userDao.findById('681a6cbea868bc04c14636f2'); 

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const safeUser = new UserDTO(user); 
        res.json(safeUser);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

export default router;
