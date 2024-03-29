import mongoose, { SchemaDefinition } from 'mongoose';

const orderSchema = new mongoose.Schema<SchemaDefinition>(
	{
		userId: { type: mongoose.Types.ObjectId, required: true },
		products: {
			type: [
				{
					productId: { type: String, required: true },
					quantity: { type: Number, required: true },
					price: { type: Number, required: true },
				},
			],
			required: true,
		},
		deliveryAddress: {
			building: {
				type: String,
				required: true,
			},
			street: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			mobile: {
				type: Number,
				required: true,
			},
			pin: Number,
			addressLine: String,
			country: {
				type: String,
				default: 'UAE',
				required: true,
			},
		},
		status: {
			type: String,
			enum: ['Pending', 'Confirmed', 'Delivered', 'Cancled'],
		},
		payment: {
			mode: {
				type: String,
				enum: ['cod', 'card'],
			},
			paid: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
