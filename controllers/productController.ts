import { NextFunction, Response, Request } from 'express';
import Product from '../models/Product';
import { promises as fs } from 'fs';
import { ObjectId } from 'mongoose';
interface IRequest {
	files: Express.Multer.File;
	id: ObjectId;
}
export async function getProducts(req: Request, res: Response, next: NextFunction) {
	try {
		const products = await Product.find();
		res.status(200).send(products);
	} catch (error) {
		next(error);
	}
}

export async function getSingleProduct(req: Request, res: Response, next: NextFunction) {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		product
			? res.status(200).send({ message: 'Product found', product: product })
			: res.status(404).send({ message: 'user not found' });
	} catch (error) {
		next(error);
	}
}

export async function addProduct(req: Request<IRequest>, res: Response, next: NextFunction) {
	try {
		const productData = req.body;
		const urls = (req.files as any[])?.map((file) => file.path);
		const addedProduct = await Product.create({ ...productData, Urls: urls });
		res.status(200).send({ message: 'Product added successfully', product: addedProduct });
	} catch (error) {
		next(error);
	}
}

export async function updateProduct(req: Request<IRequest>, res: Response, next: NextFunction) {
	try {
		// getting data from request
		const id = req.params.id;
		const productData = req.body;
		const newurls = (req.files as any[])?.map((file) => file.path);
		// getting old data from database
		const oldProduct = await Product.findById(id);
		const urls = oldProduct?.Urls as [];

		// updataing product
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{ ...productData, Urls: newurls },
			{ runValidators: true, new: true }
		);

		// deleting old photos
		urls.map((url) => {
			fs.rm(url)
				.then(() => {
					console.log(`file ${url} removed from server`);
				})
				.catch((err) => {
					console.log(err);
				});
		});

		res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });
	} catch (error) {
		if (error) {
			// deleting uploaded photo if form updation failed due to data invalidation
			(req.files as any[]).map((file) => {
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

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
	try {
		const id = req.params.id;
		// getting product photos names from from server
		const product = await Product.findById(id);
		const urls = product?.Urls as [];

		//deleting product from database
		const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
		res.status(200).send({ message: 'Product deleted successfully', product: deletedProduct });

		// deleting photos from server
		urls.map((url) => {
			fs.rm(url)
				.then(() => {
					console.log(`file ${url} removed from server`);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	} catch (error) {
		next(error);
	}
}
