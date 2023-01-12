import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import User from '../models/User';

export async function postUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user = req.body;
		const password = await hash(req.body.password, 10);
		const cretaedUser = await User.create({ ...user, password: password });
		res.status(200).send({ message: 'user created', user: cretaedUser });
	} catch (err) {
		next(err);
	}
}

export async function patchUser(req: Request, res: Response, next: NextFunction) {
	try {
		const id = req.body.id;
		const password = await hash(req.body.password, 10);
		User.findByIdAndUpdate(id, { ...req.body, password: password }, { new: true, runValidators: true }).exec(
			(err, result) => {
				if (err) {
					next(err);
				} else {
					res.status(200).send({ message: 'user updated', user: result });
				}
			}
		);
	} catch (err) {
		next(err);
	}
}
