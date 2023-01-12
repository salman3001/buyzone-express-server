import express from 'express';

import { deleteReview, getReviews, postReview, updateReview } from '../controllers/reviewsController';

const router = express.Router();

router.route('/').get(getReviews).post(postReview).patch(updateReview).delete(deleteReview);

export default router;
