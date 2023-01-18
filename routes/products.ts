import { isAdmin } from './../middleware/isAdmin';
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

router.route('/').get(getProducts).post(isAdmin, productImageUploader, addProduct);
router.route('/:id').get(getSingleProduct).patch(isAdmin, productImageUploader, updateProduct).delete(deleteProduct);
export default router;
