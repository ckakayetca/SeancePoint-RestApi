const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 5;
const emailRegex =
	/^\w+@abv.bg$/;

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (email) {
					return true;
				},
				message: () => `Invalid email!`,
			},
		},
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: [4, 'Username should be at least 4 characters'],
			validate: {
				validator: function (v) {
					return /^\w+$/.test(v);
				},
				message: (v) =>
					`${v.value} must contain only letters, digits or underscores`,
			},
		},
		password: {
			type: String,
			required: true,
			minlength: [5, 'Password should be at least 5 characters'],
			validate: {
				validator: function (v) {
					return /^\w+$/.test(v);
				},
				message: (v) =>
					`${v.value} must contain only letters, digits or underscores`,
			},
		},
		tel: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return /^\+359\d{9}$/.test(v);
				},
				message: 'Phone number should start with +359 and have 9 digits afterwards'
			}
		},
		seances: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Seance',
			},
		],
		appointments: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Appointment',
			},
		],
		reviews: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Review',
			},
		],
	},
	{ timestamps: { createdAt: 'created_at' } }
);

userSchema.virtual('rePassword').set(function (value) {
	if (value !== this.password) {
		throw new mongoose.MongooseError('The passwords do not match!');
	}
});

userSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, saltRounds);

	this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
