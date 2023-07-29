const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: [10, 'Title should be at least 10 characters long!'],
		},
		description: {
			type: String,
			required: true,
			minlength: [25, 'Title should be at least 25 characters long!'],
		},
		type: {
			type: String,
			required: true,
			validate: {
				validator: (v) => {
					return /[a-zA-Z\s]+/g.test(v);
				},
				message: `Type should contain only letters and whitespaces!`,
			},
		},
		price: {
			type: Number,
			required: true,
			min: [0, 'Price cannot be negative'],
		},
		duration: {
			type: Number,
			required: true,
			min: [1, 'Duration of seance cannot be less than 1 hour'],
		},
		postedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		reviews: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Review',
			},
		],
		appointments: [{
			type: Date
		}],
	},
	{ timestamps: { createdAt: 'created_at' } }
);

const Seance = mongoose.model('Seance', seanceSchema);

module.exports = Seance;
