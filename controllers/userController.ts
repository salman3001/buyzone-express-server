import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import User from '../models/User';

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const users = await User.find();
		res.status(200).send({ message: 'user found', users });
	} catch (err) {
		next(err);
	}
}

export async function postUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const user = req.body;
		const password = await hash(req.body.password, 10);
		const cretaedUser = await User.create({ ...user, password });
		res.status(200).send({ message: 'user created', user: cretaedUser });
	} catch (err) {
		next(err);
	}
}

export async function patchUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		if (req.user?.isAdmin ?? false) {
			const id = req.body.id;
			const password = await hash(req.body.password, 10);
			const result = await User.findByIdAndUpdate(id, { ...req.body, password }, { new: true, runValidators: true });
			if (result === null) {
				res.status(404).send({ messsage: 'user does not exist' });
			} else {
				res.status(200).send({ message: 'user updated', user: result });
			}
		} else {
			const userId = req.user?._id;
			const password = await hash(req.body.password, 10);
			const result = await User.findByIdAndUpdate(
				userId,
				{ ...req.body, password },
				{ new: true, runValidators: true }
			);
			if (result === null) {
				res.status(404).send({ messsage: 'user does not exist' });
			} else {
				res.status(200).send({ message: 'user updated', user: result });
			}
		}
	} catch (err) {
		next(err);
	}
}
