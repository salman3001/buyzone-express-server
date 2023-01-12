import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';
import Order from '../models/Order';

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		Order.findById(id).exec((err, result) => {
			if (err) {
				next(err);
			} else {
				response.status(200).send({ Order: result });
			}
		});
	} catch (error) {
		next(error);
	}
};

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const order = Order.create(data);
		res.status(200).send(Order);
	} catch (error) {
		next(error);
	}
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.body;
		Order.findByIdAndDelete(id).exec((err, result) => {
			if (err) {
				next(err);
			} else {
				response.status(200).send({ message: 'Order deleted successfully' });
			}
		});
	} catch (error) {
		next(error);
	}
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.body.id;
		Order.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }).exec((err, result) => {
			if (err) {
				next(err);
			} else {
				res.status(200).send(result);
			}
		});
	} catch (error) {
		next(error);
	}
};
