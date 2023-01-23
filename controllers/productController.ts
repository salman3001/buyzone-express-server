import { NextFunction, Response, Request } from 'express';
import Product from '../models/Product';
import { promises as fs } from 'fs';

interface IProductQuery {
	search: string;
	category: string;
	priceStart: number;
	priceEnd: number;
	inStock: boolean;
}

export async function getProducts(
	req: Request<unknown, unknown, unknown, IProductQuery>,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { search, category, priceStart, priceEnd, inStock } = req.query;

		const products = await Product.find({ category });
		res.status(200).send(products);
	} catch (error) {
		next(error);
	}
}

export async function getSingleProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		product !== null
			? res.status(200).send({ message: 'Product found', product })
			: res.status(404).send({ message: 'user not found' });
	} catch (error) {
		next(error);
	}
}

export async function addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const productData = req.body;
		const images = (req.files as any[])?.map((file) => file.path);
		const addedProduct = await Product.create({ ...productData, images });
		res.status(200).send({ message: 'Product added successfully', product: addedProduct });
	} catch (error) {
		next(error);
	}
}

export async function updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		// getting data from request
		const id = req.params.id;
		const productData = req.body;
		const files = req.files as Express.Multer.File[];
		const newImages = files !== undefined ? files.map((file) => file.path) : undefined;

		// updataing product
		if (newImages != null) {
			// getting old data from database
			const oldProduct = await Product.findById(id);
			const oldImages = oldProduct?.images as string[];
			const updatedProduct = await Product.findByIdAndUpdate(
				id,
				{ ...productData, images: newImages },
				{ runValidators: true, new: true }
			);

			// deleting old photos
			oldImages.forEach((image) => {
				fs.rm(image)
					.then(() => {
						console.log(`file ${image} removed from server`);
					})
					.catch((err) => {
						console.log(err);
					});
			});

			res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });
		} else {
			const updatedProduct = await Product.findByIdAndUpdate(
				id,
				{ ...productData },
				{ runValidators: true, new: true }
			);
			res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });
		}
	} catch (error) {
		// eslint-disable-next-line no-extra-boolean-cast
		if (Boolean(error)) {
			// deleting uploaded photo if form updation failed due to data invalidation
			(req.files as Express.Multer.File[]).forEach((file) => {
				fs.rm(file.path)
					.then(() => {
						console.log(`uploaded files ${file.filename} removed because product updatation failed.`);
					})
					.catch((err) => {
						console.log(err);
					});
			});

			next(error);
		}
	}
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const id = req.params.id;
		// getting product photos names from from server
		const product = await Product.findById(id);
		const images = product?.images as [];

		// deleting product from database
		const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
		res.status(200).send({ message: 'Product deleted successfully', product: deletedProduct });

		// deleting photos from server
		images.forEach((image: string) => {
			fs.rm(image)
				.then(() => {
					console.log(`file ${image} removed from server`);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	} catch (error) {
		next(error);
	}
}
