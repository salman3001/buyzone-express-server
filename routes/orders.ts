/* eslint-disable @typescript-eslint/no-misused-promises */
import { isAuth } from '../middleware/isAuth';
import express from 'express';

import { getOrder, postOrder } from '../controllers/ordersController';

const router = express.Router();

router.route('/').get(isAuth, getOrder).post(isAuth, postOrder);

export default router;
