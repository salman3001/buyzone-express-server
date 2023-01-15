import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authToken = req.headers.authorization?.split(' ')[1];
		if (authToken) {
			try {
				const decode = jwt.verify(authToken, process.env.JWT_SECRETE as string);
				req.body.userId = decode.userId;
				req.body.isAdmin = decode.isAdmin;

				next();
			} catch (error) {
				res.status(401).send({ message: 'please log in again' });
			}
		} else {
			res.status(401).send({ message: 'not authorized' });
		}
	} catch (error) {
		next(error);
	}
};
