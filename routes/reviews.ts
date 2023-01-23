/* eslint-disable @typescript-eslint/no-misused-promises */
import { isAuth } from '../middleware/isAuth';
import express from 'express';

import { deleteReview, getReviews, postReview, updateReview } from '../controllers/reviewsController';

const router = express.Router();

router.route('/').get(getReviews).post(isAuth, postReview).patch(isAuth, updateReview).delete(isAuth, deleteReview);

export default router;
