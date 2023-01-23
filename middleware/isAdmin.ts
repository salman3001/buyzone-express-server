import { NextFunction, Request, Response } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
	try {
		if (req.isAuthenticated() && Boolean(req.user.isAdmin)) {
			next();
		} else {
			res.status(401).send({ message: 'Please sign in with an admin account' });
		}
	} catch (error) {
		next(error);
	}
};
