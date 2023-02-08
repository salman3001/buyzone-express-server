/* eslint-disable @typescript-eslint/no-misused-promises */
import { isAuth } from '../middleware/isAuth';
import express from 'express';

import { getOrders, postOrder, getOrder } from '../controllers/ordersController';

const router = express.Router();

router.route('/').get(isAuth, getOrders).post(isAuth, postOrder);
router.route('/:id').get(isAuth, getOrder);

export default router;
