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
					return /[a-zA-z\s]/g.test(v);
				},
				message: `Type should contain only letters and whitespaces!`,
			},
		},
		price: {
			type: Number,
			required: true,
			min: [0, 'Price cannot be negative'],
		},
		length: {
			type: Number,
			required: true,
			min: [1, 'Length of seance cannot be less than 1 hour'],
		},
		postedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: { createdAt: 'created_at' } }
);

const Seance = mongoose.model('Seance', seanceSchema);

module.exports = Seance;
