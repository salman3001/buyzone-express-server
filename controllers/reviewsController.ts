import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';
import Review from '../models/Reviews';

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		Review.findById(id).exec((err, result) => {
			if (err) {
				next(err);
			} else {
				response.status(200).send({ review: result });
			}
		});
	} catch (error) {
		next(error);
	}
};

export const postReview = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const review = await Review.create([data], { validateBeforeSave: true });
		res.status(200).send(review);
	} catch (error) {
		next(error);
	}
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.body;
		Review.findByIdAndDelete(id).exec((err, result) => {
			if (err) {
				next(err);
			} else {
				response.status(200).send({ message: 'Review deleted successfully' });
			}
		});
	} catch (error) {
		next(error);
	}
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.body.id;
		Review.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }).exec((err, result) => {
			if (err) {
				next(err);
			} else {
				res.status(200).send(result);
			}
		});
	} catch (error) {
		next(error);
	}
};
