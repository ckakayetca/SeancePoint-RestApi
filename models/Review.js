const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		seance: {
			type: mongoose.Types.ObjectId,
			ref: 'Seance',
		},
		postedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		text: {
			type: String,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
		},
	}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
