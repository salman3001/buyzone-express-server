import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.isAuthenticated() && req.user?.isAdmin) {
			next();
		} else {
			res.status(401).send({ message: 'Please sign in with an admin account' });
		}
	} catch (error) {
		next(error);
	}
};
