import { compare } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { firstName, lastName, _id, isAdmin, email } = req.user as any;
	try {
		res.status(200).json({
			message: 'Login Successfull',
			user: { id: _id, isAdmin: isAdmin, name: firstName + ' ' + lastName, email: email },
		});
	} catch (error) {
		next(error);
	}
};
