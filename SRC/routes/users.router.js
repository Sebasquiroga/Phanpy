import { Router } from 'express';
import { createUser } from '../controllers/users.controller.js';

const router = Router();

router.post('/createuser', createUser);

export default router;
