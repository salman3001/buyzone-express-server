import express from 'express';

import { deleteOrder, getOrders, postOrder, updateOrder } from '../controllers/ordersController';

const router = express.Router();

router.route('/Orders').get(getOrders).post(postOrder).patch(updateOrder).delete(deleteOrder);

export default router;
