import { Router } from 'express';
import { createUser, login } from '../controllers/users.controller.js';
import { authMiddleware } from '../controllers/middlewares.controller.js';

const router = Router();

router.post('/createuser', authMiddleware, createUser);
router.post('/login',login)


export default router;
