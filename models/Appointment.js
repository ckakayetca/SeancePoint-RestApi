const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
	{
		providerId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		seanceId: {
			type: mongoose.Types.ObjectId,
			ref: 'Seance',
		},
		date: {
			type: Date,
            required: [true, 'Date is not selected!']
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
		},
	}
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
