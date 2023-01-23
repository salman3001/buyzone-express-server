/* eslint-disable @typescript-eslint/no-misused-promises */
import { isAdmin } from './../middleware/isAdmin';
import { isAuth } from '../middleware/isAuth';
import express from 'express';

import { getOrder, updateOrder } from '../controllers/ordersController';

const router = express.Router();

router.route('/').get(isAuth, isAdmin, getOrder).patch(isAuth, isAdmin, updateOrder);

export default router;
