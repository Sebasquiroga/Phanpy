import { Router } from 'express';
import { getPrice, updatePrice } from '../controllers/price.controller.js';

const router = Router();

router.get('/price', getPrice);
router.patch('/updatePrice', updatePrice);

export default router;

