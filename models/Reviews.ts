import mongoose, { SchemaDefinition } from 'mongoose';
interface IreviewSchema {
	reviewedBy: mongoose.Types.ObjectId;
	product: mongoose.Types.ObjectId;
	rating: number;
	comment: string;
}
const reviewSchemas = new mongoose.Schema<SchemaDefinition<IreviewSchema>>(
	{
		reviewedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		product: {
			type: mongoose.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		rating: {
			type: Number,
			min: [0, 'rating should be atleast 0'],
			max: [5, 'rating should be less than 5'],
			required: true,
		},
		comment: {
			type: String,
			maxlength: [100, 'only 50 charectors allowed in comment '],
		},
	},
	{ timestamps: true }
);

const Review = mongoose.model('Review', reviewSchemas);

export default Review;
