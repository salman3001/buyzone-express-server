import { isLoggedin } from './../middleware/isLoggedin';
import express from 'express';

import { getOrder, postOrder, updateOrder } from '../controllers/ordersController';

const router = express.Router();

router.route('/').get(isLoggedin, getOrder).post(isLoggedin, postOrder);

export default router;
