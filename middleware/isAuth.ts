import { NextFunction, Request, Response } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
	try {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.status(401).send({ message: 'Please! Log in to view th content' });
		}
	} catch (error) {
		next(error);
	}
};
