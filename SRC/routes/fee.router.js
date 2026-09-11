import {getFeeByDate} from '../controllers/fee.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/getFeeByDate', getFeeByDate);

export default router;