import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Review from '../models/Reviews';

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const productId = new mongoose.Types.ObjectId(req.query?.id);
		Review.find({ product: productId }).exec((err, result) => {
			if (err) {
				next(err);
			} else {
				res.status(200).send({ reviews: result });
			}
		});
	} catch (error) {
		next(error);
	}
};

export const postReview = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = new mongoose.Types.ObjectId(req.user?._id);
		const data = req.body;
		const review = await Review.create([{ ...data, reviewedBy: userId }], { validateBeforeSave: true });
		res.status(200).send(review);
	} catch (error) {
		next(error);
	}
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.query;
		const userId = req.user?._id;
		const review = await Review.findById(id);
		if (review === null) {
			res.status(404).send({ message: 'Review not foud' });
		} else {
			if (userId === (review.reviewedBy as any).toString()) {
				const deletedReview = await Review.findByIdAndDelete(id);
				if (deletedReview) {
					res.status(200).send({ message: 'review deleted' });
				} else {
					next('server error');
				}
			} else {
				res.status(401).send({ message: 'You are not authorized to delete this review' });
			}
		}
	} catch (error) {
		next(error);
	}
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.user?._id;
		const id = req.query.id;

		Review.findById(id).exec(async (err, review) => {
			if (err) {
				next(err);
			} else if (review === null) {
				res.status(404).send({ message: 'review not found' });
			} else {
				if (userId === (review.reviewedBy as any).toString()) {
					review.rating = req.body.rating;
					review.comment = req.body.comment;
					const updatedreview = await review.save({ validateBeforeSave: true });
					res.status(201).send({ message: 'review updated' });
				} else {
					res.status(401).send({ message: 'not uthorized to update' });
				}
			}
		});
	} catch (error) {
		next(error);
	}
};
