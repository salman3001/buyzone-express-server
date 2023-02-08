import { NextFunction, Request, Response } from 'express';
import Order from '../models/Order';

interface ISearch {
	status?: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancled';
}

export const getOrders = async (
	req: Request<unknown, unknown, unknown, NonNullable<ISearch>>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const user = req?.user;
		const { status } = req.query;
		let search: ISearch = {};
		if (status != null) search.status = status;

		if (user?.isAdmin ?? false) {
			Order.find({ ...search }).exec((err, result) => {
				if (err != null) {
					next(err);
				} else if (result === null) {
					res.status(404).send({ message: 'No orders found' });
				} else {
					res.status(200).send({ Orders: result });
				}
			});
		} else {
			Order.find({ _id: user?._id, ...search }).exec((err, result) => {
				if (err != null) {
					next(err);
				} else if (result === null) {
					res.status(404).send({ message: 'No orders found' });
				} else {
					res.status(200).send({ Orders: result });
				}
			});
		}
	} catch (error) {
		next(error);
	}
};

export const getOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const user = req?.user;
		const id = req.params.id;

		if (user?.isAdmin ?? false) {
			Order.findById(id).exec((err, result) => {
				if (err != null) {
					next(err);
				} else if (result === null) {
					res.status(404).send({ message: 'No orders found' });
				} else {
					res.status(200).send({ Order: result });
				}
			});
		} else {
			Order.findById({ _id: id, userId: user?._id }).exec((err, result) => {
				if (err != null) {
					next(err);
				} else if (result === null) {
					res.status(404).send({ message: 'No orders found' });
				} else {
					res.status(200).send({ Order: result });
				}
			});
		}
	} catch (error) {
		next(error);
	}
};

export const postOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const userId = req.user?._id;
		const data = req.body;
		const order = await Order.create({ ...data, userId });
		res.status(200).send({ message: 'successfull', order });
	} catch (error) {
		next(error);
	}
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.query;
		const userId = req.user?._id;
		const order = await Order.findById(id);

		if (order != null) {
			if (req.user?.isAdmin ?? false) {
				Order.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }).exec((err, result) => {
					if (err != null) {
						next(err);
					} else {
						res.status(200).send({ order: result });
					}
				});
			} else {
				if (userId === (order.userId as any).toString()) {
					Order.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }).exec((err, result) => {
						if (err != null) {
							next(err);
						} else {
							res.status(200).send({ order: result });
						}
					});
				} else {
					res.status(401).send({ message: 'You are not authorized to update this order' });
				}
			}
		} else {
			res.status(404).send({ message: 'order not found' });
		}
	} catch (error) {
		next(error);
	}
};
