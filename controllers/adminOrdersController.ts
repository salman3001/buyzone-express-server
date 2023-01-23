// import { NextFunction, Request,  Response } from 'express';

// import Order from '../models/Order';

// export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		Order.find().exec((err, result) => {
// 			if (err) {
// 				next(err);
// 			} else if (result === null) {
// 				res.status(404).send({ message: 'No orders found' });
// 			} else {
// 				res.status(200).send({ Orders: result });
// 			}
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const { id } = req.query;
// 		const order = await Order.findById(id);
// 		if (order) {
// 			order.status = req.body.status;
// 			const updatedOrder = await order.save({ validateBeforeSave: true });
// 			res.status(201).send({ message: 'order updated successfully', order: updatedOrder });
// 		} else {
// 			res.status(404).send({ message: 'order not found' });
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// };
