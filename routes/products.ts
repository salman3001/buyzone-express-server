import { isAdmin } from './../middleware/isAdmin';
import { isLoggedin } from './../middleware/isLoggedin';
import express from 'express';
import {
	addProduct,
	deleteProduct,
	getProducts,
	getSingleProduct,
	updateProduct,
} from '../controllers/productController';
import productImageUploader from '../middleware/productImageUplodaer';

const router = express.Router();

router.route('/').get(getProducts).post(isLoggedin, isAdmin, productImageUploader, addProduct);
router
	.route('/:id')
	.get(getSingleProduct)
	.patch(isLoggedin, isAdmin, productImageUploader, updateProduct)
	.delete(deleteProduct);
export default router;
