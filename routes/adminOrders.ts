import { isAdmin } from './../middleware/isAdmin';
import { isLoggedin } from './../middleware/isLoggedin';
import express from 'express';

import { getOrder, updateOrder } from '../controllers/ordersController';

const router = express.Router();

router.route('/').get(isLoggedin, isAdmin, getOrder).patch(isLoggedin, isAdmin, updateOrder);

export default router;
