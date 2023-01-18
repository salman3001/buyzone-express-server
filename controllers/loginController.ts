import { compare } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log(req.session);
		res.status(200).send('done');
	} catch (error) {
		next(error);
	}
};
