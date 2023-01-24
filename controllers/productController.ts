import { NextFunction, Response, Request } from 'express';
import Product from '../models/Product';
import { promises as fs } from 'fs';

interface IProductQuery {
	search: RegExp;
	category: string;
	priceStart: number;
	priceEnd: number;
	inStock: 'true' | 'false';
	pageLimit: number;
	pageSkip: number;
	sortPrice: -1 | 1;
	sortDate: 1 | -1;
}

interface IMatch {
	category?: string;
	name?: RegExp;
	priceStart?: { $gte: number };
	priceEnd?: { $lte: number };
	inStock?: { $gte: 0 } | { $gt: 0 };
}

interface IPriceRange {
	$and: Array<{ price: Partial<Record<'$gte' | '$lte', number>> }>;
}

export async function getProducts(
	req: Request<unknown, unknown, unknown, IProductQuery>,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const {
			search,
			category,
			priceStart = 0,
			priceEnd = 10000000,
			inStock = 'true',
			pageLimit = 20,
			pageSkip = 0,
			sortPrice = 1,
			sortDate = 1,
		} = req.query;

		const match: IMatch = {};
		if (category != null) match.category = category;
		if (search != null) match.name = new RegExp(search, 'i');

		if (inStock === 'true') {
			match.inStock = { $gt: 0 };
		} else if (inStock === 'false') {
			match.inStock = { $gte: 0 };
		} else {
			match.inStock = { $gt: 0 };
		}

		const priceRang: IPriceRange = { $and: [{ price: { $gte: priceStart } }, { price: { $lte: priceEnd } }] };

		if (priceStart != null) priceRang.$and[0].price.$gte = priceStart;
		if (priceEnd != null) priceRang.$and[1].price.$lte = priceEnd;

		const sort: { price?: 1 | -1; updatedAt?: 1 | -1 } = {};
		if (sortPrice != null) sort.price = sortPrice;
		if (sortDate != null) sort.updatedAt = sortDate;

		const products = await Product.find({ ...match, ...priceRang })
			.limit(pageLimit)
			.skip(pageLimit * pageSkip)
			.sort({ ...sort });
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
