import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { firstName, lastName, _id, isAdmin, email } = req.user;
	try {
		res.status(200).json({
			message: 'Login Successfull',
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			user: { id: _id, isAdmin, name: firstName + ' ' + lastName, email },
		});
	} catch (error) {
		next(error);
	}
};
