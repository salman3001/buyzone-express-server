import { timeStamp } from 'console';
import mongoose, { Schema, SchemaDefinition } from 'mongoose';

interface IproductSchema {
	name: String;
	images: String[];
	category: String;
	price: Number;
	inStock: Number;
	reviews: typeof mongoose.Types.ObjectId[];
}
const ProductSchema = new Schema<SchemaDefinition<IproductSchema>>(
	{
		name: {
			type: String,
			trim: true,
			min: [2, 'name should be minimum two charectors'],
			max: [40, 'maximum 20 charecotrs allowed'],
			required: true,
		},
		images: { type: [String], default: ['images/products/default.jpg'] },
		category: {
			type: String,
			trim: true,
			required: true,
		},
		price: { type: Number, required: true },
		inStock: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
