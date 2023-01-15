import { compare } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		console.log(req.body.userId);

		const user = await User.findOne({ email: email });
		if (user) {
			if (await compare(password, user.password)) {
				const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRETE as string, {
					expiresIn: '1h',
				});
				res.status(201).send({
					user: {
						userId: user._id,
						userName: user.firstName + ' ' + user.lastName,
						email: user.email,
						isAdmin: user.isAdmin,
					},
					token,
				});
			} else {
				res.status(404).send({ message: 'incorrect password' });
			}
		} else {
			res.status(404).send({ message: 'No User with this email address was found' });
		}
	} catch (error) {
		next(error);
	}
};
