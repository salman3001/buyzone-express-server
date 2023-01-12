import express from 'express';
import {
	addProduct,
	deleteProduct,
	getProduct,
	getSingleProduct,
	updateProduct,
} from '../controllers/productController';
import { deleteReview, getReviews, postReview, updateReview } from '../controllers/reviewsController';
import productImageUploader from '../middleware/productImageUplodaer';

const router = express.Router();

router.route('/').get(getProduct).post(productImageUploader, addProduct);
router.route('/:id').get(getSingleProduct).patch(productImageUploader, updateProduct).delete(deleteProduct);
router.route('/:id/reviews').get(getReviews).post(postReview).patch(updateReview).delete(deleteReview);
export default router;
