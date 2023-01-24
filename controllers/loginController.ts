import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const user = req.user;
		if (user != null) {
			res.status(200).json({
				message: 'Login Successfull',
				user: { id: user._id, isAdmin: user.isAdmin, name: user.firstName + ' ' + user.lastName, email: user.email },
			});
		}
	} catch (error) {
		next(error);
	}
};
