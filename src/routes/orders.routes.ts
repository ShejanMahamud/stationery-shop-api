import express from 'express';
import { createOrder, totalRevenue } from '../controllers/order.controllers';

const router = express.Router();

router.post('/', createOrder);
router.get('/revenue', totalRevenue);

export default router;
