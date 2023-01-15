import { isLoggedin } from './../middleware/isLoggedin';
import express from 'express';

import { deleteReview, getReviews, postReview, updateReview } from '../controllers/reviewsController';

const router = express.Router();

router
	.route('/')
	.get(getReviews)
	.post(isLoggedin, postReview)
	.patch(isLoggedin, updateReview)
	.delete(isLoggedin, deleteReview);

export default router;
