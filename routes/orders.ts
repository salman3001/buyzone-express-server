import { isAuth } from '../middleware/isAuth';
import express from 'express';

import { getOrder, postOrder, updateOrder } from '../controllers/ordersController';

const router = express.Router();

router.route('/').get(isAuth, getOrder).post(isAuth, postOrder);

export default router;
