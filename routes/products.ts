/* eslint-disable @typescript-eslint/no-misused-promises */
import { isAdmin } from './../middleware/isAdmin';
import express from 'express';
import {
	addProduct,
	deleteProduct,
	getProducts,
	getSingleProduct,
	updateProduct,
} from '../controllers/productController';
import imageUploader from '../middleware/productIimageUplodaer';

const router = express.Router();

router.route('/').get(getProducts).post(isAdmin, imageUploader.array('productImages', 5), addProduct);
router
	.route('/:id')
	.get(getSingleProduct)
	.patch(isAdmin, imageUploader.array('productImages', 5), updateProduct)
	.delete(deleteProduct);
export default router;
