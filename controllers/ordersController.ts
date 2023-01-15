import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order';

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.body;
		Order.find({ userId: userId }).exec((err, result) => {
			if (err) {
				next(err);
			} else if (result === null) {
				res.status(404).send({ message: 'No orders found' });
			} else {
				res.status(200).send({ Orders: result });
			}
		});
	} catch (error) {
		next(error);
	}
};

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.body;
		const data = req.body;
		const order = await Order.create({ ...data, userId: userId });
		res.status(200).send({ message: 'successfull', order });
	} catch (error) {
		next(error);
	}
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.query;
		const { userId } = req.body;
		const order = await Order.findById(id);
		if (order) {
			if (userId === (order.userId as any).toString()) {
				Order.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }).exec((err, result) => {
					if (err) {
						next(err);
					} else if (result === null) {
						res.status(404).send({ message: 'Order not found' });
					} else {
						res.status(200).send({ order: result });
					}
				});
			} else {
				res.status(401).send({ message: 'You are not authorized to update this order' });
			}
		} else {
			res.status(404).send({ message: 'order not found' });
		}
	} catch (error) {
		next(error);
	}
};
